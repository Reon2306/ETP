import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import { BookOpen, FileText, HelpCircle, Upload } from "lucide-react";

export default function UploadPage() {
    const [uploadType, setUploadType] = useState("notes");

    const [notesFile, setNotesFile] = useState(null);
    const [questionsFile, setQuestionsFile] = useState(null);
    const [topK, setTopK] = useState(4);

    const [notesStatus, setNotesStatus] = useState("");
    const [questionsStatus, setQuestionsStatus] = useState("");
    const [generating, setGenerating] = useState(false);
    const [notesUploading, setNotesUploading] = useState(false);
    const [questionsUploading, setQuestionsUploading] = useState(false);

    const notesInputRef = useRef(null);
    const questionsInputRef = useRef(null);

    const API_BASE = useMemo(
        () => (import.meta.env.VITE_API_URL || "http://localhost:3000"),
        [],
    );

    const handleUploadNotes = async () => {
        if (!notesFile) {
            setNotesStatus("Please select a notes file first.");
            return;
        }
        setNotesUploading(true);
        setNotesStatus("");
        try {
            const form = new FormData();
            form.append("notes", notesFile);
            const { data } = await axios.post(`${API_BASE}/rag/upload-notes`, form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setNotesStatus(`Uploaded: ${data.chunks ?? 0} chunks (source: ${data.source ?? "n/a"})`);
        } catch (err) {
            const msg = err?.response?.data?.error || err?.message || "Upload failed";
            setNotesStatus(`Error: ${msg}`);
        } finally {
            setNotesUploading(false);
        }
    };

    const handleUploadQuestions = async () => {
        if (!questionsFile) {
            setQuestionsStatus("Please select a questions file first.");
            return;
        }
        setQuestionsUploading(true);
        setQuestionsStatus("");
        try {
            const form = new FormData();
            form.append("questions", questionsFile);
            const { data } = await axios.post(`${API_BASE}/rag/upload-questions`, form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setQuestionsStatus(`Uploaded: ${data.questions_count ?? 0} questions detected`);
        } catch (err) {
            const msg = err?.response?.data?.error || err?.message || "Upload failed";
            setQuestionsStatus(`Error: ${msg}`);
        } finally {
            setQuestionsUploading(false);
        }
    };

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            const response = await axios.post(
                `${API_BASE}/rag/generate`,
                { top_k: Number(topK) || 4 },
                { responseType: "blob" },
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `qa_output_${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            const msg = err?.response?.data?.error || err?.message || "Generate failed";
            alert(`Generate error: ${msg}`);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-8 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-black">Upload Study Materials</h1>
                <p className="text-gray-500">Add your notes or question banks to get started</p>
            </div>

            {/* Upload Type Selection */}
            <div className="grid md:grid-cols-2 gap-4">
                <div
                    onClick={() => setUploadType("notes")}
                    className={`p-6 cursor-pointer border-2 rounded-xl transition bg-white ${uploadType === "notes"
                        ? "border-blue-700 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <BookOpen
                            className={`w-8 h-8 ${uploadType === "notes" ? "text-blue-700" : "text-gray-400"
                                }`}
                        />
                        <div>
                            <h3 className="font-semibold text-black">Study Notes</h3>
                            <p className="text-sm text-gray-500">
                                Upload your lecture notes and study materials
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setUploadType("questions")}
                    className={`p-6 cursor-pointer border-2 rounded-xl transition bg-white ${uploadType === "questions"
                        ? "border-blue-700 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <HelpCircle
                            className={`w-8 h-8 ${uploadType === "questions" ? "text-blue-700" : "text-gray-400"
                                }`}
                        />
                        <div>
                            <h3 className="font-semibold text-black">Question Banks</h3>
                            <p className="text-sm text-gray-500">
                                Upload practice questions and exams
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Zone */}
            <div className="p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
                {uploadType === "notes" ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Upload className="w-10 h-10 text-blue-700" />
                            <div>
                                <p className="text-black font-medium">Upload Notes (PDF, DOCX, TXT)</p>
                                <p className="text-gray-500 text-sm">Max 40MB per file</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <input
                                ref={notesInputRef}
                                type="file"
                                accept=".pdf,.docx,.txt"
                                onChange={(e) => setNotesFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <button
                                onClick={handleUploadNotes}
                                disabled={!notesFile || notesUploading}
                                className="px-4 py-2 bg-blue-700 text-white rounded-md disabled:opacity-50"
                            >
                                {notesUploading ? "Uploading..." : "Upload Notes"}
                            </button>
                        </div>
                        {notesStatus && (
                            <p className="text-sm {notesStatus.startsWith('Error') ? 'text-red-600' : 'text-green-700'}">
                                {notesStatus}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Upload className="w-10 h-10 text-blue-700" />
                            <div>
                                <p className="text-black font-medium">Upload Questions (PDF, DOCX, TXT)</p>
                                <p className="text-gray-500 text-sm">Max 40MB per file</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <input
                                ref={questionsInputRef}
                                type="file"
                                accept=".pdf,.docx,.txt"
                                onChange={(e) => setQuestionsFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <button
                                onClick={handleUploadQuestions}
                                disabled={!questionsFile || questionsUploading}
                                className="px-4 py-2 bg-blue-700 text-white rounded-md disabled:opacity-50"
                            >
                                {questionsUploading ? "Uploading..." : "Upload Questions"}
                            </button>
                        </div>
                        {questionsStatus && (
                            <p className="text-sm {questionsStatus.startsWith('Error') ? 'text-red-600' : 'text-green-700'}">
                                {questionsStatus}
                            </p>
                        )}
                    </div>
                )}

                {/* Generate Controls */}
                <div className="mt-8 border-t pt-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                        <div>
                            <label className="block text-sm text-black mb-1">Top-K context chunks</label>
                            <input
                                type="number"
                                min={1}
                                max={10}
                                value={topK}
                                onChange={(e) => setTopK(e.target.value)}
                                className="w-24 px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
                        >
                            {generating ? "Generating PDF..." : "Generate PDF"}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Make sure you have uploaded both notes and questions first.</p>
                </div>
            </div>

            {/* Tips Section */}
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
                <h3 className="font-semibold text-black mb-3">Tips for Best Results</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                        <span className="text-blue-700">•</span>
                        <span>Upload clear, well-formatted documents for better accuracy</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-blue-700">•</span>
                        <span>Organize your notes by subject or chapter for easier searching</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-blue-700">•</span>
                        <span>Include diagrams and images for comprehensive answers</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-blue-700">•</span>
                        <span>Maximum file size: 50MB per document</span>
                    </li>
                </ul>
            </div>

            {/* Recent Uploads Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-black">Your Uploaded Materials</h2>
                <div className="p-8 text-center border-2 border-dashed border-gray-300 bg-white rounded-xl">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-70" />
                    <p className="text-gray-500">No materials uploaded yet</p>
                </div>
            </div>
        </div>
    );
}
