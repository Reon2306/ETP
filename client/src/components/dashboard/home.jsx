import { useState } from "react"
import { Upload, Clock, Star, Plus } from "lucide-react"
export default function Dashboard() {
    const [recentChats] = useState([
        { id: 1, title: "Biology Chapter 5 - Photosynthesis", date: "Today", questions: 12 },
        { id: 2, title: "Physics Mechanics Problems", date: "Yesterday", questions: 8 },
        { id: 3, title: "Chemistry Organic Reactions", date: "2 days ago", questions: 15 },
    ])

    const [favorites] = useState([
        { id: 1, title: "What is photosynthesis?", subject: "Biology" },
        { id: 2, title: "Newton's Laws of Motion", subject: "Physics" },
        { id: 3, title: "Organic Chemistry Basics", subject: "Chemistry" },
    ])

    return (

        <div className="p-6 md:p-8 space-y-8 bg-gray-100 min-h-screen">
            {/* Welcome Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-black">Welcome back, Student!</h1>
                <p className="text-gray-500">Upload your notes and start finding answers instantly</p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
                <a href="/dashboard/upload">
                    <div className="p-6 cursor-pointer hover:border-blue-700 transition border border-gray-200 bg-white rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Upload className="w-6 h-6 text-blue-700" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-black">Upload Notes</h3>
                                <p className="text-gray-500 text-sm">Add your study materials</p>
                            </div>
                        </div>
                    </div>
                </a>

                <a href="/dashboard/search">
                    <div className="p-6 cursor-pointer hover:border-blue-700 transition border border-gray-200 bg-white rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Plus className="w-6 h-6 text-blue-700" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-black">New Search</h3>
                                <p className="text-gray-500 text-sm">Find answers to questions</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            {/* Recent Searches */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-black">Recent Searches</h2>
                    <a href="/dashboard/search">
                        <button className="px-4 py-2 text-blue-700 font-medium bg-white border border-blue-700 rounded hover:bg-blue-50">
                            View All
                        </button>
                    </a>
                </div>

                <div className="grid gap-4">
                    {recentChats.map((chat) => (
                        <div
                            key={chat.id}
                            className="p-4 hover:border-blue-700 transition cursor-pointer border border-gray-200 bg-white rounded-xl"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-black">{chat.title}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {chat.date}
                                        </span>
                                        <span>{chat.questions} questions answered</span>
                                    </div>
                                </div>
                                <button className="px-3 py-1 text-blue-700 font-medium bg-white border border-blue-700 rounded hover:bg-blue-50">
                                    Open
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Saved Favorites */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-black">Saved Favorites</h2>
                    <a href="/dashboard/favorites">
                        <button className="px-4 py-2 text-blue-700 font-medium bg-white border border-blue-700 rounded hover:bg-blue-50">
                            View All
                        </button>
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {favorites.map((fav) => (
                        <div
                            key={fav.id}
                            className="p-4 hover:border-blue-700 transition border border-gray-200 bg-white rounded-xl"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-black text-sm">{fav.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{fav.subject}</p>
                                </div>
                                <Star className="w-4 h-4 text-blue-700 fill-blue-700" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
