
"use client";

import { useDroppable } from "@dnd-kit/core";
import { AnimatePresence, motion } from "motion/react";
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
    <motion.section
      ref={setNodeRef}
      layout
      transition={{
        layout: {
          duration: 0.25,
          ease: "easeInOut",
        },
      }}
      className={`min-w-0 rounded-2xl p-3 transition-colors duration-200 sm:p-4 ${
        isOver
          ? "bg-violet-100 ring-2 ring-violet-400"
          : "bg-gray-100/70"
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

          {/* Animated Task Count */}
          <motion.span
            key={tasks.length}
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-gray-500"
          >
            {tasks.length}
          </motion.span>
        </div>

        <button
          type="button"
          onClick={() => onAddTask(column.id)}
          aria-label={`Add task to ${column.title}`}
          className="rounded-lg p-1.5 text-gray-500 transition duration-200 hover:bg-white hover:text-indigo-600 active:scale-90"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Task List and Empty State */}
      <div className="min-h-40 space-y-3">
        <AnimatePresence initial={false} mode="popLayout">
          {/* Task Cards */}
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{
                opacity: 0,
                y: 15,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -10,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
                layout: {
                  duration: 0.25,
                  ease: "easeInOut",
                },
              }}
            >
              <TaskCard
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            </motion.div>
          ))}

          {/* Contextual Empty State */}
          {tasks.length === 0 && (
            <motion.div
              key="empty-state"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              <EmptyState
                status={column.id}
                onAddTask={onAddTask}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}