// ChannelsList.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import instance from "../config/axios.config";

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

export default function ChannelsList() {
  const [search, setSearch] = useState("");
  const [suggestedChannelsMock, setsuggestedChannelsMock] = useState([]);
  const [loader, setloader] = useState(false);

  const navigate = useNavigate();

  const getAllChannels = async () => {
    try {
      setloader(true);
      const res = await instance.get("/channel/all");
      // make sure your backend returns { channels: [...] }
      setsuggestedChannelsMock(res.data.channels || []);
    } catch (error) {
      console.log(error);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    getAllChannels();
  }, []);

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
        (c.description && c.description.toLowerCase().includes(s))
    );
  }, [search, suggestedChannelsMock]);

  const handleCreateClick = () => {
    navigate(`/channels/create`);
  };

  const swithChannel = (id) => {
    navigate(`/channels/${id}`);
  };

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
      <div className="flex-1 max-h-[88vh] overflow-y-auto px-4 pb-3"> 
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
                <ChannelRow
                  key={channel.id}
                  onselect={swithChannel}
                  channel={channel}
                />
              ))}
            </div>
          )}
        </div>

        {/* Suggested at bottom */}
        <div className="mt-6 pb-4">
          <h2 className="text-xs font-semibold text-gray-500 tracking-wide mb-2">
            SUGGESTED CHANNELS
          </h2>

          {/* Loader while fetching */}
          {loader ? (
            <div className="flex justify-center items-center py-6">
              <Loader className="animate-spin text-gray-400" size={20} />
              <span className="text-xs text-gray-500 ml-2">
                Loading channels...
              </span>
            </div>
          ) : suggestedChannels.length === 0 ? (
            <p className="text-xs text-gray-400 pl-1">
              No suggested channels found{search ? " for this search." : "."}
            </p>
          ) : (
            <div className="space-y-2">
              {suggestedChannels.map((channel) => (
                <ChannelRow
                  key={channel._id || channel.id}
                  channel={channel}
                  suggested
                  onselect={swithChannel}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChannelRow({ channel, suggested = false, onselect }) {
  const handleClick = () => {
    // use _id from backend if exists, else fallback to id
    const id = channel._id || channel.id;
    if (onselect && id) {
      onselect(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition"
    >
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
        {channel?.logoUrl ? <img className="h-full w-full rounded-full object-top object-cover" src={channel?.logoUrl}/> : <h4 className="flex text-sm font-semibold items-center justify-center uppercase">{channel?.name?.split(" ").filter(Boolean).slice(0,2).map(word => word[0]).join("")}</h4>}
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
