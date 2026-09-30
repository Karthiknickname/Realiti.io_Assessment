
"use client";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { TASK_COLUMNS } from "@/lib/constants";
import KanbanColumn from "./KanbanColumn";

// Restrict dragged card within the Kanban board
const restrictToBoard = ({
  transform,
  draggingNodeRect,
}) => {
  // Prevent document access during server-side rendering
  if (typeof document === "undefined" || !draggingNodeRect) {
    return transform;
  }

  const board = document.getElementById("board");

  if (!board) {
    return transform;
  }

  const boardRect = board.getBoundingClientRect();

  // Calculate horizontal boundaries
  const minX = boardRect.left - draggingNodeRect.left;
  const maxX = boardRect.right - draggingNodeRect.right;

  // Calculate vertical boundaries
  const minY = boardRect.top - draggingNodeRect.top;
  const maxY = boardRect.bottom - draggingNodeRect.bottom;

  return {
    ...transform,
    x: Math.min(Math.max(transform.x, minX), maxX),
    y: Math.min(Math.max(transform.y, minY), maxY),
  };
};

export default function KanbanBoard({
  tasks = [],
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.data.current?.status ?? over.id;

    const draggedTask = tasks.find(
      (task) => task.id === taskId
    );

    if (!draggedTask || draggedTask.status === newStatus) {
      return;
    }

    const isValidStatus = TASK_COLUMNS.some(
      (column) => column.id === newStatus
    );

    if (!isValidStatus) return;

    onMoveTask(taskId, newStatus);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      modifiers={[restrictToBoard]}
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