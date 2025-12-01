import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: logo */}
          <div className="flex items-center gap-6">
            <div className="text-lg font-semibold tracking-tight">Brand</div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors duration-200 px-0 py-1
                     ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="inline-block">{item.name}</span>

                      {/* underline */}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300
                          ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                        style={{ width: isActive ? "100%" : undefined }}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right: search + profile + mobile button */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-sm">
              <label htmlFor="nav-search" className="sr-only">
                Search
              </label>
              <svg
                className="w-4 h-4 text-gray-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
              </svg>

              <input
                id="nav-search"
                type="search"
                placeholder="Search"
                className="bg-transparent outline-none text-sm placeholder-gray-400 w-40"
                aria-label="Search"
              />
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 rounded-full p-1"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
              >
                {/* avatar */}
                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center text-sm text-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1548142813-3d5a0fdf2f8a?q=80&w=64&auto=format&fit=crop&crop=faces"
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* small name on larger screens */}
                <span className="hidden sm:inline-block text-sm text-gray-700">Prince</span>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20"
                  role="menu"
                  aria-label="Profile options"
                >
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Profile
                  </a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Settings
                  </a>
                  <div className="border-t border-gray-100 my-1" />
                  <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                    Logout
                  </a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((s) => !s)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block text-sm py-2 rounded-md px-2 transition-colors duration-150
                   ${isActive ? "text-black bg-gray-50" : "text-gray-600 hover:text-black hover:bg-gray-50"}`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* mobile search */}
            <div className="pt-2">
              <label htmlFor="mobile-search" className="sr-only">Search</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-sm">
                <svg className="w-4 h-4 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                </svg>
                <input id="mobile-search" type="search" placeholder="Search" className="bg-transparent outline-none text-sm placeholder-gray-400 w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
