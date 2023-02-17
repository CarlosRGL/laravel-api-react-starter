import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Notfound from "./views/Notfound";
import Defaultlayout from "./components/Defaultlayout";
import Guestlayout from "./components/Guestlayout";
import Dashboard from "./views/Dashboard";

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
        path: "/users",
        element: <Users />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
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
