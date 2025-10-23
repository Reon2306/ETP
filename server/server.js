import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";

const app = express();
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "*",
    }),
);

app.use(express.json());

//Routes
app.use("/api", authRoutes);

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
