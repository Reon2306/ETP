import React, { useState } from "react";
import { Heart, Download, Trash2 } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      question: "What is photosynthesis?",
      answer:
        "Photosynthesis is the process by which plants convert light energy into chemical energy...",
      subject: "Biology",
      date: "Oct 15, 2025",
    },
    {
      id: 2,
      question: "Newton's Laws of Motion",
      answer:
        "Newton's three laws of motion describe the relationship between forces and motion...",
      subject: "Physics",
      date: "Oct 14, 2025",
    },
    {
      id: 3,
      question: "Organic Chemistry Basics",
      answer:
        "Organic chemistry is the study of carbon-containing compounds and their reactions...",
      subject: "Chemistry",
      date: "Oct 13, 2025",
    },
  ]);

  const handleRemove = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-black">Saved Favorites</h1>
        <p className="text-gray-500">Your bookmarked questions and answers</p>
      </div>

      {/* Favorites List */}
      {favorites.length > 0 ? (
        <div className="grid gap-4">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-black">
                      {fav.question}
                    </h3>
                    <Heart className="w-4 h-4 text-blue-700 fill-blue-700" />
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{fav.subject}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {fav.answer}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">Saved on {fav.date}</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-blue-700 text-sm font-medium hover:bg-gray-100 transition flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    onClick={() => handleRemove(fav.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="p-12 text-center border-2 border-dashed border-gray-300 bg-white rounded-xl">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-black mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-500">
            Save your favorite questions and answers here
          </p>
        </div>
      )}
    </div>
  );
}
