import React, { useState } from "react";
import { Bell, Lock, User } from "lucide-react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        name: "Name",
        email: "name@example.com",
        notifications: true,
        emailUpdates: false,
    });

    const handleChange = (field, value) => {
        setSettings((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="p-6 md:p-8 space-y-8 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-black">Settings</h1>
                <p className="text-gray-500">Manage your account and preferences</p>
            </div>

            {/* Account Settings */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <User className="w-5 h-5 text-blue-700" />
                    <h2 className="text-xl font-semibold text-black">Account</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={settings.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Your name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="your@email.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                        />
                    </div>

                    <button className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <Bell className="w-5 h-5 text-blue-700" />
                    <h2 className="text-xl font-semibold text-black">Notifications</h2>
                </div>

                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.notifications}
                            onChange={(e) =>
                                handleChange("notifications", e.target.checked)
                            }
                            className="w-4 h-4 accent-blue-700"
                        />
                        <div>
                            <p className="font-medium text-black">Push Notifications</p>
                            <p className="text-sm text-gray-500">
                                Get notified about search results
                            </p>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.emailUpdates}
                            onChange={(e) =>
                                handleChange("emailUpdates", e.target.checked)
                            }
                            className="w-4 h-4 accent-blue-700"
                        />
                        <div>
                            <p className="font-medium text-black">Email Updates</p>
                            <p className="text-sm text-gray-500">
                                Receive weekly study tips
                            </p>
                        </div>
                    </label>
                </div>
            </div>

            {/* Security Settings */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <Lock className="w-5 h-5 text-blue-700" />
                    <h2 className="text-xl font-semibold text-black">Security</h2>
                </div>

                <div className="space-y-4">
                    <button className="w-full px-6 py-3 border border-gray-300 rounded-lg font-medium text-blue-700 hover:bg-gray-100 transition">
                        Change Password
                    </button>
                    <button className="w-full px-6 py-3 border border-gray-300 rounded-lg font-medium text-blue-700 hover:bg-gray-100 transition">
                        Two-Factor Authentication
                    </button>
                </div>
            </div>
        </div>
    );
}
