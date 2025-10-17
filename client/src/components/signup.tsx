import React, { useContext, useState } from "react";
import axios from "axios";
import Header from './Header';
import Footer from './Footer';
import { ServerContext } from "../context/ServerContext";

export default function Signup() {
  const {signup, account, loading} = useContext(ServerContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if(!name || !email || !password) {  
      alert("Please fill all the fields");
      return;
    }
    console.log(name,email,password);
    try {
      await signup(name, email, password);
    } catch (err:any) {
      console.log(err);
    }
  };

  return (
    <>
    <Header />
    <div className="flex min-h-screen items-center justify-center  bg-neutral-800">
      <div className="w-full max-w-md p-8 bg-blue-200 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Signup
        </h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center mb-4">{success}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 cursor-pointer transition duration-300 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign-up"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
