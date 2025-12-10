// ChannelMessages.jsx
import React, { useEffect, useState, useRef } from "react";
import { MoreVertical, Plus, Paperclip, Smile, Send, X } from "lucide-react";
import { useData } from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../config/axios.config";
import ChannelAbout from "./AboutChannel";

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

export default function ChannelMessages() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // for WhatsApp-like preview
  const [isSending, setIsSending] = useState(false);
  const [channel, setChannel] = useState({});
  const [showAboutChannel, setShowAboutChannel] = useState(false);
  const [messages, setMessages] = useState([]);

  const { profile } = useData();
  const { id } = useParams();
  const navigate = useNavigate();

  const bgColor = getRandomColor();
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChannel = async () => {
    try {
      const res = await instance.get(`/channel/${id}`);
      setChannel(res.data.channel || {});
    } catch (error) {
      console.error("Error fetching channel:", error);
    }
  };

  const getAllMessages = async () => {
    try {
      const res = await instance.get(`/channel/all-messages/${id}`);
      // Expecting: { message: "...", messages: [...] }
      setMessages(res.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchChannel();
    getAllMessages();
  }, [id]);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);

    // Create preview URL for WhatsApp-like image preview
    if (selected.type.startsWith("image/")) {
      const url = URL.createObjectURL(selected);
      setFilePreview(url);
    } else {
      setFilePreview(null);
    }
  };

  const clearFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setFile(null);
    setFilePreview(null);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!text.trim() && !file) return;

    try {
      setIsSending(true);

      const formData = new FormData();
      formData.append("text", text || "");
      if (file) {
        // IMPORTANT: This field name must match multer: upload.single("fileUrl")
        formData.append("fileUrl", file);
      }

      const res = await instance.post(`/channel/message/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Backend response expected: { message: "Sent Sucessfuly", message: {...} }
      const newMessage = res.data.message;

      if (newMessage) {
        setMessages((prev) => [...prev, newMessage]);
      }

      setText("");
      clearFile();
      scrollToBottom();
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setIsSending(false);
    }
  };

  const switchAboutChannel = () => {
    setShowAboutChannel(true);
  };

  const isOwner = channel?.createdBy === profile?._id;

  return (
    <div className="flex w-full">
      <div className="w-full h-screen bg-[#efeae2] flex flex-col">
        {/* Channel header */}
        <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
          <div
            onClick={switchAboutChannel}
            className="flex gap-4 cursor-pointer"
          >
            <div
              style={{ backgroundColor: bgColor }}
              className="h-9 w-9 rounded-full flex items-center justify-center overflow-hidden"
            >
              {channel?.logoUrl ? (
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src={channel?.logoUrl}
                  alt="channel-logo"
                />
              ) : (
                <h4 className="text-sm font-semibold text-white uppercase">
                  {channel?.name
                    ?.split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </h4>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                {channel?.name}
              </h2>
              <p className="text-xs text-gray-500">
                {channel?.followers?.length || 0} followers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-blue-600 text-white py-1.5 text-sm font-semibold px-5 cursor-pointer rounded-3xl">
              Follow
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical size={20} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id || msg.id}
              className="max-w-[85%] bg-white rounded-lg px-3 py-2 shadow-sm"
            >
              {msg.type === "text" && (
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {msg?.text}
                </p>
              )}

              {msg.type === "image" && (
                <div className="space-y-2">
                  <img
                    src={msg?.fileUrl}
                    alt="channel"
                    className="rounded-lg max-h-72 object-cover"
                  />
                  {msg?.text && (
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {msg.text}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* dummy div to scroll to bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Composer – only for channel creator/admin */}
        {isOwner ? (
          <div className="bg-[#f0f2f5] border-t border-gray-300 px-3 py-2">
            {/* WhatsApp-like image preview / file preview */}
            {file && (
              <div className="mb-2 flex items-center gap-3 rounded-lg bg-white px-3 py-2 border border-gray-200">
                {filePreview && file.type.startsWith("image/") ? (
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={filePreview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-700 truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        Image ready to send
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Paperclip size={16} className="text-gray-500" />
                    <p className="text-xs text-gray-700 truncate max-w-[220px]">
                      {file.name}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={clearFile}
                  className="ml-auto p-1 rounded-full hover:bg-gray-100"
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
                accept="image/*" // if only images are allowed
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
          <div className="bg-white border-t border-gray-200 px-4 py-2 text-center text-xs text-gray-500">
            Only the channel owner can post messages in this channel.
          </div>
        )}
      </div>

      {showAboutChannel && <ChannelAbout />}
    </div>
  );
}
