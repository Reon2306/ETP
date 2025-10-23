import React, { useState } from "react";
import { BookOpen, FileText, HelpCircle, Upload } from "lucide-react";

export default function UploadPage() {
    const [uploadType, setUploadType] = useState("notes");

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
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center shadow-sm">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <Upload className="w-10 h-10 text-blue-700" />
                    <p className="text-gray-600">
                        Drag and drop files here or click below to upload
                    </p>
                    <button className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
                        Choose Files
                    </button>
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
