import React from "react";
import { DashboardSidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100 text-gray-900">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                {/* Header */}
                <DashboardHeader />

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">{children}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
