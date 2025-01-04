import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employees/${id}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/employees/${id}`
      );
      if (response.data.success) {
        alert("Employee deleted successfully");
        navigate("/employees");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee");
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Delete Employee</h2>
        <p>
          Are you sure you want to delete {employee.firstName}{" "}
          {employee.lastName}?
        </p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => navigate("/employees")}
            className="w-1/2 bg-gray-500 text-white font-bold py-2 rounded-lg hover:bg-gray-600">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="w-1/2 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployee;
