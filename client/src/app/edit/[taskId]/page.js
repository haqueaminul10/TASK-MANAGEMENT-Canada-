"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
export default function page() {
  const params = useParams();
  const id = params.taskId;
  console.log(id);

  const [formData, setFormData] = useState({
    task_title: "",
    task_body: "",
    status: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authDataString = localStorage.getItem("auth");
      const authData = JSON.parse(authDataString);
      const token = authData.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await fetch(`http://localhost:9000/update/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("success");
      } else {
        const data = await response.json();
        console.error("Update failed:", data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="task_title"
            className="form-control w-full max-w-xs font-bold text-lg my-2"
          >
            Task Title:
          </label>
          <input
            type="text"
            id="task_title"
            name="task_title"
            value={formData.task_title}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label
            htmlFor="task_body"
            className="form-control w-full max-w-xs font-bold text-lg my-2"
          >
            Task Body:
          </label>
          <input
            type="text"
            id="task_body"
            name="task_body"
            value={formData.task_body}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="form-control w-full max-w-xs font-bold text-lg my-2"
          >
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          >
            <option value="created">Created</option>
            <option value="ongoing">Ongoing</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <div>
          <button className="btn btn-success my-3">Update</button>
          {/* <a href="/">
            <button className="btn btn-success m-3">Cancel</button>
          </a> */}
        </div>
      </form>
    </>
  );
}
