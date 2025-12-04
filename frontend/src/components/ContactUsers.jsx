import React, { useState } from "react";
import { Search } from "lucide-react";
import { useData } from "../context/DataContext";
import Loader from '../loaders/UsersChatLoader'

export default function UsersList() {
  const [search, setSearch] = useState("");
  const { contactUsers , profile , loading} = useData();
  console.log(profile);

  // Dummy users (replace with API data)
  // const users = [
  //   { id: 1, name: "Amit Kumar", avatar: "https://i.pravatar.cc/150?img=12" },
  //   { id: 2, name: "Riya Sharma", avatar: "https://i.pravatar.cc/150?img=32" },
  //   { id: 3, name: "Arjun Singh", avatar: "https://i.pravatar.cc/150?img=56" },
  //   { id: 4, name: "Neha Verma", avatar: "https://i.pravatar.cc/150?img=22" },
  //   { id: 5, name: "Rahul Meena", avatar: "https://i.pravatar.cc/150?img=65" },
  // ];

  // const [users, setusers] = useState([contactUsers]);

  const filtered = contactUsers.filter((u) =>
    u?.fullname?.toLowerCase().includes(search.toLowerCase())
  );

  // console.log(contactUsers);

  const getRandomColor = (name) => {
  const colors = [
    "#ff7675", "#74b9ff", "#55efc4",
    "#ffeaa7", "#a29bfe", "#fd79a8",
    "#fab1a0", "#81ecec"
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

if(loading || !contactUsers || !profile){
  return <Loader/>
}

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
            key={user?._id}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition"
          >
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: getRandomColor(user?.username || "U"),
                }}
              >
                {(user?.username?.[0] || "U").toUpperCase()}
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                {user?._id === profile._id ? user?.fullname + " (You) " : user?.fullname}
              </h4>
              <p className="text-xs text-gray-500">Tap to view profile</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
