import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { useData } from "../../context/DataContext";
import HomePageLoader from "../../loaders/HomePageLoader";

export default function ProfileSettings() {
  // const [profile, setProfile] = useState({
  //   avatar: null,
  //   name: "John Doe",
  //   username: "john_doe",
  //   bio: "Chatting all day, coding all night.",
  //   status: "online",
  //   phone: "+91 98765 43210",
  //   email: "johndoe@gmail.com",
  // });

  const {profile , setProfile , loading} = useData();

  // const [, set] = useState(second)

  if(loading || !profile){
    // return <HomePageLoader/>;
  }


  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile((p) => ({ ...p, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const saveProfile = () => {
    console.log("Saving profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="w-[800px] mx-auto bg-white shadow-sm rounded-xl border border-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>

      {/* Avatar */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-24 h-24">
          <img
            src={profile?.profilePic || "https://via.placeholder.com/150"}
            alt="avatar"
            className="w-full h-full rounded-full object-cover border"
          />
          <label className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700">
            <Camera size={18} className="text-white" />
            <input type="file" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        <div>
          <p className="text-gray-700 font-semibold">{profile?.fullname}</p>
          <p className="text-gray-500 text-sm">@{profile?.username}</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-5">

        {/* Name */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Full Name</label>
          <input
            name="name"
            value={profile?.fullname}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Username */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Username</label>
          <input
            name="username"
            value={profile?.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Bio</label>
          <textarea
            name="bio"
            rows="3"
            value={profile?.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Status</label>
          <select
            name="status"
            value={profile?.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="online">Online</option>
            <option value="busy">Busy</option>
            <option value="away">Away</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Phone Number</label>
          <input
            name="phone"
            value={profile?.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Email (readonly for security) */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">Email</label>
          <input
            value={profile?.email}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-8 gap-3">
        <button className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button
          onClick={saveProfile}
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
