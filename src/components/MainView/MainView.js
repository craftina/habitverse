import React from "react";
import Calendar from "./Calendar/Calendar";
import HabitsList from "./HabitsList/HabitsList";
import AreasList from "./AreasList/AreasList";

const MainView = () => {
  return (
    <div className="main-component">
      {/* <Calendar /> */}
      {/* <HabitsList /> */}
      <AreasList/>
    </div>
  );
}

export default MainView;
