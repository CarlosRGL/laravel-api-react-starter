import React from "react";
import { Outlet } from "react-router-dom";

function Defaultlayout() {
  return (
    <div>
      default
      <Outlet />
    </div>
  );
}

export default Defaultlayout;
