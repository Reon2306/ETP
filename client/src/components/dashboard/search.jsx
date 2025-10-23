import React from "react";
import { Search } from "lucide-react";

export default function SearchPage() {
    return (
        <div className="p-6 md:p-8 space-y-8 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-black">Search Your Notes</h1>
                <p className="text-gray-500">
                    Ask a question and find answers from your uploaded materials
                </p>
            </div>

            {/* Search Interface Section */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Type your question here..."
                            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 text-gray-800"
                        />
                    </div>

                    <button className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
