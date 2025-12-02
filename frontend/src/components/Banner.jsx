// AIHeroCenter.jsx
// Centered light-mode hero/banner for an AI chat app.
// - Large headline (premium, bold)
// - Animated "AI type" loader (typing effect cycling through phrases) with caret
// - Subtext, small CTA buttons, subtle card container in center of screen
// - Tailwind CSS required. No dark-mode toggling — light mode only.

import React, { useEffect, useState } from 'react';
import { MessageSquare, Play } from 'lucide-react';

const phrases = [
  'Summarize long conversations',
  'Write code snippets',
  'Draft emails in your tone',
  'Ask follow-up questions',
];

export default function AIHeroCenter({ onStartChat = () => {} }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let mounted = true;
    let charIndex = 0;
    const currentPhrase = phrases[index];

    function type() {
      if (!mounted) return;
      if (charIndex <= currentPhrase.length) {
        setDisplay(currentPhrase.slice(0, charIndex));
        charIndex += 1;
        setTyping(true);
        setTimeout(type, 60);
      } else {
        // pause then delete
        setTyping(false);
        setTimeout(() => deleteText(), 900);
      }
    }

    function deleteText() {
      if (!mounted) return;
      if (charIndex > 0) {
        charIndex -= 1;
        setDisplay(currentPhrase.slice(0, charIndex));
        setTyping(true);
        setTimeout(deleteText, 30);
      } else {
        // next phrase
        setTyping(false);
        setIndex((i) => (i + 1) % phrases.length);
      }
    }

    type();
    return () => { mounted = false; };
  }, [index]);

  return (
    <div className="min-h-screen  bg-white flex items-center justify-center px-20">
      <div className="max-w-2xl text-center p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="mb-4 inline-flex items-center gap-3 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
          <MessageSquare size={16} />
          AI Assistant — Premium
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Your AI co-pilot for <span className="text-indigo-600">clearer conversations</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          <span className="inline-block mr-2">{display}</span>
          <span className={`inline-block align-middle ml-1 w-1 h-6 bg-gray-900 animate-pulse ${typing ? '' : 'opacity-50'}`} style={{display:'inline-block'}} aria-hidden />
        </p>

        <p className="mt-4 text-sm text-gray-500 max-w-xl mx-auto">
          Let the AI summarize, draft, and assist — right where your team communicates. Fast, private, and tuned to your voice.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={onStartChat}
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg shadow-md text-sm font-medium"
          >
            <Play size={16} />
            Start Chat
          </button>

          <button
            onClick={() => alert('Learn more')}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            Learn more
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-400">Try prompts: <kbd className="px-2 py-1 bg-gray-100 rounded">/summarize</kbd> <kbd className="px-2 py-1 bg-gray-100 rounded">/rewrite</kbd></div>
      </div>
    </div>
  );
}
