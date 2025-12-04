// Users.jsx
import React, { useState, useMemo } from "react";
import { Search, Plus, MoreVertical } from "lucide-react";
import { useData } from "../context/DataContext";
import UsersSkeleton from "../loaders/UsersChatLoader";
import { useNavigate } from "react-router-dom";

/**
 * Chat-style Users sidebar component
 * - Tailwind CSS required
 * - Demo users included
 */
const demoUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMsg: "Hey — are you free tomorrow?",
    lastTime: "11:24",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMsg: "Thanks for the update 👍",
    lastTime: "10:05",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Charlie Reyes",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMsg: "I'll join the call in 5",
    lastTime: "09:46",
    unread: 5,
    online: true,
  },
  {
    id: "4",
    name: "Diana Wolf",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMsg: "Nice! Send the files when ready.",
    lastTime: "Yesterday",
    unread: 0,
    online: false,
  },
];

export default function Users() {
  const [users, setUsers] = useState(demoUsers);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

   const {profile , setProfile , loading} = useData();
   const navigate = useNavigate();

   const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        (u.lastMsg && u.lastMsg.toLowerCase().includes(q))
    );
  }, [users, query]);

   if(loading || !profile){
    return <UsersSkeleton rows={6}/>;
   }


   
   const navigateChat =  (username) => {
    navigate(`/chat/${username}`)
   }
  

  function handleAddUser() {
    // Quick demo: create a new user with timestamp id
    const id = Date.now().toString();
    const newUser = {
      id,
      name: `New User ${id.slice(-4)}`,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      lastMsg: "Say hi 👋",
      lastTime: "Now",
      unread: 1,
      online: true,
    };
    setUsers((s) => [newUser, ...s]);
    setSelectedId(id);
  }

  function handleSelect(user) {
    setSelectedId(user.id);
    // mark as read (demo)
    setUsers((list) =>
      list.map((u) => (u.id === user.id ? { ...u, unread: 0 } : u))
    );
  }

  return (
    <div className="h-screen w-[450px] bg-white border-r border-gray-200 flex flex-col">
      {/* TOP */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
          {/* <span className="text-xs text-gray-500">All</span> */}
        </div>

        <button
          onClick={handleAddUser}
          aria-label="New user"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">New</span>
        </button>
      </div>

      {/* MIDDLE: Search */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or start new chat"
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-gray-500">
              No chats yet
            </li>
          ) : (
            filtered.map((user) => {
              const active = selectedId === user.id;
              return (
                <li
                onClick={()=>navigateChat(user.name)}
                  key={user.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                    active ? "bg-indigo-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleSelect(user)}
                      className="flex items-center gap-3 w-full text-left"
                    >
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />

                        {/* presence */}
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${
                            user.online ? "bg-green-400" : "bg-gray-300"
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </div>

                          <div className="text-xs text-gray-400 ml-2">
                            {user.lastTime}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500 truncate">
                            {user.lastMsg}
                          </p>

                          {/* unread indicator (blue circle) */}
                          {user.unread && user.unread > 0 ? (
                            <div className="ml-3 flex items-center">
                              <span className="inline-flex items-center justify-center w-7 h-7 text-xs font-semibold text-white bg-blue-500 rounded-full">
                                {user.unread > 99 ? "99+" : user.unread}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </button>

                    {/* 3 dots */}
                    <div className="ml-2 flex-shrink-0">
                      <button
                        onClick={() => alert(`Open menu for ${user.name}`)}
                        className="p-1.5 rounded-md hover:bg-gray-100"
                        aria-label={`Options for ${user.name}`}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* BOTTOM (optional quick actions) */}
      <div className="px-4 py-3 border-t border-gray-100">
        {/* <div className="flex items-center justify-between text-sm text-gray-600">
          <div>Profile</div>
          <div>Settings</div>
        </div> */}
      </div>
    </div>
  );
}
