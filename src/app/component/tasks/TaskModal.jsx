
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const initialFormData = {
  title: "",
  description: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
};

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task = null,
}) {
  const [formData, setFormData] = useState(() => ({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    status: task?.status || "todo",
    dueDate: task?.dueDate || "",
  }));

  const [error, setError] = useState("");

  const isEditing = Boolean(task?.id);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "title" && value.trim()) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();

    if (!trimmedTitle) {
      setError("Task title is required.");
      return;
    }

    onSubmit({
      ...formData,
      title: trimmedTitle,
      description: formData.description.trim(),
    });

    setFormData(initialFormData);
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="task-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  id="task-modal-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  {isEditing ? "Edit Task" : "Create New Task"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {isEditing
                    ? "Update your task details."
                    : "Add a new task to your workspace."}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Task Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Task Title *
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  maxLength={100}
                  autoFocus
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                {error && (
                  <p className="mt-1 text-sm text-red-500">
                    {error}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Description (Optional)
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add task details..."
                  rows={3}
                  maxLength={500}
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {/* Priority and Status */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="priority"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Priority (Optional)
                  </label>

                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Status (Optional)
                  </label>

                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-500"
                  >
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label
                  htmlFor="dueDate"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Due Date (Optional)
                </label>

                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                  {isEditing ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}