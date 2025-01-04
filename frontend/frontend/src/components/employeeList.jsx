import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const EmployeeList = ({ department }) => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch employees based on department
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const url = department
          ? `http://localhost:3000/api/employees/department/${department}`
          : "http://localhost:3000/api/employees";
        const response = await axios.get(url);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [department]);

  // Handle delete button click
  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/employees/${employeeId}`
      );
      if (response.status === 200) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.employeeId !== employeeId)
        );
        alert("Employee deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee. Please try again.");
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-center text-2xl font-bold mb-6 underline">
        All Employees List
      </h2>
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="table-auto border-2 border-gray-300 w-full text-left">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="border border-gray-300 px-4 py-2">Employee ID</th>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.employeeId} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.employeeId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.firstName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.designation}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.department}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.phoneNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    {/* Edit Button: Using Link to navigate to the edit page */}
                    <Link
                      to={`/edit-employee/${employee.employeeId}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Edit
                    </Link>
                    {/* Delete Button: Using handleDelete function */}
                    <button
                      onClick={() => handleDelete(employee.employeeId)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
