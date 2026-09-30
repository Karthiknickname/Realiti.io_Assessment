"use client";

import { useState, useEffect } from "react";

import Header from "@/app/component/layout/Header";
import Footer from "@/app/component/layout/Footer";
import BoardHeader from "@/app/component/boards/BoardHeader";
import KanbanBoard from "@/app/component/boards/KanbanBoard";
import TaskModal from "@/app/component/tasks/TaskModal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState("todo");

  // Load tasks from localStorage
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("taskflow-tasks");

      if (savedTasks) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        "taskflow-tasks",
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }, [tasks, isLoaded]);

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

  // Move task between columns
  const handleMoveTask = (taskId, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
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
          onMoveTask={handleMoveTask}
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