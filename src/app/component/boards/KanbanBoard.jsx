"use client";

import { DndContext, closestCorners } from "@dnd-kit/core";

import { TASK_COLUMNS } from "@/lib/constants";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({
  tasks = [],
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
}) {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // If the task was not dropped over a column
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.data.current?.status ?? over.id;

    const draggedTask = tasks.find(
      (task) => task.id === taskId
    );

    // Prevent unnecessary updates
    if (!draggedTask || draggedTask.status === newStatus) {
      return;
    }

    onMoveTask(taskId, newStatus);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div
        id="board"
        className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {TASK_COLUMNS.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={columnTasks}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
      </div>
    </DndContext>
  );
}