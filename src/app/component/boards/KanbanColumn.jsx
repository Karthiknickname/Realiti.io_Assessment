"use client";

import { useDroppable } from "@dnd-kit/core";
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
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      status: column.id,
    },
  });

  return (
    <section
      ref={setNodeRef}
      className={`min-w-0 rounded-2xl p-3 transition-colors sm:p-4 ${
        isOver ? "bg-violet-100 ring-2 ring-violet-400" : "bg-gray-100/70"
      }`}
    >
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

      {/* Drop Area */}
      <div className="min-h-40 space-y-3">
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