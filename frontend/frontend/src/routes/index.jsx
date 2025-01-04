import { useRoutes } from "react-router-dom";
import AddEmployee from "../components/addEmployeeForm";
import EmployeeList from "../components/employeeList";
import EmployeeListByDepartment from "../components/employeeListByDepartment";
import EditEmployee from "../components/EditEmployee";
import DeleteEmployee from "../components/DeleteEmployee";
import LoginForm from "../components/loginForm";
import AdminRegisterForm from "../components/adminRegisterForm";
import MainLayout from "../layouts/main-layout";

function Router() {
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
      ],
    },
  ]);

  return routes;
}

export default Router;
