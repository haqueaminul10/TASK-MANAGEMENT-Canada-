"use client";

import TaskColoumn from "@/Components/TaskColoumn";
import { TaskContex } from "@/Context/TaskContex";
import { useContext } from "react";

export default function Home() {
  const { tasks, deleteTask, updateTask } = useContext(TaskContex);
  const taskByStatus = tasks.reduce((a, task) => {
    a[task.status] = a[task.status] || { status: task.status, tasks: [] };
    a[task.status].tasks.push(task);
    return a;
  }, {});
  // console.log(taskByStatus);

  return (
    <main>
      <div>
        <div className="flex flex-row space-x-4">
          {Object.values(taskByStatus).map((statusTasks) => (
            <TaskColoumn
              key={statusTasks.status}
              statusTasks={statusTasks}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
