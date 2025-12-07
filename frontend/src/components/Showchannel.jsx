// ChannelMessages.jsx
import React, { useEffect, useState } from "react";
import { MoreVertical, Plus, Paperclip, Smile, Send, X } from "lucide-react";
import { useData } from "../context/DataContext";
import { useParams } from "react-router-dom";
import instance from "../config/axios.config";
import { useMemo } from "react";

const messages = [
  {
    id: 1,
    type: "text",
    text: "Welcome to the Tech News channel 👋",
  },
  {
    id: 2,
    type: "text",
    text: "AI is moving really fast 🚀🔥",
  },
  {
    id: 3,
    type: "image",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    caption: "New AI research just dropped 🤖✨",
  },
];

const getRandomColor = () => {
  const colors = [
    "#6366F1", // indigo
    "#22C55E", // green
    "#0EA5E9", // blue
    "#F97316", // orange
    "#EC4899", // pink
    "#8B5CF6", // violet
    "#14B8A6", // teal
    "#EF4444", // red
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};



// canPost: only true for channel creator / admin
export default function ChannelMessages({canPost}) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [channel, setchannel] = useState(null || {})

  const {profile} = useData();
  const {id} = useParams()

  const bgColor = getRandomColor()

  const isOwner = async () => {
   try {
    const res =  await instance.get(`/channel/${id}`);
   setchannel(res.data.channel);
   } catch (error) {
    console.log(error);
   }finally{

   }

  }

  useEffect(()=>{
    isOwner()
   
  },[id])

  

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
  };

  const clearFile = () => {
    setFile(null);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!text.trim() && !file) return;

    try {
      setIsSending(true);

      // TODO: hit your API here
      // e.g. send text + file (FormData) to backend
      console.log("Sending:", { text, file });

      // reset
      setText("");
      setFile(null);
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setIsSending(false);
    }
  };



  return (
    <div className="w-full h-screen bg-[#efeae2] flex flex-col">
      {/* Channel header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
       
        <div className="flex gap-4">
          <div style={{backgroundColor:bgColor}} className={`h-9 text-white w-9 rounded-full flex items-center justify-center object-cover  bg-[${bgColor}]`}>
            {channel?.logoUrl ? <img className="h-full w-full rounded-full object-top object-cover" src={channel?.logoUrl}/> : <h4 className="flex text-sm font-semibold items-center justify-center uppercase">{channel?.name?.split(" ").filter(Boolean).slice(0,2).map(word => word[0]).join("")}</h4>}
          </div>
         <div>
           <h2 className="text-sm font-semibold text-gray-900">{channel?.name}</h2>
          <p className="text-xs text-gray-500">{channel?.followers?.length} followers</p>
         </div>
        </div>

        {/* Follow + 3-dot menu */}
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white py-1.5 text-sm font-semibold px-5 cursor-pointer rounded-3xl">
            Follow
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="max-w-[85%] bg-white rounded-lg px-3 py-2 shadow-sm"
          >
            {msg.type === "text" && (
              <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </p>
            )}

            {msg.type === "image" && (
              <div className="space-y-2">
                <img
                  src={msg.image}
                  alt="channel"
                  className="rounded-lg max-h-72 object-cover"
                />
                {msg.caption && (
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {msg.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Composer – only for channel creator/admin */}
      {channel?.createdBy === profile?._id ? (
        <div className="bg-[#f0f2f5] border-t border-gray-300 px-3 py-2">
          {/* file preview bar */}
          {file && (
            <div className="mb-2 flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-gray-200">
              <div className="flex items-center gap-2">
                <Paperclip size={16} className="text-gray-500" />
                <p className="text-xs text-gray-700 truncate max-w-[220px]">
                  {file.name}
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={14} className="text-gray-500" />
              </button>
            </div>
          )}

          {/* input row */}
          <form onSubmit={handleSend} className="flex items-center gap-2">
            {/* hidden file input */}
            <input
              id="channel-file-input"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* plus button -> open file picker */}
            <button
              type="button"
              onClick={() =>
                document.getElementById("channel-file-input")?.click()
              }
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#029171] transition"
            >
              <Plus size={18} className="text-white" />
            </button>

            {/* text input */}
            <div className="flex-1 bg-white rounded-3xl px-3 py-2 flex items-center gap-2">
              <button
                type="button"
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Smile size={18} className="text-gray-500" />
              </button>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a message"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>

            {/* send button */}
            <button
              type="submit"
              disabled={isSending || (!text.trim() && !file)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#008069] disabled:bg-[#9bb3ac] text-white transition"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        // for non-creators: info bar
        <div className="bg-white border-t border-gray-200 px-4 py-2 text-center text-xs text-gray-500">
          Only the channel owner can post messages in this channel.
        </div>
      )}
    </div>
  );
}
