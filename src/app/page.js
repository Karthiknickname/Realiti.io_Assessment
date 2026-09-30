
"use client";

import { useState } from "react";

import Header from "@/app/component/layout/Header";
import Footer from "@/app/component/layout/Footer";
import BoardHeader from "@/app/component/boards/BoardHeader";
import KanbanBoard from "@/app/component/boards/KanbanBoard";
import TaskModal from "@/app/component/tasks/TaskModal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState("todo");

  // Open modal for creating a task
  const handleOpenCreateModal = (status = "todo") => {
  setEditingTask(null);
  setDefaultStatus(status);
  setIsModalOpen(true);
  };

  // Open modal for editing a task
  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Create or update task
  const handleSaveTask = (formData) => {
    console.log("Saved task:", formData);
    console.log("Selected status:", formData.status);
    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...formData }
            : task
        )
      );
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        ...formData,
        createdAt: new Date().toISOString(),
      };

      setTasks((previousTasks) => [
        ...previousTasks,
        newTask,
      ]);
    }

    handleCloseModal();
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onAddTask={handleOpenCreateModal} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <BoardHeader />

        <KanbanBoard
          tasks={tasks}
          onAddTask={handleOpenCreateModal}
          onEditTask={handleOpenEditModal}
          onDeleteTask={handleDeleteTask}
        />
      </main>

      <Footer />

      <TaskModal
        key={editingTask?.id || `new-${defaultStatus}`}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveTask}
        task={editingTask || { status: defaultStatus }}
      />
    </div>
  );
}