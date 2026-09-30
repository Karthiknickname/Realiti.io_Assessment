
"use client";

import { Plus } from "lucide-react";

import EmptyState from "./EmptyState";
import TaskCard from "@/app/component/tasks/TaskCard";

export default function KanbanColumn({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <section className="min-w-0 rounded-2xl bg-gray-100/70 p-3 sm:p-4">

      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${column.color}`}
          />

          <h2 className="text-sm font-semibold text-gray-800">
            {column.title}
          </h2>

          <span className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-gray-500">
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAddTask(column.id)}
          aria-label={`Add task to ${column.title}`}
          className="rounded-lg p-1.5 text-gray-500 transition hover:bg-white hover:text-indigo-600"
        >
          <Plus size={18} />
        </button>

      </div>

      {/* Task List */}
      <div className="space-y-3">

        {tasks.length === 0 ? (
          <EmptyState title={column.title} />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}

      </div>
    </section>
  );
}