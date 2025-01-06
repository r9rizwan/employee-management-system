import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine button text and route based on the current path
  const isOnEmployeesPage = location.pathname === "/employees";
  const buttonText = isOnEmployeesPage ? "Add Employee" : "View Employees";
  const targetRoute = isOnEmployeesPage ? "/add-employee" : "/employees";

  return (
    <header className="flex items-center justify-between bg-gray-700 h-24 px-8 text-white font-bold text-lg border-b border-gray-500 shadow-lg">
      <div className="text-2xl mx-auto">Employee Management System</div>
      <button
        onClick={() => navigate(targetRoute)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {buttonText}
      </button>
    </header>
  );
}

export default Header;
