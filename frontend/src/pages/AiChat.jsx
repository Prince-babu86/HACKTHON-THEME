// TwoColAiChat.jsx
import React, { useEffect, useRef, useState } from "react";
import { Bot, User, Loader2, BookOpen, Globe, Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TwoColAiChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, who: "bot", text: "Welcome to Mattered! Let's get to know each other." },
    { id: 2, who: "user", text: "Hi Mattered!" },
    { id: 3, who: "user", text: "Show me what you can do" },
    { id: 4, who: "bot", text: "You got it! Here we go..." },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const resources = [
    { id: "r1", title: "Overview", desc: "Quick product summary", icon: <BookOpen size={16} /> },
    { id: "r2", title: "Website", desc: "Open site", icon: <Globe size={16} /> },
    { id: "r3", title: "Contact", desc: "Email & phone", icon: <Mail size={16} /> },
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    if (!text.trim() || loading) return;

    setMessages((m) => [...m, { id: Date.now(), who: "user", text }]);
    setInput("");
    setLoading(true);

    const aiReply = await fakeAiReply(text);

    setMessages((m) => [...m, { id: Date.now() + 1, who: "bot", text: aiReply }]);
    setLoading(false);
  };

  const fakeAiReply = (prompt) =>
    new Promise((resolve) =>
      setTimeout(() => resolve("AI Response: " + prompt), 900)
    );

  return (
    <div className="w-full h-screen bg-white flex">

      {/* LEFT SIDEBAR */}
      <aside className="w-96 border-r border-gray-200 p-6 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
        <p className="text-sm text-gray-500 mb-4">Quick links and useful items</p>

        <div className="space-y-3">
          {resources.map((r) => (
            <div
              key={r.id}
              className="p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-indigo-50 text-indigo-600">
                  {r.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{r.title}</div>
                  <div className="text-xs text-gray-500">{r.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT (CHAT AREA) */}
      <main className="flex-1 flex flex-col border-l">

        {/* TOP NAVBAR */}
        <div className="w-full border-b border-gray-100 px-6 py-4 flex items-center gap-4 bg-white">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>

          <div className="flex items-center gap-2">
            <Bot size={22} className="text-indigo-600" />
            <h1 className="text-lg font-semibold text-gray-800">AI Chat</h1>
          </div>
        </div>

        {/* CHAT MESSAGES */}
        <div className="flex-1 p-10 overflow-y-auto">
          <div className="w-4xl mx-auto space-y-6">
            {messages.map((m) =>
              m.who === "bot" ? (
                <div key={m.id} className="flex">
                  <div className="inline-block max-w-xl bg-gray-100 text-gray-800 px-4 py-3 rounded-md shadow-sm">
                    <div className="text-sm">{m.text}</div>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <div className="inline-block max-w-xl bg-white border border-gray-200 px-4 py-3 rounded-md shadow-sm">
                    <div className="text-sm">{m.text}</div>
                  </div>
                </div>
              )
            )}

            {/* LOADING BUBBLE */}
            {loading && (
              <div className="flex">
                <div className="inline-block max-w-xs bg-gray-100 px-4 py-3 rounded-md shadow-sm">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </div>

        {/* INPUT BOX */}
        <div className="border-t border-gray-100 p-6 bg-white">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-200 outline-none"
            />

            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-2">
      <Loader2 size={18} className="animate-spin text-gray-500" />
      <span className="text-gray-600 text-sm">AI is typing…</span>
    </div>
  );
}
