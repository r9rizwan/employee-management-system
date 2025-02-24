import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  userId: yup.string().required("User ID is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AdminRegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      );

      if (response.status === 201) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error registering user:", err);
      alert("Error registering user. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 p-10 flex justify-center items-center overflow-hidden">
      <div className="bg-white p-10 border-2 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold  text-center mb-8">
          Admin Registration Form
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4">
          <div className="mb-2">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              {...register("userId")}
            />
            {errors.userId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userId.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 mt-10">
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterForm;
