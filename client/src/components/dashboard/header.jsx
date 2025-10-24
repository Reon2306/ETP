import { Bell, User, Search } from "lucide-react";

export function DashboardHeader() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Search Input */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search your notes..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-black"
                        />
                    </div>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4 ml-4">
                    <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition">
                        <Bell className="w-5 h-5 text-blue-700" />
                    </button>
                    <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition">
                        <User className="w-5 h-5 text-blue-700" />
                    </button>
                </div>
            </div>
        </header>
    );
}
