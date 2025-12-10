import React, { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";

export default function ChannelAbout({ setshowAboutChannel, channel }) {
  // ✅ fake logged-in user for now
  const currentUser = {
    _id: "user_123",
    name: "You",
  };

  if (!channel) return null;

  const isOwner = channel.createdBy === currentUser._id;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    console.log("Channel deleted:", channel._id);
    alert("Channel deleted (fake)");
    setshowAboutChannel(false);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* ✅ HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">
          Channel info
        </h2>

        <button
          onClick={() => setshowAboutChannel(false)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <X size={18} className="text-gray-700" />
        </button>
      </div>

      {/* ✅ CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
        {/* Channel info */}
        <div className="flex flex-col items-center text-center gap-3">
          {/* ✅ Logo / Initials */}
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
            {channel.logoUrl ? (
              <img
                src={channel.logoUrl}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center 
                           text-white text-2xl font-semibold"
                style={{ backgroundColor: channel.color || "#6366F1" }}
              >
                {getInitials(channel.name)}
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900">
            {channel.name}
          </h3>

          <p className="text-xs text-gray-500">
            {(channel.followers?.length || 0).toLocaleString()} followers
          </p>

          {channel.description && (
            <p className="text-sm text-gray-600 max-w-md mt-1">
              {channel.description}
            </p>
          )}
        </div>

        {/* ✅ Meta */}
        {channel.createdAt && (
          <div className="border-t border-gray-200 pt-4 text-sm text-gray-600">
            <p>
              <span className="font-medium">Created on:</span>{" "}
              {new Date(channel.createdAt).toDateString()}
            </p>
          </div>
        )}

        {/* ✅ Delete (OWNER ONLY) */}
        {isOwner && (
          <div className="border-t border-gray-200 pt-4">
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-2 text-red-600 text-sm font-medium hover:text-red-700"
              >
                <Trash2 size={16} />
                Delete channel
              </button>
            ) : (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-center gap-2 text-red-700 mb-4">
                  <AlertTriangle size={18} />
                  <span className="text-sm font-medium">
                    This action cannot be undone
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ✅ Helper */
function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();
}
