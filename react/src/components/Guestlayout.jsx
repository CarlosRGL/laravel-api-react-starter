import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Outlet } from "react-router-dom";

export default function Guestlayout() {
  const { token } = useStateContext();
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
