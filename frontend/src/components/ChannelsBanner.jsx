// ChannelsDiscoverEmpty.jsx
import React from "react";
import { MessageCircleMore } from "lucide-react";

export default function ChannelsDiscoverEmpty() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Top spacer (optional header space) */}
      {/* <div className="h-12 border-b border-gray-200 bg-white" /> */}

      {/* Centered empty-state content */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center text-center px-4">
          {/* Icon circle */}
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-5">
            <MessageCircleMore className="w-8 h-8 text-gray-500" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Discover channels
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-sm text-gray-500 leading-relaxed">
            Entertainment, sports, news, lifestyle, people and more. Follow the
            channels that interest you and stay updated with what matters to you.
          </p>
        </div>
      </div>
    </div>
  );
}
