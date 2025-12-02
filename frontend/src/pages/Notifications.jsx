import React, { useState } from "react";
import {
  Bell,
  MessageSquare,
  UserPlus,
  ShieldAlert,
  Info,
  Trash2,
  CheckCircle2,
} from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    // ---- TODAY ----
    {
      id: 1,
      type: "message",
      text: "Amit sent you a new message.",
      time: "2 min ago",
      unread: true,
      group: "today",
    },
    {
      id: 2,
      type: "friend",
      text: "John requested to add you as a friend.",
      time: "1 hr ago",
      unread: true,
      group: "today",
    },

    // ---- THIS WEEK ----
    {
      id: 3,
      type: "security",
      text: "New login detected from Chrome Windows.",
      time: "2 days ago",
      unread: false,
      group: "week",
    },
    {
      id: 4,
      type: "system",
      text: "App update available. Click to update.",
      time: "3 days ago",
      unread: false,
      group: "week",
    },

    // ---- EARLIER ----
    {
      id: 5,
      type: "message",
      text: "Riya reacted to your message.",
      time: "1 week ago",
      unread: false,
      group: "earlier",
    },
  ]);

  // Mark as read/unread
  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, unread: !n.unread } : n
      )
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Clear all
  const clearAll = () => {
    setNotifications([]);
  };

  const iconMap = {
    message: <MessageSquare size={18} className="text-blue-600" />,
    friend: <UserPlus size={18} className="text-indigo-600" />,
    security: <ShieldAlert size={18} className="text-red-600" />,
    system: <Info size={18} className="text-green-600" />,
  };

  const groups = {
    today: "Today",
    week: "This Week",
    earlier: "Earlier",
  };

  return (
    <div className="w-full mx-auto bg-white border border-gray-200 shadow-sm rounded-xl p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell size={24} className="text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="text-red-600 text-sm hover:underline flex items-center gap-1"
          >
            <Trash2 size={16} /> Clear All
          </button>
        )}
      </div>

      {/* No Notifications */}
      {notifications.length === 0 && (
        <div className="text-center py-20 text-gray-500 text-sm">
          No notifications found.
        </div>
      )}

      {/* Notification Groups */}
      {Object.keys(groups).map((group) => {
        const items = notifications.filter((n) => n.group === group);

        if (items.length === 0) return null;

        return (
          <div key={group} className="mb-8">
            <h2 className="text-gray-500 text-sm font-semibold mb-2">
              {groups[group]}
            </h2>

            <div className="space-y-3">
              {items.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition ${
                    n.unread ? "border-indigo-300 bg-indigo-50" : "border-gray-200"
                  }`}
                >
                  {/* Left Section */}
                  <div className="flex items-center gap-3">
                    {iconMap[n.type]}

                    <div>
                      <p
                        className={`text-sm font-medium ${
                          n.unread ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {n.text}
                      </p>

                      <span className="text-xs text-gray-500">{n.time}</span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-3">
                    {/* Mark Read / Unread */}
                    <button
                      onClick={() => toggleRead(n.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {n.unread ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <span className="text-xs underline">Unread</span>
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
