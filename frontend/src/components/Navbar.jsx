import React, { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function PremiumNavbar() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const [themeOnUi, setThemeOnUi] = useState(false); // purely visual toggle (no global feature)

  const links = ["Home", "Products", "Pricing", "Docs", "Contact"];

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Brand */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md">
                {/* subtle brand mark */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" fill="rgba(255,255,255,0.12)" />
                  <path d="M7 12a5 5 0 015-5v10a5 5 0 01-5-5z" fill="white" />
                </svg>
              </div>
              <span className="font-semibold text-lg text-gray-800">FlowMate</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center ml-6 space-x-1">
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  onClick={() => setActive(l)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${
                    active === l
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-current={active === l ? "page" : undefined}
                >
                  <span>{l}</span>
                  {/* Active underline */}
                  <span
                    aria-hidden
                    className={`absolute left-1/2 transform -translate-x-1/2 bottom-0 h-0.5 rounded-full transition-all duration-200 ${
                      active === l ? "w-10 bg-gradient-to-r from-indigo-500 to-violet-500" : "w-0 bg-transparent"
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: actions */}
          <div className="flex items-center gap-4">
            {/* Search - visual only */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-1 shadow-sm">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-40"
                aria-label="Search"
              />
            </div>

            {/* Theme toggle (UI-only) */}
            <button
              onClick={() => setThemeOnUi((s) => !s)}
              aria-pressed={themeOnUi}
              className="group relative flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              title="Toggle theme (visual only)"
            >
              <div className="w-9 h-5 rounded-full bg-gradient-to-r from-indigo-50 to-gray-50 flex items-center p-0.5 transition-colors duration-200">
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${
                    themeOnUi ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>

              <div className="hidden sm:flex items-center text-xs text-gray-600">
                {themeOnUi ? <Moon size={14} /> : <Sun size={14} />}
                <span className="ml-1">{themeOnUi ? "Dark" : "Light"}</span>
              </div>
            </button>

            {/* CTA */}
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-shadow duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              Try Premium
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        {open && (
          <div className="mt-3 md:hidden px-2 pb-4">
            <div className="space-y-1">
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  onClick={() => {
                    setActive(l);
                    setOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    active === l ? "text-gray-900 bg-gray-50" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
