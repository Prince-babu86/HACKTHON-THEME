/*
  SignUpDark.jsx (Clean Version)
  - ONLY Sign Up Page
  - Login button moved to BOTTOM only (not top)
  - Forgot password removed (Signup page only)
  - All fields stored inside a single `form` object
  - Tailwind required
*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../config/axios.config";

export default function SignUpDark() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [agree, setAgree] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
    if (!agree) return alert("Please agree to the privacy policy");
    if (form.password !== form.repeatPassword)
      return alert("Passwords do not match");

    let res = await instance.post("/auth/register", form);
    console.log(res.data);

    alert(`Signed up: ${form.fullname}`);
  };

  const GoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:3000/auth/google";
      let res = await instance.get("/auth/google");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#07060a] p-6">
      <div className="w-full max-w-md bg-gradient-to-br from-[#0a0a0f]/60 to-[#0f0f15]/60 rounded-2xl p-10 shadow-2xl border border-white/5">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Get Started Now
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Welcome in our service, create account to start your experience.
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e0e14] border border-white/6 text-sm shadow-sm hover:brightness-105">
            <svg
              className="w-4 h-4 opacity-80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.2 12.9c-.1-1-.7-2-1.4-2.6-1-1-2.5-1.6-4.1-1.6-1.6 0-3 .6-4.1 1.6-.8.7-1.3 1.6-1.4 2.6-.1 1.1.1 2.2.8 3 .7.8 1.7 1.3 2.8 1.3 1.1 0 2.1-.4 2.8-1.3.7-.8.9-1.9.8-3z"
                fill="#fff"
              />
            </svg>
            <span className="text-xs text-gray-200">Sign up with Apple</span>
          </button>

          <button onClick={GoogleLogin} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e0e14] border border-white/6 text-sm shadow-sm hover:brightness-105">
            <svg
              className="w-4 h-4"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-18.5-1.5-36.2-4.4-53.4H272v101.1h147.4c-6.4 34.7-26 64.1-55.4 83.8v69.6h89.4c52.4-48.2 82.1-119.3 82.1-201.1z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c73.7 0 135.6-24.4 180.8-66.2l-89.4-69.6c-25 17-57 27-91.4 27-70 0-129.3-47.2-150.5-110.6H31.1v69.5C76.2 487 167.9 544.3 272 544.3z"
              />
              <path
                fill="#FBBC05"
                d="M121.5 323.9c-10.6-31.6-10.6-65.7 0-97.3V157.1H31.1c-39.9 79.8-39.9 172.9 0 252.7l90.4-86z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c39.9-.6 78.3 14.5 107.4 41.9l80.6-80.6C407.8 24.7 341.9.7 272 0 167.9 0 76.2 57.3 31.1 142.6l90.4 69.5C142.7 155 202 107.7 272 107.7z"
              />
            </svg>
            <span className="text-xs text-gray-200">Sign up with Google</span>
          </button>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={submitSignUp} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Full name
            </label>
            <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/6 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Example@gmail.com"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/6 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/6 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Repeat password
              </label>
              <input
                name="repeatPassword"
                type="password"
                value={form.repeatPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/6 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
              />
            </div>
          </div>

          <label className="inline-flex items-center gap-3 text-gray-400">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree((a) => !a)}
              className="w-4 h-4 rounded border-gray-600 bg-transparent"
            />
            <span className="text-sm">
              I agree to the{" "}
              <a className="underline text-gray-300" href="#">
                privacy policy
              </a>
            </span>
          </label>

          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-semibold shadow-xl hover:brightness-105 transition"
            >
              Sign Up
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-400 text-center">
            Already have an account?
            <Link
              to={`/login`}
              type="button"
              className="text-white underline ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
