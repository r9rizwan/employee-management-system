import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Notify from "../ui/components/Toaster"; // Adjust the import path as necessary

// Validation schema
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

const EditEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      department: "",
      designation: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employee data
        const employeeResponse = await axios.get(
          `http://localhost:3000/api/employees/${employeeId}`
        );

        // Pre-populate form with existing data
        setValue("firstName", employeeResponse.data.firstName);
        setValue("lastName", employeeResponse.data.lastName);
        setValue("phoneNumber", employeeResponse.data.phoneNumber);
        setValue(
          "nationalInsuranceNumber",
          employeeResponse.data.nationalInsuranceNumber
        );
        setValue("address", employeeResponse.data.address);
        setValue("department", employeeResponse.data.Department.name);
        setValue("designation", employeeResponse.data.Designation.title);

        // Fetch departments and designations for dropdowns
        const [deptResponse, desigResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/departments"),
          axios.get("http://localhost:3000/api/designations"),
        ]);

        setDepartments(deptResponse.data);
        setDesignations(desigResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        Notify.update(
          null,
          "Error fetching employee data. Please try again.",
          "error"
        );
      }
    };

    fetchData();
  }, [employeeId, setValue]);

  const onSubmit = async (data) => {
    const toastId = Notify.loading("Updating employee...");

    try {
      // Find the corresponding IDs for department and designation
      const department = departments.find((d) => d.name === data.department);
      const designation = designations.find(
        (d) => d.title === data.designation
      );

      if (!department || !designation) {
        Notify.update(
          toastId,
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

      // Remove the original `department` and `designation` fields as they are not needed by the backend
      delete employeeData.department;
      delete employeeData.designation;

      const response = await axios.put(
        `http://localhost:3000/api/employees/${employeeId}`,
        employeeData
      );
      if (response.status === 200) {
        Notify.update(toastId, "Employee updated successfully", "success");
        setTimeout(() => navigate("/employees"), 1000); // Redirect to employees list after a second
      } else {
        Notify.update(
          toastId,
          "Failed to update employee. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      Notify.update(toastId, "Error updating employee.", "error");
    }
  };

  return (
    <div className="bg-gray-100 p-10 flex justify-center items-center overflow-hidden">
      <div className="bg-white p-10 border-2 rounded-lg shadow-lg w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-8">Edit Employee</h2>
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
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600">
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
