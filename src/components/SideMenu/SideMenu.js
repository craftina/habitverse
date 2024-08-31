/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./SideMenu.css"

class SideMenu extends React.Component {
  render() {
    return (
      <div id="side-menu">
        <nav class="nav flex-column">
          <a class="nav-link" aria-current="page" href="#">All Habits</a>
          <label>Areas</label>
          <a class="nav-link" href="#">Sport</a>
          <a class="nav-link" href="#">Food</a>
          <a class="nav-link" href="#">+ Add new Area</a>
        </nav>
      </div>
    );
  }
}

export default SideMenu;
