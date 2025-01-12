import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const EmployeeSearchForm = () => {
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    employeeId: Yup.string()
      .required("Employee ID is required.")
      .matches(/^[A-Za-z0-9]+$/, "Invalid Employee ID."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/employees/${data.employeeId}`
      );

      if (response.ok) {
        const employee = await response.json();
        navigate(`/employees/${employee.employeeId}`);
      } else {
        alert("No employee found. Please check the ID.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-160px)] items-center justify-center py-8 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-16 rounded-2xl shadow-2xl w-full max-w-lg transition-transform transform ">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">
          Search Employee
        </h2>

        <div className="mb-8">
          <label
            htmlFor="employeeId"
            className="block text-base text-gray-700 font-medium mb-4 transition-colors hover:text-gray-600">
            Please enter Employee ID to continue
          </label>
          <input
            id="employeeId"
            type="text"
            placeholder="Employee ID"
            className={`w-full px-6 py-4 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out duration-300 ${
              errors.employeeId ? "border-red-500" : "border-gray-300"
            }`}
            {...register("employeeId")}
          />
          {errors.employeeId && (
            <p className="text-red-600 text-sm mt-2">
              {errors.employeeId.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-all ease-in-out duration-300 hover:scale-105 ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}>
          {isSubmitting ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeSearchForm;
