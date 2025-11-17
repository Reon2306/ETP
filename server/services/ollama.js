import { fetch } from "undici";

export async function embedText(text) {
    const res = await fetch("http://localhost:11434/api/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "nomic-embed-text",
            input: text,
        }),
    });

    const data = await res.json();
    return data.embedding; // vector
}

export async function generateAnswer(prompt) {
    const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama3.2",
            prompt,
            stream: false,
        }),
    });

    const data = await res.json();
    return data.response;
}
