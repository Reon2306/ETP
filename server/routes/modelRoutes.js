import express from "express";
import multer from "multer";
import {
    uploadNotes,
    uploadQuestions,
    generate,
} from "../controllers/modelController.js";

const router = express.Router();

// temp uploads
const upload = multer({
    dest: "uploads/tmp/",
    limits: { fileSize: 40 * 1024 * 1024 },
});

router.post("/upload-notes", upload.single("notes"), uploadNotes);
router.post("/upload-questions", upload.single("questions"), uploadQuestions);
router.post("/generate", generate);

export default router;
