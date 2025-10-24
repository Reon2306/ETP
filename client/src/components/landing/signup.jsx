import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Header from './Header';
import Footer from './footer';
import { ServerContext } from "../../context/ServerContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Signup() {
  const { signup, account, loading } = useContext(ServerContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log(name, email, password);
    try {
      await signup(name, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (account) {
      navigator("/dashboard");
    }
  }, [account]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <a
            href="/"
            className="flex items-center gap-2 mb-8 text-blue-500 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </a>
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-black text-center mb-2">
              Create Account
            </h1>
            <p className="text-gray-500 text-center mb-8">
              Get started and make studying easy!
            </p>

            {error && (
              <p className="text-red-600 text-sm text-center mb-4">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center mb-4">{success}</p>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 px-4 py-2 rounded-md bg-blue-900 text-white font-medium hover:bg-blue-800 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:text-blue-800 font-medium">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
