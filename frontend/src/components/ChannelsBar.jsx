// ChannelsList.jsx
import React, { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const joinedChannelsMock = [
  {
    id: 1,
    name: "General",
    logo: "https://ui-avatars.com/api/?name=General&background=6366f1&color=fff",
    description: "Announcements and general discussion.",
  },
  {
    id: 2,
    name: "Development",
    logo: "https://ui-avatars.com/api/?name=Dev&background=0ea5e9&color=fff",
    description: "Talk about code, bugs, and features.",
  },
  {
    id: 3,
    name: "Design",
    logo: "https://ui-avatars.com/api/?name=Design&background=ec4899&color=fff",
    description: "UI, UX, and branding discussions.",
  },
];

const suggestedChannelsMock = [
  {
    id: 101,
    name: "AI & ML",
    logo: "https://ui-avatars.com/api/?name=AI&background=22c55e&color=fff",
    description: "Everything about AI, ML, and LLMs.",
  },
  {
    id: 102,
    name: "Open Source",
    logo: "https://ui-avatars.com/api/?name=OSS&background=f97316&color=fff",
    description: "Contribute, collaborate, and learn in OSS.",
  },
  {
    id: 103,
    name: "Career & Growth",
    logo: "https://ui-avatars.com/api/?name=Career&background=8b5cf6&color=fff",
    description: "Internships, jobs, and growth tips.",
  },
];

export default function ChannelsList() {
  const [search, setSearch] = useState("");

  const joinedChannels = useMemo(() => {
    if (!search.trim()) return joinedChannelsMock;
    const s = search.toLowerCase();
    return joinedChannelsMock.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s)
    );
  }, [search]);

  const suggestedChannels = useMemo(() => {
    if (!search.trim()) return suggestedChannelsMock;
    const s = search.toLowerCase();
    return suggestedChannelsMock.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s)
    );
  }, [search]);


  const navigate = useNavigate()

  const handleCreateClick = () => {
    // just a placeholder
    // you can open a different page, modal, or call a function from props here

    console.log("Create channel clicked");
    navigate(`/channels/create`);
  };


  const swithChannel = async (id) => {
    navigate(`/channels/${id}`)
  }

  return (
    <div className="w-full max-w-md min-h-screen border-r-2 border-gray-300 bg-white flex flex-col">
      {/* Top bar (like WhatsApp search area + create button) */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search channels"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={handleCreateClick}
          className="ml-1 inline-flex items-center justify-center rounded-full bg-indigo-600 text-white p-2 hover:bg-indigo-700 transition"
          title="Create channel"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-3">
        {/* Joined channels */}
        <div className="mt-3">
          <h2 className="text-xs font-semibold text-gray-500 tracking-wide mb-2">
            YOUR CHANNELS
          </h2>

          {joinedChannels.length === 0 ? (
            <p className="text-xs text-gray-400 pl-1">
              You have not joined any channels yet.
            </p>
          ) : (
            <div className="space-y-2">
              {joinedChannels.map((channel) => (
                <ChannelRow  key={channel.id} onselect={swithChannel} channel={channel} />
              ))}
            </div>
          )}
        </div>

        {/* Suggested at bottom */}
        <div className="mt-6 pb-4">
          <h2 className="text-xs font-semibold text-gray-500 tracking-wide mb-2">
            SUGGESTED CHANNELS
          </h2>

          {suggestedChannels.length === 0 ? (
            <p className="text-xs text-gray-400 pl-1">
              No suggested channels found for this search.
            </p>
          ) : (
            <div className="space-y-2">
              {suggestedChannels.map((channel) => (
                <ChannelRow key={channel.id}  channel={channel} suggested />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChannelRow({ channel, suggested = false , onselect }) {
  return (
    <div onClick={()=> onselect(channel.id)} className=" flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition">
      <div  className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
        {channel.logo ? (
          <img
            src={channel.logo}
            alt={channel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs font-semibold text-gray-600">
            {channel.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-800 truncate">
            {channel.name}
          </p>
          {suggested && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium shrink-0">
              Suggested
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">
          {channel.description}
        </p>
      </div>
    </div>
  );
}
