import React from "react";
import Calendar from "./Calendar/Calendar";
import HabitList from "./HabitsList/HabitsList";

const MainView = () => {
  return (
    <div className="main-component">
      {/* <Calendar /> */}
      <HabitList />
    </div>
  );
}

export default MainView;
