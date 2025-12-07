// ChatEmptyBanner.jsx
import React from "react";
import { Paperclip, UserPlus, Sparkles } from "lucide-react";

export default function ChatEmptyBanner() {
  return (
    <div className=" w-4xl h-full bg-gradient-to-b from-slate-50 via-white to-slate-100 flex items-center justify-center">
      {/* subtle animated glow behind cards */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-72 h-72 bg-indigo-200/40 blur-3xl rounded-full mx-auto mt-10 animate-pulse" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Start a new conversation
          </h1>
          <p className="text-sm text-slate-500">
            Share files, add people or ask our AI assistant right from here.
          </p>
        </div>

        {/* Action cards */}
        <div className="flex items-center gap-6">
          <ActionCard
            icon={<Paperclip className="w-7 h-7" />}
            label="Send document"
          />
          <ActionCard
            icon={<UserPlus className="w-7 h-7" />}
            label="Add contact"
          />
          <ActionCard
            icon={<Sparkles className="w-7 h-7" />}
            label="Ask AI"
            highlight
          />
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, label, highlight = false }) {
  return (
    <button
      className={`
        group relative w-32 h-32 rounded-2xl
        bg-white shadow-sm border border-slate-200
        flex flex-col items-center justify-center
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300
        focus:outline-none focus:ring-2 focus:ring-indigo-400/60
      `}
    >
      {/* small animated ring for highlight card */}
      {highlight && (
        <span className="absolute inset-0 rounded-2xl border border-indigo-400/40 animate-pulse pointer-events-none" />
      )}

      <div className="mb-3 flex items-center justify-center rounded-xl bg-slate-100 w-10 h-10 group-hover:bg-indigo-50 transition-colors">
        <span className="text-slate-600 group-hover:text-indigo-600">
          {icon}
        </span>
      </div>
      <span className="text-xs font-medium text-slate-700">{label}</span>
    </button>
  );
}
