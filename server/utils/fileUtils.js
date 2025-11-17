import fs from "fs/promises";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";

export async function readFileText(filePath, originalname = "") {
    const ext = (originalname.split(".").pop() || "").toLowerCase();
    const buffer = await fs.readFile(filePath);

    if (ext === "pdf") {
        try {
            const data = await pdfParse(buffer);
            return data.text || "";
        } catch (e) {
            console.warn("pdf-parse failed:", e);
            return buffer.toString("utf8");
        }
    }

    if (ext === "docx") {
        try {
            const res = await mammoth.extractRawText({ buffer });
            return res.value || "";
        } catch (e) {
            console.warn("mammoth failed:", e);
            return buffer.toString("utf8");
        }
    }

    return buffer.toString("utf8");
}
