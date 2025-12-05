// TwoColAiChat.jsx
import React, { useEffect, useRef, useState } from "react";
import { Bot, Loader2, BookOpen, Globe, Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import socket from "../config/socket.config";

export default function TwoColAiChat() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey! I am AiBot. How can I help you today?", displayed: "", typing: true }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const intervalsRef = useRef({}); // store intervals per message index

  const resources = [
    { id: "r1", title: "Overview", desc: "Quick product summary", icon: <BookOpen size={16} /> },
    { id: "r2", title: "Website", desc: "Open site", icon: <Globe size={16} /> },
    { id: "r3", title: "Contact", desc: "Email & phone", icon: <Mail size={16} /> },
  ];

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Helper: start typewriter effect for a message at index
  // default speed lowered (faster typing)
  const startTypewriter = (index, fullText, speed = 12) => {
    // make sure we clear any previous interval for this index
    if (intervalsRef.current[index]) {
      clearInterval(intervalsRef.current[index]);
    }

    let i = 0;
    setMessages((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], displayed: "", typing: true };
      return copy;
    });

    intervalsRef.current[index] = setInterval(() => {
      i++;
      setMessages((prev) => {
        const copy = [...prev];
        const item = copy[index];
        if (!item) return prev;
        item.displayed = fullText.slice(0, i);
        // keep typing flag true until complete
        if (i >= fullText.length) {
          item.typing = false;
          clearInterval(intervalsRef.current[index]);
          delete intervalsRef.current[index];
        }
        return copy;
      });
    }, speed);
  };

  // Socket listener (AI reply)
  useEffect(() => {
    const handler = (replyText) => {
      // Add ai message placeholder and animate after a short loader delay
      setMessages((prev) => {
        const idx = prev.length;
        const newMsg = { role: "ai", text: replyText, displayed: "", typing: true };

        // schedule the typewriter to start after a short loader pause (so user sees the loader)
        setTimeout(() => {
          startTypewriter(idx, replyText, 12);
        }, 400); // 400ms loader before typing begins

        return [...prev, newMsg];
      });

      setLoading(true);
    };

    socket.on("ai-message", handler);

    return () => socket.off("ai-message", handler);
  }, []);

  // watch for new ai messages that need animation
  useEffect(() => {
    messages.forEach((m, idx) => {
      if (m.role === "ai" && m.typing && m.displayed === "") {
        // If a message wasn't scheduled (e.g. initial message), start it immediately
        // (startTypewriter will be a no-op if it's already running for that index)
        startTypewriter(idx, m.text, 12);

        // when typewriter finishes, stop loading for safety
        const finishCheck = setInterval(() => {
          const current = messages[idx];
          if (current && current.typing === false) {
            setLoading(false);
            clearInterval(finishCheck);
          }
        }, 50);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  // Send user message
  const send = () => {
  if (!input.trim()) return;          // only check input, not loading

  const text = input.trim();

  // Add user message (no loading change)
  setMessages((prev) => [...prev, { role: "user", text, displayed: text, typing: false }]);
  setInput("");

  // Emit plain text only (use the trimmed text variable)
  socket.emit("user-message", text);
};

  return (
    <div className="w-full h-screen bg-white flex">

      {/* LEFT SIDEBAR */}
      <aside className="w-96 border-r border-gray-200 p-6 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
        <p className="text-sm text-gray-500 mb-4">Quick links and useful items</p>

        <div className="space-y-3">
          {resources.map((r) => (
            <div key={r.id} className="p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-indigo-50 text-indigo-600">{r.icon}</div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{r.title}</div>
                  <div className="text-xs text-gray-500">{r.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT CHAT AREA */}
      <main className="flex-1 flex flex-col border-l">

        {/* TOP BAR */}
        <div className="w-full border-b border-gray-100 px-6 py-4 flex items-center gap-4 bg-white">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={20} className="text-gray-700" />
          </button>

          <div className="flex items-center gap-2">
            <Bot size={22} className="text-indigo-600" />
            <h1 className="text-lg font-semibold text-gray-800">AI Chat</h1>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-10 overflow-y-auto">
          <div className="w-4xl mx-auto space-y-6">
            {messages.map((m, index) =>
              m.role === "ai" ? (
                <div key={index} className="flex">
                  <div className="inline-block max-w-xl bg-gray-100 text-gray-800 px-4 py-3 rounded-md shadow-sm whitespace-pre-wrap">
                    {/* show displayed (typewriter) text while typing, otherwise full text */}
                    {m.displayed !== undefined ? (m.displayed !== "" ? m.displayed : <TypingDots />) : m.text}
                  </div>
                </div>
              ) : (
                <div key={index} className="flex justify-end">
                  <div className="inline-block max-w-xl bg-white border border-gray-200 px-4 py-3 rounded-md shadow-sm whitespace-pre-wrap">
                    {m.displayed ?? m.text}
                  </div>
                </div>
              )
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
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-200 outline-none"
            />

            <button
              onClick={() => send()}
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
