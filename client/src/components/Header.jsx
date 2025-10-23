export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600">
            AI Learning Solutions
          </div>
          <div className="flex gap-4">
            <a
              href="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Home
            </a>
            <a
              href="/login"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
