import React from "react";

export default function TaskCard({ task, deleteTask, updateTask }) {
  const authDataString = localStorage.getItem("auth");
  const authData = JSON.parse(authDataString);
  const user = authData.user;

  return (
    <>
      <div
        key={task.id}
        className="card w-full bg-neutral text-neutral-content my-4"
      >
        <div className="card-body items-center text-center">
          <h3 className="card-title">{user.email}</h3>
          <h2 className="card-title">{task.task_title}</h2>
          <p>{task.task_body}</p>
          <h4 className="bg-white text-black">{task.status}</h4>
          <div className="card-actions justify-end">
            <a href={`/edit/${task.id}`}>
              <button className="btn btn-primary">Update</button>
            </a>
            <button
              className="btn btn-ghost"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
