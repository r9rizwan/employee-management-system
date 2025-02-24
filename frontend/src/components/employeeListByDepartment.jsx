import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployeeListByDepartment = () => {
  const { department } = useParams(); // Get the department from URL
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployeesByDepartment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employees/department/${department}`
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees by department:", error);
      }
    };

    fetchEmployeesByDepartment();
  }, [department]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Employees in {department} Department
      </h2>
      {employees.length > 0 ? (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id} className="mb-2">
              {employee.firstName} {employee.lastName} - {employee.designation}
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found in this department.</p>
      )}
    </div>
  );
};

export default EmployeeListByDepartment;
