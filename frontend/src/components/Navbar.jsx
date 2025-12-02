// Navbar.jsx
// Navbar updated to work with a fixed left sidemenu of w-20 (5rem).
// The header is fixed at top, left offset 5rem, width = calc(100vw - 5rem).

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MessageSquare,
  PhoneCall,
  Users,
  Bell,
  ShoppingCart,
  User,
  Search,
  Sun,
  Moon,
  Home,
} from 'lucide-react';

export default function Navbar({ onSearch }) {
  const links = [
    { to: '/dashboard', label: 'Home', Icon: Home },
    { to: '/chats', label: 'Chats', Icon: MessageSquare },
    { to: '/calls', label: 'Calls', Icon: PhoneCall },
    { to: '/contacts', label: 'Contacts', Icon: Users },
    { to: '/notifications', label: 'Notifications', Icon: Bell },
  ];

  const [query, setQuery] = useState('');
  const [toggle, setToggle] = useState(false); // UI toggle only

  return (
    // fixed header: top:0, left:5rem (sidebar width), width: calc(100vw - 5rem)
    <header
      className="fixed top-0 left-[5rem] w-[calc(100vw-15rem)] z-20 bg-gradient-to-r from-gray-100 to-white border-b border-gray-200"
      style={{ height: '56px' }} // optional explicit height; matches h-14
    >
      {/* If you prefer a glass effect, add: backdrop-blur-sm bg-opacity-60 */}
      <div className="h-14 flex items-center justify-between px-4">
        {/* Left: Brand + Search */}
        <div className="flex items-center gap-4 min-w-0">
          <NavLink to="/" className="text-lg sm:text-xl font-serif text-gray-900 truncate">
            David Whyte
          </NavLink>

          {/* Search input (visible on sm+) */}
          <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-md px-2 py-1 text-sm shadow-sm">
            <Search size={16} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Search chats, people..."
              className="ml-2 w-56 bg-transparent outline-none text-sm text-gray-700"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Center: Links (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-4 text-sm text-gray-700">
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-1 rounded-sm transition-colors duration-150 ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <Icon size={16} />
              <span className="hidden lg:inline-block">{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Toggle - visual only */}
          <button
            onClick={() => setToggle((v) => !v)}
            aria-label="Toggle visual"
            className={`p-2 rounded-md transition-colors duration-200 ${
              toggle ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            title="Toggle (visual only)"
          >
            {toggle ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Optional action/button */}
          <button
            className="hidden sm:inline-block bg-black text-white text-xs sm:text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-95"
            aria-label="Coming soon"
          >
            Coming soon
          </button>

          <button aria-label="Cart" className="p-2 rounded-md hover:bg-gray-100">
            <ShoppingCart size={18} />
          </button>

          <button aria-label="Profile" className="p-2 rounded-md hover:bg-gray-100">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
