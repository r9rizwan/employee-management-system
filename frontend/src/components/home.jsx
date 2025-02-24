import React from "react";
import { useUser } from "../providers/user-provider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-170px)] bg-gradient-to-b from-white to-gray-100 text-gray-700">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome, {user.firstName} {user.lastName}!
        </h1>
        <p className="text-lg font-medium">
          Please select the actions from the following buttons.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Add Employee Button */}
        <button
          onClick={() => navigate("/add-employee")}
          className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg text-xl font-semibold shadow-lg transition-transform transform hover:scale-105 focus:ring-4 focus:ring-green-300">
          Add Employee
        </button>

        {/* View All Employees Button */}
        <button
          onClick={() => navigate("/employees")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg text-xl font-semibold shadow-lg transition-transform transform hover:scale-105 focus:ring-4 focus:ring-yellow-300">
          View All Employees
        </button>

        {/* Search Employee by ID Button */}
        <button
          onClick={() => navigate("/search-employee")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg text-xl font-semibold shadow-lg transition-transform transform hover:scale-105 focus:ring-4 focus:ring-blue-300">
          Search Employee by ID
        </button>
      </div>
    </div>
  );
};

export default Home;
