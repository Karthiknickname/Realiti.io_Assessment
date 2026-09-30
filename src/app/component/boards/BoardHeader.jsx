"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export default function BoardHeader() {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

      <div>
        <p className="mb-2 text-sm font-medium text-indigo-600">
          WORKSPACE / BOARD
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          My Workspace
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Organize your tasks and make progress every day.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:flex-none">
          <Search size={17} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full bg-transparent text-sm outline-none sm:w-36"
          />
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
          <SlidersHorizontal size={16} />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
}