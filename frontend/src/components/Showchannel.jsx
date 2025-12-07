// ChannelMessages.jsx
import React from "react";
import { MoreVertical } from "lucide-react";

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

export default function ChannelMessages() {
  return (
    <div className="w-full h-screen bg-[#efeae2] flex flex-col">
      {/* Channel header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Tech News
          </h2>
          <p className="text-xs text-gray-500">
            27k followers
          </p>
        </div>

        {/* 3-dot menu */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreVertical size={20} className="text-gray-700" />
        </button>
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
    </div>
  );
}
