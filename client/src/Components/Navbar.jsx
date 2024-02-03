"use client";
import { AuthContext } from "@/Context/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";
import TaskBar from "./TaskBar";

export default function Navbar() {
  const { auth, setAuth } = useContext(AuthContext);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert(`logout successfully`);
  };
  return (
    <>
      <div className="navbar bg-slate-300 ">
        <div className="navbar-start">
          <Link href="/">
            <h1 className="font-bold cursor-default">TASK MANAGEMENT</h1>
          </Link>
        </div>
        {auth.user ? (
          <div className="navbar-end">
            <div className="dropdown dropdown-end ">
              <div tabIndex={0} role="button" className="btn m-1">
                {auth.user.username}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>profile</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="navbar-end">
              <a href="/register" className="btn mx-3">
                Register
              </a>
              <a href="/login" className="btn mx-3">
                Log In
              </a>
            </div>
          </>
        )}
      </div>
      <TaskBar />
    </>
  );
}
