import React from "react";
import TitleHeader from "../components/TitleHeader";
import { useStateContext } from "../context/ContextProvider";
function Dashboard({ searchEnable }) {
  const { setSearchEnable } = useStateContext();
  setSearchEnable(searchEnable);
  return (
    <div>
      <TitleHeader title="Dashboard" filter={false} />
    </div>
  );
}

export default Dashboard;
