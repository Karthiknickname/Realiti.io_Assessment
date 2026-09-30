"use client";

import { useState } from "react";

import Header from "@/app/component/layout/Header";
import Footer from "@/app/component/layout/Footer";
import BoardHeader from "@/app/component/boards/BoardHeader";
import KanbanBoard from "@/app/component/boards/KanbanBoard";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">

      <Header onAddTask={handleAddTask} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">

        <BoardHeader />

        <KanbanBoard
          tasks={tasks}
          onAddTask={handleAddTask}
        />

      </main>

      <Footer />

    </div>
  );
}