import { Plus, CheckCheck } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../config/socket.config";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "other", // 👈 other user
      text: "Hey! Let's get to know each other.",
      time: Date.now(),
      status: "seen", // sent | delivered | seen
    },
    {
      id: 2,
      from: "user",
      text: "Hi there! 😊",
      time: Date.now(),
      status: "seen",
    },
    {
      id: 3,
      from: "user",
      text: "Show me what you can do",
      time: Date.now(),
      status: "sent",
    },
    {
      id: 4,
      from: "other",
      text: "Sure! This is a user-to-user chat now.",
      time: Date.now(),
      status: "sent",
    },
  ]);

  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]); // files selected before send
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);


  const {id} = useParams()
  // console.log(id);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ---------- Avatar helper ----------
  const Avatar = ({ user = "U", size = 40 }) => {
    const name = user || "U";
    const first = name.charAt(0).toUpperCase();
    const colors = [
      "bg-purple-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = colors[Math.abs(hash) % colors.length];

    return (
      <div
        className={`flex items-center justify-center rounded-full text-white font-semibold ${color}`}
        style={{ width: size, height: size }}
      >
        {first}
      </div>
    );
  };

  // ---------- Attachments handlers ----------
  const handleFilesAdded = (files) => {
    const arr = Array.from(files).map((file) => ({
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      name: file.name,
      size: file.size,
    }));
    setAttachments((a) => [...a, ...arr]);
  };

  const onFileInputChange = (e) => {
    if (e.target.files?.length) {
      handleFilesAdded(e.target.files);
    }
    e.target.value = null;
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const onDragOver = (e) => e.preventDefault();

  const removeAttachment = (id) => {
    setAttachments((a) => {
      const att = a.find((x) => x.id === id);
      if (att?.preview) URL.revokeObjectURL(att.preview);
      return a.filter((x) => x.id !== id);
    });
  };

  // ---------- Send message (only local, no upload) ----------
  const sendMessage = () => {
    if (!input.trim() && attachments.length === 0) return;

    const messageId =
      Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

    const newMessage = {
      id: messageId,
      from: "user",
      text: input.trim(),
      time: Date.now(),
      status: "sent", // default when you send
      attachments: attachments.map((att) => ({
        id: att.id,
        name: att.name,
        preview: att.preview,
        size: att.size,
      })),
    };

    socket.emit("send-message" , {receiverId:id , text:input});

    

    setMessages((m) => [...m, newMessage]);
    setInput("");
    setAttachments([]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (ts) => {
    const d = new Date(ts || Date.now());
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getTickColor = (status) => {
    // you can tweak this mapping like WhatsApp style
    if (status === "seen") return "text-sky-400"; // blue double tick
    if (status === "delivered") return "text-gray-400"; // gray double tick
    return "text-gray-500"; // sent
  };


  useEffect(()=>{
    socket.on("receive-message" , async(data) => {
      console.log(`data from backend ${JSON.stringify(data)}`);
    } )
  },[id])

  return (
    <div className="flex flex-col max-w-5xl w-full h-screen bg-black text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-800 bg-black/95">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-md hover:bg-gray-900"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <Avatar user="A" size={36} />
            <div>
              <h2 className="text-lg font-semibold">Chat with Alex</h2>
              <p className="text-xs text-gray-400">User to user chat</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-md hover:bg-gray-900"
            aria-label="More"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="1" fill="#e5e7eb" />
              <circle cx="19" cy="12" r="1" fill="#e5e7eb" />
              <circle cx="5" cy="12" r="1" fill="#e5e7eb" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto px-6 py-6 bg-gradient-to-b from-black via-black to-gray-950"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => {
            const isUser = msg.from === "user";
            return (
              <div
                key={msg.id}
                className={`flex w-full ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {/* Left side (other user) */}
                {!isUser && (
                  <div className="flex items-start gap-3 max-w-[70%]">
                    <Avatar user="A" size={40} />
                    <div>
                      <div className="bg-gray-900/90 border border-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-gray-100 whitespace-pre-wrap break-words shadow-sm">
                        {msg.text}

                        {msg.attachments?.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {msg.attachments.map((a) => (
                              <div key={a.id} className="text-xs">
                                {a.preview ? (
                                  <img
                                    src={a.preview}
                                    alt={a.name}
                                    className="rounded-lg border border-gray-700 max-h-40 object-cover"
                                  />
                                ) : (
                                  <div className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700">
                                    <div className="font-medium truncate">
                                      {a.name}
                                    </div>
                                    <div className="text-[10px] text-gray-400">
                                      {(a.size / 1024).toFixed(0)} KB
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-1 text-[11px] text-gray-500">
                        {formatTime(msg.time)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Right side (you) */}
                {isUser && (
                  <div className="flex items-start gap-3 max-w-[70%] justify-end">
                    <div className="flex flex-col items-end flex-1">
                      <div className="bg-indigo-600/90 px-4 py-3 rounded-2xl rounded-tr-sm text-sm text-white whitespace-pre-wrap break-words shadow">
                        {msg.text}

                        {msg.attachments?.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {msg.attachments.map((a) => (
                              <div key={a.id} className="text-xs">
                                {a.preview ? (
                                  <img
                                    src={a.preview}
                                    alt={a.name}
                                    className="rounded-lg border border-indigo-300/40 max-h-40 object-cover"
                                  />
                                ) : (
                                  <div className="px-3 py-2 rounded-lg bg-indigo-700/80 border border-indigo-300/40">
                                    <div className="font-medium truncate">
                                      {a.name}
                                    </div>
                                    <div className="text-[10px] text-indigo-100/80">
                                      {(a.size / 1024).toFixed(0)} KB
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-1 text-[11px] text-gray-500 flex items-center gap-1">
                        <span>{formatTime(msg.time)}</span>
                        {/* ✅ double tick only on your messages */}
                        <CheckCheck
                          className={`w-3 h-3 ${getTickColor(msg.status)}`}
                        />
                      </div>
                    </div>

                    <Avatar user="You" size={40} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-gray-800 px-6 py-4 bg-black/95">
        <div className="max-w-4xl mx-auto">
          {/* attachment previews (before sending) */}
          {attachments.length > 0 && (
            <div className="mb-3 flex gap-3 flex-wrap">
              {attachments.map((a) => (
                <div key={a.id} className="relative">
                  {a.preview ? (
                    <img
                      src={a.preview}
                      alt={a.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-[10px] p-2 text-center">
                      <div>
                        <div className="font-semibold truncate">
                          {a.name.split(".")[0].slice(0, 8)}
                        </div>
                        <div className="text-gray-400">
                          {(a.size / 1024).toFixed(0)} KB
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => removeAttachment(a.id)}
                    className="absolute -top-2 -right-2 bg-black border border-gray-600 rounded-full p-1 text-[10px]"
                    aria-label="Remove attachment"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-full border border-gray-700 bg-black px-5 py-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/60 placeholder:text-gray-500"
            />

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={onFileInputChange}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full hover:bg-gray-900"
              title="Attach files"
            >
              <Plus />
            </button>

            <button
              onClick={sendMessage}
              className="px-5 py-2.5 rounded-full bg-purple-600 text-sm font-medium text-white hover:bg-purple-700 active:bg-purple-800 shadow"
            >
              Send
            </button>
          </div>

          <div className="mt-2 text-[11px] text-gray-500">
            Enter to send • Shift+Enter for newline • Drag & drop files into the
            chat
          </div>
        </div>
      </div>
    </div>
  );
}
