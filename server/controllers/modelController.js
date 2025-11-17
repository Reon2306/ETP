import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { readFileText } from "../utils/fileUtils.js";
import {
  chunkText,
  embedTextBatch,
  saveChunk,
  searchTopK,
  generateAnswerWithLLM,
} from "../utils/ragEngine.js";
import { generatePdfBuffer } from "../utils/pdfGenerator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let LAST_NOTES_SOURCE = null;
let QUESTIONS_TEXT = "";

export const uploadNotes = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded (field: notes)" });

    const filePath = req.file.path;
    const text = await readFileText(filePath, req.file.originalname);
    await fs.unlink(filePath).catch(() => { });

    if (!text || !text.trim())
      return res.status(400).json({ error: "No text extracted from notes" });

    const chunkSize = Number(process.env.CHUNK_SIZE || 800);
    const overlap = Number(process.env.CHUNK_OVERLAP || 100);
    const chunks = chunkText(text, chunkSize, overlap);
    if (chunks.length === 0)
      return res.status(400).json({ error: "No chunks produced from notes" });

    const embeddings = await embedTextBatch(chunks);

    const source = `notes_${Date.now()}`;
    chunks.forEach((ch, i) => saveChunk(source, ch, embeddings[i]));

    LAST_NOTES_SOURCE = source;
    return res.json({ status: "ok", chunks: chunks.length, source });
  } catch (e) {
    console.error("uploadNotes error:", e);
    res.status(500).json({ error: "upload-notes failed", detail: String(e) });
  }
};

export const uploadQuestions = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ error: "No file uploaded (field: questions)" });

    const filePath = req.file.path;
    const text = await readFileText(filePath, req.file.originalname);
    await fs.unlink(filePath).catch(() => { });

    if (!text || !text.trim())
      return res
        .status(400)
        .json({ error: "No text extracted from questions" });

    // naive split; adjust if your question PDFs use numbering/columns
    const candidates = text
      .split(/\n{1,}/)
      .map((s) => s.trim())
      .filter(Boolean);
    const questions = candidates.filter((c) => c.length > 8);
    QUESTIONS_TEXT = questions.join("\n\n");

    return res.json({ status: "ok", questions_count: questions.length });
  } catch (e) {
    console.error("uploadQuestions error:", e);
    res
      .status(500)
      .json({ error: "upload-questions failed", detail: String(e) });
  }
};

export const generate = async (req, res) => {
  try {
    // const top_k = Number(
    //   req.body.top_k || req.query.top_k || process.env.TOP_K || 4,
    // );

    const top_k = Number(req.body?.top_k ?? req.query?.top_k ?? 4);

    if (!LAST_NOTES_SOURCE)
      return res
        .status(400)
        .json({ error: "No notes uploaded yet. Upload notes first." });
    if (!QUESTIONS_TEXT)
      return res
        .status(400)
        .json({ error: "No questions uploaded yet. Upload questions first." });

    const questions = QUESTIONS_TEXT.split(/\n{1,}/)
      .map((q) => q.trim())
      .filter(Boolean);
    const qaPairs = [];

    for (const q of questions) {
      // embed question (single)
      const qEmbArr = await embedTextBatch([q]); // returns array with one embedding
      const qEmb = qEmbArr[0];

      // search top-k from the source notes
      const top = searchTopK(qEmb, top_k, LAST_NOTES_SOURCE);
      const context = top.map((t) => t.chunk).join("\n\n---\n\n");

      const messages = [
        {
          role: "system",
          content:
            "You are a helpful tutor. Answer using ONLY the provided context. If the context does not contain the answer, say you cannot find it in the notes.",
        },
        {
          role: "user",
          content: `CONTEXT:\n${context}\n\nQUESTION:\n${q}\n\nProvide a clear concise answer and optionally a brief explanation.`,
        },
      ];

      const { llmAnswer } = await generateAnswerWithLLM(messages);
      const answer =
        (llmAnswer || "").toString().trim() ||
        "No answer produced by local LLM";
      qaPairs.push({ question: q, answer });
    }

    const pdfBuf = await generatePdfBuffer(qaPairs);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="qa_output_${Date.now()}.pdf"`,
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuf);
  } catch (e) {
    console.error("generate error:", e);
    res.status(500).json({ error: "generate failed", detail: String(e) });
  }
};
