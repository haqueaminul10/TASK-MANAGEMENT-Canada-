"use client";

import React, { createContext, useState, useEffect } from "react";

const TaskContex = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTask, setSearchTask] = useState("");
  const [filterdp, setFilterdp] = useState([]);
  useEffect(() => {
    const filterTask = filterdp.filter((t) => {
      return t.task_title
        .toLowerCase()
        .includes(searchTask.toString().toLowerCase());
    });

    setTasks(filterTask);
  }, [searchTask]);

  useEffect(() => {
    const fetchData = async () => {
      const authDataString = localStorage.getItem("auth");
      const authData = JSON.parse(authDataString);
      const token = authData.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await fetch(`http://localhost:9000/tasks`, { headers });
      const data = await response.json();
      setFilterdp(data.tasks);
      setTasks(data.tasks);
    };
    fetchData();
  }, []);
  // const updateTask = async (taskId, updatedTaskData) => {
  //   try {
  //     const authDataString = localStorage.getItem("auth");
  //     const authData = JSON.parse(authDataString);
  //     const token = authData.token;
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };

  //     const response = await fetch(`http://localhost:9000/update/${taskId}`, {
  //       method: "PUT",
  //       headers,
  //       body: JSON.stringify(updatedTaskData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update task");
  //     }
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };

  const deleteTask = async (taskId) => {
    try {
      const authDataString = localStorage.getItem("auth");
      const authData = JSON.parse(authDataString);
      const token = authData.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(`http://localhost:9000/delete/${taskId}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContex.Provider
      value={{
        tasks,
        setTasks,
        deleteTask,

        searchTask,
        setSearchTask,
      }}
    >
      {children}
    </TaskContex.Provider>
  );
};

export { TaskContex, TaskProvider };
