import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeSearchForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId.trim()) {
      setError("Employee ID is required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Replace with the actual API endpoint
      const response = await fetch(
        `http://localhost:3000/api/employees/${employeeId}`
      );
      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        navigate(`/employees/${data.employeeId}`);
      } else {
        setError("No user found. Please recheck employee ID and try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred while searching. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Search Employee</h2>
        <div className="mb-4">
          <label
            htmlFor="employeeId"
            className="block text-gray-700 font-medium">
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Employee ID"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded w-full`}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeSearchForm;
