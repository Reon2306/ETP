import { useContext, useEffect, useState } from "react";
import { Brain, Home, FileText, Heart, Settings, LogOut, Menu, X } from "lucide-react";
import { ServerContext } from "../../context/ServerContext";

export function DashboardSidebar() {
    const { account } = useContext(ServerContext);
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { href: "/dashboard", label: "Home", icon: Home },
        { href: "/dashboard/search", label: "Search", icon: FileText },
        { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    // You can replace this logic with your own router-based active state check
    const currentPath = window.location.pathname;
    const isActive = (href) => currentPath === href;

    const handleLogout = () => {
        // Clear user session or token here
        window.location.href = "/";
        localStorage.removeItem('user');
    };

    useEffect(() => {
        if(!account) {
            window.location.href = "/";
        }
    }, []);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
                {isOpen ? <X className="w-6 h-6 text-blue-700" /> : <Menu className="w-6 h-6 text-blue-700" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen w-64 bg-gray-100 border-r border-gray-200 shadow-md transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-gray-200 flex items-center gap-2">
                    <Brain className="w-8 h-8 text-blue-700" />
                    <span className="text-xl font-bold text-black">Reiken</span>
                </div>

                {/* Menu */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${active
                                    ? "bg-blue-700 text-white"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </a>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
