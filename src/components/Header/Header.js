import React from "react";
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div id="header">
        <div className="header-logo">
          <h2>Habitverse</h2>
        </div>
        <div className="header-right">
          <h3>Welcome, Name!</h3>
        </div>
      </div>
    );
  }
}

export default Header;
