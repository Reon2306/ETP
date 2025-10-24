import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-100 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-black">Reiken</span>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#home" className="text-black hover:text-blue-700 transition">
              Home
            </a>
            <a href="#about" className="text-black hover:text-blue-700 transition">
              About
            </a>
            <a href="#contact" className="text-black hover:text-blue-700 transition">
              Contact
            </a>
          </div>

          {/* Right: Get Started Button */}
          <div className="hidden md:flex">
            <a href="/signup">
              <button className="px-4 py-2 rounded-md bg-blue-900 text-white font-medium hover:bg-blue-800 disabled:opacity-50">
                Get Started
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative">
            <button
              className="text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded shadow-lg pb-4 space-y-2">
                <a
                  href="#home"
                  className="block px-4 py-2 text-black hover:bg-blue-100 rounded"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="block px-4 py-2 text-black hover:bg-blue-100 rounded"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="block px-4 py-2 text-black hover:bg-blue-100 rounded"
                >
                  Contact
                </a>
                <div className="flex pt-2 px-4">
                  <a href="/signup" className="flex-1">
                    <button className="w-full px-4 py-2 rounded-md bg-blue-900 text-white font-medium hover:bg-blue-800 disabled:opacity-50">
                      Get Started
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
