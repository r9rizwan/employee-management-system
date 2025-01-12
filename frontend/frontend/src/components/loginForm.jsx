import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useUser } from "../providers/user-provider";
import { useAuth } from "../providers/auth-provider";

// Validation schema
const loginSchema = yup.object().shape({
  userId: yup.string().required("User ID is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { login } = useAuth(); // Import login function from AuthContext

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const { token } = response.data;
        // Save token to local storage
        login(token); // Set authentication state in AuthContext
        // Set user details
        setUser({
          userId: response.data.userId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        });
        navigate("/home");
      }
    } catch (err) {
      console.error("Error during login:", err.response?.data || err);
      alert(err.response?.data?.message || "Invalid ID or password");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 border-2 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4">
          <div>
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
          <div>
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
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 underline">
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
