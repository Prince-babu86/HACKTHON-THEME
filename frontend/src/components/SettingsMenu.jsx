import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Mail,
  Bell,
  Eye,
  Brush,
  MessageSquare,
  Lock,
  PlugZap,
  AlertTriangle,
  Globe,
  Monitor,
  BadgeCheck,
  History,
  HelpCircle,
} from "lucide-react";

export default function SettingsMenu() {
  const menus = [
    { name: "Profile", path: "/settings", icon: <User size={18} /> },
    { name: "Account", path: "/settings/account", icon: <Mail size={18} /> },
    {
      name: "Notifications",
      path: "/settings/notifications",
      icon: <Bell size={18} />,
    },
    { name: "Privacy", path: "/settings/privacy", icon: <Eye size={18} /> },
    {
      name: "Appearance",
      path: "/settings/appearance",
      icon: <Brush size={18} />,
    },
    {
      name: "Chats",
      path: "/settings/chats",
      icon: <MessageSquare size={18} />,
    },
    { name: "Language", path: "/settings/language", icon: <Globe size={18} /> },
    { name: "Devices", path: "/settings/devices", icon: <Monitor size={18} /> },
    { name: "Security", path: "/settings/security", icon: <Lock size={18} /> },
    {
      name: "Verification",
      path: "/settings/verification",
      icon: <BadgeCheck size={18} />,
    },
    {
      name: "Activity Log",
      path: "/settings/activity",
      icon: <History size={18} />,
    },
    {
      name: "Help & Support",
      path: "/settings/help",
      icon: <HelpCircle size={18} />,
    },
    {
      name: "Danger Zone",
      path: "/settings/danger",
      icon: <AlertTriangle size={18} />,
      danger: true,
    },
  ];

  return (
    <div className="w-72 fixed bg-white h-screen p-5 border-r border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

      <div className="flex flex-col gap-2">
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/settings"} // Only profile uses 'end'
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm font-medium
    ${
      item.danger
        ? "text-red-600 hover:bg-red-100"
        : "text-gray-700 hover:bg-gray-100"
    }
    ${
      isActive ? (item.danger ? "bg-red-100" : "bg-gray-200 text-gray-900") : ""
    }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
