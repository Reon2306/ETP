import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",").map((url) => url.trim()) : "*",
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

if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
