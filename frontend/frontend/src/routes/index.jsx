import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

// Lazy-loaded components
const AddEmployee = lazy(() => import("../components/addEmployeeForm"));
const EmployeeList = lazy(() => import("../components/employeeList"));
const EmployeeListByDepartment = lazy(() =>
  import("../components/employeeListByDepartment")
);
const EditEmployee = lazy(() => import("../components/EditEmployee"));
const DeleteEmployee = lazy(() => import("../components/DeleteEmployee"));
const LoginForm = lazy(() => import("../components/loginForm"));
const AdminRegisterForm = lazy(() => import("../components/adminRegisterForm"));
const IndividualEmployee = lazy(() =>
  import("../components/individualEmployee")
);
const EmployeeSearchForm = lazy(() => import("../components/employeeFindById"));

import MainLayout from "../layouts/main-layout";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "register",
          element: <AdminRegisterForm />,
        },
        {
          path: "add-employee",
          element: <AddEmployee />,
        },
        {
          path: "employees",
          element: <EmployeeList />,
        },
        {
          path: "employees/department/:department",
          element: <EmployeeListByDepartment />,
        },
        {
          path: "edit-employee/:employeeId",
          element: <EditEmployee />,
        },
        {
          path: "employees/delete/:employeeId",
          element: <DeleteEmployee />,
        },
        {
          path: "employees/:employeeId",
          element: <IndividualEmployee />,
        },
        {
          path: "search-employee",
          element: <EmployeeSearchForm />,
        },
      ],
    },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default Routes;
