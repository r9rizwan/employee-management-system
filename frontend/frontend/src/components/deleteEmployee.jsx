import React from "react";
import axios from "axios";
import Notify from "../ui/components/Toaster";

const DeleteEmployee = ({ employee, onCancel, onDeleteSuccess }) => {
  const confirmDelete = async () => {
    const toastId = Notify.loading(
      `Deleting employee ${employee.firstName} ${employee.lastName}...`
    );

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/employees/${employee.employeeId}`
      );
      console.log(response.data); // Log successful response
      Notify.update(toastId, "Employee deleted successfully!", "success");
      onDeleteSuccess(employee.employeeId); // Notify parent of successful deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
      if (error.response) {
        Notify.update(
          toastId,
          error.response.data.error || "Failed to delete employee.",
          "error"
        );
      } else {
        Notify.update(
          toastId,
          "Network error: Unable to delete employee.",
          "error"
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Delete Employee</h2>
        <p className="mb-4">
          Are you sure you want to delete{" "}
          <span className="font-bold">
            {employee.firstName} {employee.lastName}
          </span>{" "}
          (Employee ID: {employee.employeeId})?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployee;
