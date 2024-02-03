"use client";
import { AuthContext } from "@/Context/AuthContext";
import React, { useContext, useState } from "react";

export default function page() {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    task_title: "",
    task_body: "",
    status: "created",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = auth.token;
      const response = await fetch(`http://localhost:9000/addtask`, {
        method: `POST`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
      } else {
        alert("Server error");
      }
    } catch (err) {
      console.error(err);
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
          <button className="btn btn-success my-3">Submit</button>
        </div>
      </form>
    </>
  );
}
