import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Premium SignUp component using ONE form object

export default function SignUpPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }

  function handleGoogleSignUp() {
    alert('Continue with Google (signup)');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-pink-500 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-white">
                <path fill="currentColor" d="M12 2L2 7v6c0 5 4 9 10 9s10-4 10-9V7l-10-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold">YourApp</h1>
              <p className="text-xs text-gray-500">Create your account</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">Welcome 👋</div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Full name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full bg-transparent outline-none pb-2 border-b border-gray-300 placeholder-gray-400 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full bg-transparent outline-none pb-2 border-b border-gray-300 placeholder-gray-400 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className="w-full bg-transparent outline-none pb-2 border-b border-gray-300 placeholder-gray-400 text-gray-800"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-0 top-0 mt-0.5 p-2 rounded-md"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1 .5-2 1.5-3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full py-3 rounded-xl bg-white border border-gray-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path fill="#4285f4" d="M533.5 278.4c0-17.7-1.6-35.2-4.7-52H272v98.6h146.9c-6.4 34.8-25.9 64.3-55.3 84v69.7h89.3c52.2-48 82.6-119 82.6-200.3z" />
              <path fill="#34a853" d="M272 544.3c73.4 0 135-24.3 180-65.9l-89.3-69.7c-24.8 16.6-56.7 26.5-90.7 26.5-69.7 0-128.8-47-150-110.1H31.8v69.1C76.8 486 169.2 544.3 272 544.3z" />
              <path fill="#fbbc04" d="M122 328.1c-10.8-32.3-10.8-67 0-99.3V159.7H31.8c-39.7 77.6-39.7 169.6 0 247.2L122 328.1z" />
              <path fill="#ea4335" d="M272 107.7c39.8-.6 77.8 13.9 106.8 40.1l80-80C405 24 343.4 0 272 0 169.2 0 76.8 58.3 31.8 159.7l90.2 69.1C143.2 154.7 202.3 107.7 272 107.7z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account? <Link to={`/login`} href="#" className="text-indigo-600 hover:underline">Sign in</Link>
          </p>
        </form>

        <div className="p-4 text-xs text-gray-400 text-center border-t border-gray-100">
          By creating an account you agree to our Terms & Privacy
        </div>
      </div>
    </div>
  );
}
