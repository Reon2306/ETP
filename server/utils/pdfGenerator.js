import PDFDocument from "pdfkit";
import { PassThrough } from "stream";

export function generatePdfBuffer(qaPairs) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                margin: 40,
                size: "A4",
            });

            const stream = new PassThrough();
            const chunks = [];

            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("end", () => resolve(Buffer.concat(chunks)));
            stream.on("error", reject);

            doc.pipe(stream);

            doc.fontSize(20).text("Questions & Answers", { align: "center" });
            doc.moveDown(1);

            qaPairs.forEach((item, index) => {
                const qNum = index + 1;

                doc
                    .fontSize(14)
                    .fillColor("#000000")
                    .text(`Q${qNum}. ${item.question}`, {
                        style: "bold",
                    });

                doc.moveDown(0.3);

                // Optional: If question contains options A/B/C/D, format them nicely
                const optionRegex = /(A\)|B\)|C\)|D\))/i;
                if (optionRegex.test(item.question)) {
                    const lines = item.question.split("\n");

                    lines.forEach((line) => {
                        if (/^A\)/i.test(line))
                            doc.text(`   A) ${line.replace(/^A\)\s*/i, "")}`);
                        if (/^B\)/i.test(line))
                            doc.text(`   B) ${line.replace(/^B\)\s*/i, "")}`);
                        if (/^C\)/i.test(line))
                            doc.text(`   C) ${line.replace(/^C\)\s*/i, "")}`);
                        if (/^D\)/i.test(line))
                            doc.text(`   D) ${line.replace(/^D\)\s*/i, "")}`);
                    });

                    doc.moveDown(0.5);
                }

                doc.fontSize(13).fillColor("#333333").text(`Answer:`, {
                    underline: true,
                });

                doc.fontSize(12).fillColor("#000000").text(item.answer, {
                    indent: 20,
                    lineGap: 3,
                });

                doc.moveDown(1.2);
            });

            doc.end();
        } catch (e) {
            reject(e);
        }
    });
}
