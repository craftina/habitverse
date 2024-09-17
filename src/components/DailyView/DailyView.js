import React from "react";
import './DailyView.css';
import Habit from "./Habit/Habit";

const DailyView = () => {
  return (
    <div className="daily-view ">
      <div className="daily-header w-100 d-flex align-items-baseline align-content-center justify-content-between">
        <div className="title">
          {/* Calendar opens? */}
          Today - Date
        </div>
        <div className="sort-daily-habits">
          {/* Sort - per hours, areas or name */}
          Sort
        </div>
        <div className="add-habbit">
          {/* add new habbit + - new window on the main view */}
          Add Habbit
        </div>
      </div>

      <div className="daily-habits">
        {/* sort:
          name - all alphabetically
          area - area title alphabetically and below the tasks
          time of the day - all day/morning/afternoon/evening and below the tasks */}
        <ul className="daily-habits-list list-unstyled d-flex flex-column gap-3 my-4">
          <li><Habit /></li>
          <li><Habit /></li>
          <li><Habit /></li>
          <li><Habit /></li>
          <li><Habit /></li>
          <li><Habit /></li>
          <li><Habit /></li>
          <li><Habit /></li>
        </ul>
      </div>
    </div>
  );
}

export default DailyView;
