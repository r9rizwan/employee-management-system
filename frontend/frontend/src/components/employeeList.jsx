import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteEmployee from "./DeleteEmployee";

const EmployeeList = ({ department }) => {
  const [employees, setEmployees] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  // Fetch employees based on department
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const url = "http://localhost:3000/api/employees";
        const response = await axios.get(url);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [department]);

  // Open delete dialog
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDialog(true);
  };

  // Handle delete success
  const handleDeleteSuccess = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.employeeId !== employeeId)
    );
    setShowDialog(false);
    setSelectedEmployee(null);
  };

  // Cancel delete dialog
  const handleCancelDelete = () => {
    setShowDialog(false);
    setSelectedEmployee(null);
  };

  // Navigate to the Edit page
  const handleEditClick = (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
  };

  return (
    <div className="m-4">
      <h2 className="text-center text-2xl font-bold mb-6 underline">
        All Employees List
      </h2>
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="table-auto border-2 border-gray-300 w-full text-left">
          <thead>
            <tr className="bg-gray-200">
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
                <tr
                  key={employee.employeeId}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/employees/${employee.employeeId}`)}>
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(employee.employeeId);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(employee);
                      }}
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

      {/* Delete Employee Dialog */}
      {showDialog && selectedEmployee && (
        <DeleteEmployee
          employee={selectedEmployee}
          onCancel={handleCancelDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default EmployeeList;
