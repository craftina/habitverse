import React from "react";
import Calendar from "./Calendar/Calendar";
import HabitsList from "./HabitsList/HabitsList";

const MainView = () => {
  return (
    <div className="main-component">
      {/* <Calendar /> */}
      <HabitsList />
    </div>
  );
}

export default MainView;
