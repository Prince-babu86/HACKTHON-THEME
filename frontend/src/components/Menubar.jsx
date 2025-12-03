// CompactSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  MessageSquare,
  PhoneCall,
  Users,
  Bell,
  Settings,
  User,
} from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/chats", label: "Chats", Icon: MessageSquare },
  { to: "/calls", label: "Calls", Icon: PhoneCall },
  { to: "/contacts", label: "Contacts", Icon: Users },
  { to: "/notifications", label: "Alerts", Icon: Bell },
];

export default function CompactSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-white border-r border-gray-200 flex flex-col justify-between py-4">
      {/* TOP: Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 rounded-lg bg-gray-800 text-white flex items-center justify-center font-bold">
          D
        </div>
      </div>

      {/* MIDDLE: Menu Items */}
      <nav className="flex-1 flex flex-col items-center space-y-6 mt-4">
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-[10px] font-medium ${
                isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800"
              }`
            }
          >
            <Icon size={20} />
            <span className="mt-1">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* BOTTOM: Profile + Settings */}
      <div className="flex flex-col items-center space-y-6 pb-4">
        <NavLink
          to="/settings"
          className="text-gray-500 hover:text-gray-900 text-[10px] flex flex-col items-center"
        >
          <Settings size={20} />
          <span className="mt-1">Settings</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="text-gray-500 hover:text-gray-900 text-[10px] flex flex-col items-center"
        >
          <User size={20} />
          <span className="mt-1">Me</span>
        </NavLink>
      </div>
    </aside>
  );
}
