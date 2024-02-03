"use client";
import { AuthContext } from "@/Context/AuthContext";
import { TaskContex } from "@/Context/TaskContex";
import React, { useContext } from "react";

export default function TaskBar() {
  const { auth } = useContext(AuthContext);
  const { searchTask, setSearchTask } = useContext(TaskContex);
  return (
    <>
      {auth.user ? (
        <>
          <div className="m-8">
            <div className="navbar bg-slate-600 ">
              <div className="flex-1">
                <button className="btn btn-info mx-2">
                  <a href="/">DashBoard</a>
                </button>
                <button className="btn btn-primary">
                  <a href="/addtask">Add Task</a>
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Type here"
                  name="search"
                  value={searchTask}
                  onChange={(e) => setSearchTask(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Login first</>
      )}
    </>
  );
}
