"use client";

import TaskCard from "./TaskCard";

export default function TaskColoumn({ statusTasks, deleteTask, updateTask }) {
  return (
    <>
      <div className="w-1/3">
        <h1 className="text-4xl font-semibold mb-4 text-center">
          {statusTasks.status}
        </h1>
        <div>
          {statusTasks.tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </div>
      </div>
    </>
  );
}
