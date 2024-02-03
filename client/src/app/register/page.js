"use client";
import React, { useState } from "react";

export default function page() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contactnumber: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9000/register`, {
        method: `POST`,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form onSubmit={handSubmit}>
        <div>
          <label
            htmlFor="username"
            className="form-control w-full max-w-xs font-bold text-lg my-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="form-control w-full max-w-xs font-bold text-lg my-2"
          >
            Email Adress:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label
            htmlFor="contactnumber"
            className="form-control w-full max-w-xs font-bold text-lg my-2"
          >
            Contact Number:
          </label>
          <input
            type="number"
            id="contactnumber"
            name="contactnumber"
            value={formData.contactnumber}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="form-control w-full max-w-xs font-bold text-lg my-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <button className="btn btn-success my-3">Success</button>
        </div>
      </form>
    </>
  );
}
