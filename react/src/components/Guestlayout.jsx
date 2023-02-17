import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Outlet, Navigate } from "react-router-dom";

export default function Guestlayout() {
  const { token } = useStateContext();
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Outlet />
      </div>
    </div>
  );
}
