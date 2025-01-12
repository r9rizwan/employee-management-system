import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useUser } from "./user-provider";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  // List of public routes that don't require authentication
  const publicRoutes = ["/login", "/register"];

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        // Decode the token to get user data
        const payload = jwtDecode(storedToken); // Changed to use named import
        if (payload) {
          // Update user context with data from the token
          setUser({
            userId: payload.userId || "",
            firstName: payload.firstName || "",
            lastName: payload.lastName || "",
          });
          setIsAuthenticated(true);
        } else {
          // If token is invalid or doesn't contain expected data
          logout(); // Logout if token can't be decoded or is invalid
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout(); // Handle decoding errors by logging out
      }
    } else {
      setIsAuthenticated(false);

      // Redirect to login only if the current route is not public
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    }
  }, [navigate, location, setUser]);

  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const payload = jwtDecode(token); // Changed to use named import
      setUser({
        userId: payload.userId || "",
        firstName: payload.firstName || "",
        lastName: payload.lastName || "",
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error decoding token during login:", error);
      // Optionally, you might want to redirect to login or show an error here
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ userId: "", firstName: "", lastName: "" }); // Reset user state
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
