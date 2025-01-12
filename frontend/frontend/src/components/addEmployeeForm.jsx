import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notify from "../ui/components/Toaster"; // Adjust path if necessary

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  department: yup.string().required("Department is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  designation: yup.string().required("Designation is required"),
  nationalInsuranceNumber: yup
    .string()
    .required("National Insurance Number is required"),
  address: yup.string().required("Address is required"),
});

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [deptResponse, desigResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/departments"),
          axios.get("http://localhost:3000/api/designations"),
        ]);

        setDepartments(deptResponse.data);
        setDesignations(desigResponse.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        Notify.update(
          null,
          "Failed to load departments or designations. Please try again.",
          "error"
        );
      }
    };

    fetchOptions();
  }, []);

  const onSubmit = async (data) => {
    try {
      const department = departments.find((d) => d.name === data.department);
      const designation = designations.find(
        (d) => d.title === data.designation
      );

      if (!department || !designation) {
        Notify.update(
          null,
          "Invalid department or designation selected",
          "error"
        );
        return;
      }

      const employeeData = {
        ...data,
        departmentId: department.departmentId,
        designationId: designation.designationId,
      };

      delete employeeData.department;
      delete employeeData.designation;

      const toastId = Notify.loading("Adding employee...");

      try {
        const response = await axios.post(
          "http://localhost:3000/api/employees",
          employeeData
        );

        // Wait for 1 second before updating the toast to success
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (response.status === 201) {
          Notify.update(
            toastId,
            `Employee added successfully. Employee ID: ${response.data.employeeId}`,
            "success"
          );
          reset();
          setTimeout(() => navigate("/employees"), 1000);
        } else {
          Notify.update(
            toastId,
            "Failed to add employee. Please try again.",
            "error"
          );
        }
      } catch (error) {
        // Wait for 1 second before updating the toast to error
        await new Promise((resolve) => setTimeout(resolve, 1000));
        Notify.update(toastId, "Error adding employee.", "error");
        console.error("Error adding employee:", error);
      }
    } catch (error) {
      Notify.update(null, "Error submitting the form.", "error");
      console.error("Error in form submission:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-10 flex justify-center items-center overflow-hidden">
      <div className="bg-white p-10 border-2 rounded-lg shadow-lg w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-8">Add Employee</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-8">
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.firstName ? "border-red-500" : "focus:ring-blue-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.lastName ? "border-red-500" : "focus:ring-blue-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Department
            </label>
            <select
              {...register("department")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.department ? "border-red-500" : "focus:ring-blue-300"
              }`}>
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phoneNumber")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.phoneNumber ? "border-red-500" : "focus:ring-blue-300"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Designation */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Designation
            </label>
            <select
              {...register("designation")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.designation ? "border-red-500" : "focus:ring-blue-300"
              }`}>
              <option value="">Select Designation</option>
              {designations.map((desig) => (
                <option key={desig.designationId} value={desig.title}>
                  {desig.title}
                </option>
              ))}
            </select>
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.designation.message}
              </p>
            )}
          </div>

          {/* National Insurance Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              National Insurance Number
            </label>
            <input
              type="text"
              {...register("nationalInsuranceNumber")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.nationalInsuranceNumber
                  ? "border-red-500"
                  : "focus:ring-blue-300"
              }`}
            />
            {errors.nationalInsuranceNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nationalInsuranceNumber.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <textarea
              {...register("address")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.address ? "border-red-500" : "focus:ring-blue-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
