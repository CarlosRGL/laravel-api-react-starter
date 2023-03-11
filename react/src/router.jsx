import { createBrowserRouter, Navigate } from "react-router-dom";
import Defaultlayout from "./components/Defaultlayout";
import Guestlayout from "./components/Guestlayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Notfound from "./views/Notfound";
import Signup from "./views/Signup";
import UserForm from "./views/UserForm";
import Users from "./views/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Defaultlayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard searchEnable={false} />,
      },
      {
        path: "/users",
        element: <Users searchEnable={true} />,
      },
      {
        path: "/users/new",
        element: <UserForm />,
      },
      {
        path: "/users/:id",
        element: <UserForm />,
      },
    ],
  },
  {
    path: "/",
    element: <Guestlayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
