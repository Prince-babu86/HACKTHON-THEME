import React, { useState } from "react";
import { Search } from "lucide-react";

export default function UsersList() {
  const [search, setSearch] = useState("");

  // Dummy users (replace with API data)
  const users = [
    { id: 1, name: "Amit Kumar", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: 2, name: "Riya Sharma", avatar: "https://i.pravatar.cc/150?img=32" },
    { id: 3, name: "Arjun Singh", avatar: "https://i.pravatar.cc/150?img=56" },
    { id: 4, name: "Neha Verma", avatar: "https://i.pravatar.cc/150?img=22" },
    { id: 5, name: "Rahul Meena", avatar: "https://i.pravatar.cc/150?img=65" },
  ];

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-lg mx-auto h-screen bg-white border border-gray-200 shadow-sm rounded-xl p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Users</h1>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-2 bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Users List */}
      <div className="space-y-3 overflow-y-auto h-[80vh] pr-2">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition"
          >
            <img
              src={user.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <h4 className="text-sm font-semibold text-gray-800">{user.name}</h4>
              <p className="text-xs text-gray-500">Tap to view profile</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
