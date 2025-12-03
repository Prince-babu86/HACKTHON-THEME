// UsersSkeleton.jsx
import React from "react";

/**
 * UsersSkeleton
 * Simple skeleton loader for the chat users sidebar.
 * - Tailwind CSS required
 * - Renders placeholder header, search, and N user rows
 *
 * Props:
 *  - rows (number) how many skeleton rows to render (default 6)
 */
export default function UsersSkeleton({ rows = 6 }) {
  const rowArray = new Array(rows).fill(0);

  return (
    <div
      className="h-screen w-[450px] bg-white border-r border-gray-400 flex flex-col"
      aria-busy="true"
      role="status"
    >
      {/* TOP */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-6 w-36 rounded-md bg-gray-100 animate-pulse" />
        </div>

        <div className="h-8 w-20 rounded-md bg-gray-100 animate-pulse" />
      </div>

      {/* SEARCH */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2">
          <div className="h-4 w-4 rounded-full bg-gray-100 animate-pulse" />
          <div className="flex-1 h-4 rounded-md bg-gray-100 animate-pulse" />
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto px-0">
        <ul className="divide-y divide-gray-100">
          {rowArray.map((_, idx) => (
            <li key={idx} className="px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full">
                  {/* avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-100 animate-pulse" />

                    {/* small presence dot */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gray-100 ring-2 ring-white animate-pulse" />
                  </div>

                  {/* text block */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-32 rounded-md bg-gray-100 animate-pulse" />
                      <div className="h-3 w-12 rounded-md bg-gray-100 animate-pulse" />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="h-3 w-40 rounded-md bg-gray-100 animate-pulse" />
                      <div className="h-7 w-7 rounded-full bg-gray-100 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* menu dots */}
                <div className="ml-2 flex-shrink-0">
                  <div className="h-8 w-8 rounded-md bg-gray-100 animate-pulse" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* BOTTOM */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="h-4 w-28 rounded-md bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}
