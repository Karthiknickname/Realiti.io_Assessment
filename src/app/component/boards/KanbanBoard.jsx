"use client";

import { TASK_COLUMNS } from "@/lib/constants";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({ tasks = [], onAddTask }) {
  return (
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
          />
        );
      })}
    </div>
  );
}