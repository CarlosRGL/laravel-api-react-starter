import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

function Defaultlayout() {
  const { user, token } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      default
      <Outlet />
    </div>
  );
}

export default Defaultlayout;
