import React from "react";
import { Outlet } from "react-router-dom";

export default function Guestlayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
