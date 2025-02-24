import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const IndividualEmployee = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

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

  const handleEditClick = () => {
    navigate(`/edit-employee/${employeeId}`);
  };

  const handleBackClick = () => {
    navigate("/employees");
  };

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-lg text-gray-600">
          Loading employee details...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-12 gap-4">
      <div className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-lg p-10 mb-8 flex justify-center items-center">
        <div className="w-full max-w-2xl">
          <h2 className="flex flex-row items-start text-2xl font-bold text-center mb-12">
            Employee Details
          </h2>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-6">
              {[
                { key: "employeeId", label: "Employee ID" },
                { key: "firstName", label: "First Name" },
                { key: "lastName", label: "Last Name" },
                { key: "Department.name", label: "Department" },
                { key: "Designation.title", label: "Designation" },
                { key: "phoneNumber", label: "Phone Number" },
                {
                  key: "nationalInsuranceNumber",
                  label: "National Insurance No",
                },
                { key: "address", label: "Address" },
              ].map(({ key, label }) => {
                const value = key
                  .split(".")
                  .reduce((acc, part) => acc && acc[part], employee);
                return (
                  <div key={key} className="py-2">
                    <dt className="text-sm font-medium text-gray-500">
                      {label}
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">{value}</dd>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-[750px] justify-center">
        <button
          onClick={handleBackClick}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Back
        </button>
        <button
          onClick={handleEditClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Edit
        </button>
      </div>
    </div>
  );
};

export default IndividualEmployee;
