import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";

dotenv.config();

const app = express();
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "*",
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", authRoutes);
app.use("/rag", modelRoutes);

//DB status
app.get("/health", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: "OK", message: "Connected to Neon" });
    } catch (err) {
        res.status(500).json({ status: "Error", message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
