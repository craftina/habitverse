import React from "react";
import Calendar from "./Calendar/Calendar";
import HabitsList from "./HabitsList/HabitsList";
import AreasList from "./AreasList/AreasList";

const MainView = ({children}) => {
  return (
    <div className="main-component">
      {children}
    </div>
  );
}

export default MainView;
