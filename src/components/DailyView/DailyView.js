import React from "react";
import './DailyView.css';

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
          <ul>
            {/* habbit - name, icon?, times, button - tick, delete, edit */}
            <li>1</li>
            <li>2</li>
          </ul>

        </div>
      </div>
    );
}

export default DailyView;
