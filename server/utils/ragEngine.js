import Database from "better-sqlite3";
import { fetch } from "undici";
import dotenv from "dotenv";

dotenv.config();

const db = new Database("vectorstore.sqlite");
db.exec(`
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT,
  chunk TEXT,
  embedding TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const EMBED_MODEL = process.env.EMBED_MODEL || "nomic/embedding-text";
const LLM_MODEL = process.env.LLM_MODEL || "llama3";

function cosineSimilarity(a, b) {
    let dot = 0,
        na = 0,
        nb = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
    }
    if (na === 0 || nb === 0) return 0;
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

// embed a batch of texts via Ollama embeddings endpoint
export async function embedTextBatch(texts) {
    const embeddings = [];
    for (const t of texts) {
        const resp = await fetch(`${OLLAMA_URL}/api/embeddings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: EMBED_MODEL, input: t }),
        });
        if (!resp.ok) {
            const txt = await resp.text();
            throw new Error(`Embedding request failed: ${resp.status} ${txt}`);
        }
        const json = await resp.json();

        // try to normalize various response shapes
        // common shapes: { data: [{ embedding: [...] }] } or { embedding: [...] } or { embeddings: [...] }
        const emb =
            json?.data?.[0]?.embedding ??
            json?.embedding ??
            json?.embeddings?.[0] ??
            json?.[0]?.embedding ??
            null;
        if (!emb) {
            // fallback: entire json (string)
            throw new Error(
                `Unexpected embedding response shape: ${JSON.stringify(json).slice(0, 200)}`,
            );
        }
        embeddings.push(emb);
    }
    return embeddings;
}

export function saveChunk(source, chunk, embedding) {
    const stmt = db.prepare(
        "INSERT INTO documents (source, chunk, embedding) VALUES (?, ?, ?)",
    );
    stmt.run(source, chunk, JSON.stringify(embedding));
}

export function searchTopK(queryEmbedding, k = 4, sourceFilter = null) {
    const rows = sourceFilter
        ? db
            .prepare(
                "SELECT id, source, chunk, embedding FROM documents WHERE source = ?",
            )
            .all(sourceFilter)
        : db.prepare("SELECT id, source, chunk, embedding FROM documents").all();

    const scored = rows.map((r) => {
        const emb = JSON.parse(r.embedding);
        return {
            id: r.id,
            source: r.source,
            chunk: r.chunk,
            score: cosineSimilarity(queryEmbedding, emb),
        };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, k);
}

// generate answer with local LLM via Ollama generate endpoint
export async function generateAnswerWithLLM(messages) {
    const system = messages.find((m) => m.role === "system")?.content ?? "";
    const user =
        messages.find((m) => m.role === "user")?.content ??
        messages.map((m) => m.content).join("\n\n");
    const prompt = `${system}\n\n${user}`;

    const resp = await fetch(`${OLLAMA_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: LLM_MODEL,
            prompt,
            max_tokens: 800,
            temperature: 0.2,
            stream: false,
        }),
    });

    if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`LLM generate failed: ${resp.status} ${txt}`);
    }

    const json = await resp.json();

    // Ollama returns { response: "..." }
    const answer =
        json?.response ??
        json?.text ??
        json?.output?.[0]?.content ??
        json?.results?.[0]?.content ??
        JSON.stringify(json);

    return { llmAnswer: answer };
}

export function chunkText(text, size = 500) {
    const chunks = [];
    for (let i = 0; i < text.length; i += size) {
        chunks.push(text.slice(i, i + size));
    }
    return chunks;
}
