
"use client";

import { Pencil, Trash2, CalendarDays } from "lucide-react";

const priorityStyles = {
  low: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  const formattedDate = task.dueDate
    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : null;

  return (
    <article className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      {/* Task Title */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-words font-medium text-gray-800">
          {task.title}
        </h3>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">

          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-violet-50 hover:text-violet-600"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-2 break-words text-sm leading-relaxed text-gray-500">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">

        <span
          className={`rounded-md px-2 py-1 text-xs font-medium capitalize ${
            priorityStyles[task.priority] ||
            priorityStyles.medium
          }`}
        >
          {task.priority || "medium"} Priority
        </span>

        {formattedDate && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <CalendarDays size={14} />
            <span>{formattedDate}</span>
          </div>
        )}

      </div>
    </article>
  );
}