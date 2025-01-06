import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const IndividualEmployee = () => {
  const { employeeId } = useParams(); // Extract employeeId from route
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  // Fetch employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employees/${employeeId}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  // Navigate to Edit Page
  const handleEditClick = () => {
    navigate(`/edit-employee/${employeeId}`);
  };

  // Navigate back to Employee List
  const handleBackClick = () => {
    navigate("/employees");
  };

  return (
    <div className="p-6">
      {employee ? (
        <div>
          <h2 className="text-2xl font-bold underline mb-4">
            Employee Details
          </h2>
          <div className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded shadow-lg">
            <p>
              <strong>Employee ID:</strong> {employee.employeeId}
            </p>
            <p>
              <strong>First Name:</strong> {employee.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {employee.lastName}
            </p>
            <p>
              <strong>Designation:</strong> {employee.designation}
            </p>
            <p>
              <strong>Department:</strong> {employee.department}
            </p>
            <p>
              <strong>Phone Number:</strong> {employee.phoneNumber}
            </p>
            <p>
              <strong>National Insurance No:</strong>{" "}
              {employee.nationalInsuranceNumber}
            </p>
            <p>
              <strong>Address:</strong> {employee.address}
            </p>
          </div>
          <div className="mt-6 space-x-4">
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit
            </button>
            <button
              onClick={handleBackClick}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Back
            </button>
          </div>
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default IndividualEmployee;
