import React, { useEffect, useRef, useState } from "react";

/**
 * ChatUI.jsx
 * - Tailwind CSS required
 * - Drop into your app: import ChatUI from './ChatUI'; <ChatUI />
 *
 * Notes:
 * - Upload is simulated (uploadFileSimulated). Replace with real upload (axios/formData + onUploadProgress)
 * - Bubbles use same color (bg-gray-100 text-gray-700) for both sides as requested
 */

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Welcome to Mattered! Let's get to know each other.", time: Date.now(), status: "sent" },
    { id: 2, from: "user", text: "Hi Mattered!", time: Date.now(), status: "sent" },
    { id: 3, from: "user", text: "Show me what you can do", time: Date.now(), status: "sent" },
    { id: 4, from: "bot", text: "You got it! Here we go...", time: Date.now(), status: "sent" },
  ]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]); // local files staged for send
  const [isBotTyping, setIsBotTyping] = useState(false);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // scroll to bottom
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, attachments]);

  // ---------- Avatar helper ----------
  const Avatar = ({ user = "U", size = 40 }) => {
    const name = user || "U";
    const first = name.charAt(0).toUpperCase();
    const colors = ["bg-purple-400", "bg-green-400", "bg-yellow-400", "bg-pink-400", "bg-indigo-400", "bg-teal-400"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const color = colors[Math.abs(hash) % colors.length];
    return (
      <div className={`flex items-center justify-center rounded-full text-white font-semibold ${color}`}
           style={{ width: size, height: size }}>
        {first}
      </div>
    );
  };

  // ---------- Attachments handlers ----------
  const handleFilesAdded = (files) => {
    const arr = Array.from(files).map((file) => ({
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      name: file.name,
      size: file.size,
      progress: 0,
    }));
    setAttachments((a) => [...a, ...arr]);
  };

  const onFileInputChange = (e) => {
    handleFilesAdded(e.target.files);
    e.target.value = null;
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) handleFilesAdded(e.dataTransfer.files);
  };

  const onDragOver = (e) => e.preventDefault();

  const removeAttachment = (id) => {
    setAttachments((a) => {
      const att = a.find(x => x.id === id);
      if (att?.preview) URL.revokeObjectURL(att.preview);
      return a.filter(x => x.id !== id);
    });
  };

  // ---------- Simulated upload (replace with actual upload) ----------
  const uploadFileSimulated = (attachment, onProgress) => {
    return new Promise((resolve) => {
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.floor(Math.random() * 20) + 10;
        if (prog >= 100) prog = 100;
        onProgress(prog);
        if (prog >= 100) {
          clearInterval(interval);
          resolve({ url: attachment.preview || `https://storage.example.com/${attachment.name}` });
        }
      }, 300);
    });
  };

  // ---------- Send message ----------
  const sendMessage = async () => {
    if (!input.trim() && attachments.length === 0) return;

    const messageId = Date.now() + Math.random().toString(36).slice(2, 6);
    const newMessage = {
      id: messageId,
      from: "user",
      text: input.trim() || "",
      time: Date.now(),
      status: "sending",
      attachments: attachments.map(att => ({ id: att.id, name: att.name, preview: att.preview, url: null, progress: 0 })),
    };

    // append message locally
    setMessages((m) => [...m, newMessage]);

    // clear UI composer
    setInput("");
    setAttachments([]);

    // upload attachments sequentially (or parallel) and update progress in message
    if (newMessage.attachments.length > 0) {
      for (let i = 0; i < newMessage.attachments.length; i++) {
        const attachMeta = newMessage.attachments[i];
        const fakeAttachment = { id: attachMeta.id, name: attachMeta.name, preview: attachMeta.preview };

        await uploadFileSimulated(fakeAttachment, (p) => {
          setMessages((msgs) =>
            msgs.map((msg) =>
              msg.id === messageId
                ? { ...msg, attachments: msg.attachments.map((a) => (a.id === attachMeta.id ? { ...a, progress: p } : a)) }
                : msg
            )
          );
        }).then((result) => {
          setMessages((msgs) =>
            msgs.map((msg) =>
              msg.id === messageId
                ? { ...msg, attachments: msg.attachments.map((a) => (a.id === attachMeta.id ? { ...a, url: result.url, progress: 100 } : a)) }
                : msg
            )
          );
        });
      }
    }

    // finalize message
    setMessages((msgs) => msgs.map(m => m.id === messageId ? { ...m, status: "sent", time: Date.now() } : m));

    // simulate bot reply
    setIsBotTyping(true);
    setTimeout(() => {
      const botMsg = { id: Date.now() + 2, from: "bot", text: "Got it — I processed your message (demo).", time: Date.now(), status: "sent" };
      setMessages((m) => [...m, botMsg]);
      setIsBotTyping(false);
    }, 900);
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

  return (
    <div className="flex flex-col max-w-5xl w-full h-screen bg-white">
      {/* Header with audio/video icons */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="12" rx="2" stroke="#6B21A8" strokeWidth="1.5" />
              <path d="M3 18H21V20H3V18Z" fill="#6B21A8" />
            </svg>
            <h2 className="text-lg font-semibold">AI Chat</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Start audio call"
            title="Start audio call"
            onClick={() => alert("Audio call (demo)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92V20a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3.09a1 1 0 0 1 1 .75c.12.86.37 1.7.72 2.5a1 1 0 0 1-.24 1.03L8.91 9.91a16 16 0 0 0 6.17 6.17l1.63-1.63a1 1 0 0 1 1.03-.24c.8.35 1.64.6 2.5.72a1 1 0 0 1 .75 1V16.92z" stroke="#374151" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Start video call"
            title="Start video call"
            onClick={() => alert("Video call (demo)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M23 7l-7 5v-3.5L23 7z" stroke="#374151" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="1" y="5" width="15" height="14" rx="2" stroke="#374151" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className="p-2 rounded-md hover:bg-gray-100" aria-label="More">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="1" fill="#374151" />
              <circle cx="19" cy="12" r="1" fill="#374151" />
              <circle cx="5" cy="12" r="1" fill="#374151" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-auto px-8 py-8" onDrop={onDrop} onDragOver={onDragOver}>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {/* Bot / left side */}
                {msg.from === "bot" && (
                  <div className="flex items-start gap-4">
                    <Avatar user={"bot"} size={44} />
                    <div>
                      <div className="bg-gray-100 px-5 py-3 rounded-2xl shadow-sm max-w-[60%] text-gray-700 break-words whitespace-pre-wrap">
                        {msg.text}
                      </div>
                      <div className="mt-2 text-xs text-gray-400">{formatTime(msg.time)}</div>
                    </div>
                  </div>
                )}

                {/* User / right side - SAME COLOR + correct alignment */}
                {msg.from === "user" && (
                  <div className="flex items-start gap-4 justify-end w-full">
                    <div className="flex flex-col items-end max-w-[60%]">
                      <div className="bg-gray-100 px-5 py-3 rounded-2xl shadow-sm text-gray-700 break-words whitespace-pre-wrap self-end">
                        {msg.text}
                      </div>

                      {/* attachments inside message */}
                      {msg.attachments?.length > 0 && (
                        <div className="mt-2 flex flex-col items-end gap-2 w-full">
                          {msg.attachments.map((a) => (
                            <div key={a.id} className="w-full max-w-[320px] text-sm flex flex-col items-end">
                              {a.url || a.preview ? (
                                a.preview ? (
                                  <img src={a.preview} alt={a.name} className="rounded-lg border self-end" />
                                ) : (
                                  <a href={a.url} target="_blank" rel="noreferrer" className="underline text-indigo-600 self-end">
                                    {a.name}
                                  </a>
                                )
                              ) : null}

                              {a.progress !== undefined && a.progress < 100 && (
                                <div className="mt-2 bg-gray-200 rounded-full h-2 w-full overflow-hidden">
                                  <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${a.progress}%` }} />
                                </div>
                              )}
                              {a.progress === 100 && <div className="text-xs text-gray-400 mt-1">Uploaded</div>}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-1 text-xs text-gray-400 self-end">
                        {formatTime(msg.time)} • {msg.status}
                      </div>
                    </div>

                    <Avatar user={"you"} size={40} />
                  </div>
                )}
              </div>
            ))}

            {/* typing indicator */}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-4">
                  <Avatar user={"bot"} size={44} />
                  <div className="bg-gray-100 px-5 py-3 rounded-2xl shadow-sm max-w-[40%] text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse inline-block" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse inline-block delay-75" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse inline-block delay-150" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="border-t px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            {/* attachment previews (before sending) */}
            {attachments.length > 0 && (
              <div className="mb-3 flex gap-3">
                {attachments.map((a) => (
                  <div key={a.id} className="relative">
                    {a.preview ? (
                      <img src={a.preview} alt={a.name} className="w-20 h-20 object-cover rounded-lg border" />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center rounded-lg border bg-gray-50 text-xs p-2">
                        <div className="text-center">
                          <div className="font-semibold">{a.name.split(".")[0].slice(0, 8)}</div>
                          <div className="text-gray-400">{(a.size / 1024).toFixed(0)} KB</div>
                        </div>
                      </div>
                    )}
                    <button onClick={() => removeAttachment(a.id)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow" aria-label="Remove attachment">✕</button>
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
                className="w-full resize-none rounded-full border px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 break-words whitespace-pre-wrap"
              />

              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={onFileInputChange} />
              <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full hover:bg-gray-100" title="Attach files">📎</button>

              <button onClick={sendMessage} className="px-4 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 shadow">Send</button>
            </div>

            <div className="mt-2 text-xs text-gray-400">Tip: Drag & drop files into the chat area. Press Enter to send, Shift+Enter for newline.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

