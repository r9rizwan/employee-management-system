import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../providers/user-provider";
import { useAuth } from "../providers/auth-provider";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-700 h-24 px-8 text-white font-bold text-lg border-b border-gray-500 shadow-lg">
      <div className="relative h-full flex items-center justify-between">
        {/* Left Section - Home and View Employees Buttons */}
        {isAuthenticated && (
          <div className="flex flex-col justify-end h-full">
            <div className="flex space-x-4">
              {/* Home Button */}
              <button
                onClick={() => navigate("/home")}
                className="text-zinc-100 hover:text-zinc-800 hover:bg-slate-100 transition-all rounded-lg px-4 py-2">
                Home
              </button>

              {/* Toggleable Employees Button */}
              <button
                onClick={() =>
                  navigate(
                    location.pathname === "/employees"
                      ? "/add-employee"
                      : "/employees"
                  )
                }
                className={`${
                  location.pathname === "/employees"
                    ? "bg-slate-500 hover:bg-slate-400 text-white"
                    : "text-zinc-100 hover:text-zinc-800 hover:bg-slate-100"
                } transition-all rounded-lg px-4 py-2`}>
                {location.pathname === "/employees"
                  ? "Add Employee"
                  : "View Employees"}
              </button>
            </div>
          </div>
        )}

        {/* Center Section - Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl text-center">
          Employee Management System
        </div>

        {/* Right Section - Logged in as and Log Off */}
        {isAuthenticated && (
          <>
            {/* Logged in as positioned in the top-right corner */}
            <div className="absolute top-2 right-2 bg-gray-600 px-4 py-1 rounded-lg flex items-center">
              <span className="text-xs text-zinc-300">User :</span>
              <span className="text-xs ml-1 font-semibold text-zinc-100">
                {user.userId}
              </span>
            </div>

            {/* Log Off button positioned at the bottom-right corner of the header */}
            <div className="absolute bottom-2 right-2">
              <button
                onClick={logout}
                className="text-zinc-100 hover:text-red-500 bg-red-500 hover:bg-stone-100 transition-all rounded-lg text-base font-medium px-3 py-1">
                Log Off
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
