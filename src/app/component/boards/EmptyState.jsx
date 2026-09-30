
"use client";

import { ClipboardList, Plus } from "lucide-react";

const emptyStateContent = {
  todo: {
    title: "No tasks to do yet",
    description:
      "Your workspace is ready. Create your first task and start organizing your work.",
  },

  inProgress: {
    title: "Nothing in progress",
    description:
      "Tasks will appear here when you start working on them.",
  },

  done: {
    title: "No completed tasks yet",
    description:
      "Completed tasks will be collected here. Keep going!",
  },
};

export default function EmptyState({
  status = "todo",
  onAddTask,
}) {
  const content =
    emptyStateContent[status] || emptyStateContent.todo;

  return (
    <div className="flex min-h-[270px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/70 px-5 py-8 text-center transition-colors hover:border-violet-200">

      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
        <ClipboardList size={23} strokeWidth={1.7} />
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800">
        {content.title}
      </h3>

      {/* Description */}
      <p className="mt-1.5 max-w-[250px] text-xs leading-5 text-gray-500">
        {content.description}
      </p>

      {/* Create Task Button */}
      <button
        type="button"
        onClick={() => onAddTask?.(status)}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-md active:translate-y-0"
      >
        <Plus size={15} />
        Create Task
      </button>
    </div>
  );
}