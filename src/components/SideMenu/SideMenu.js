/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./SideMenu.css";
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  return (
    <div id="side-menu">
      <Nav className="flex-column gap-2 custom-nav-title" variant="pills" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            Calendar
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="Habits" className="nav-dropdown custom-nav-title">
          <NavDropdown.Item as={Link} to="/habits">All Habits</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#">Habit1</NavDropdown.Item>
          <NavDropdown.Item href="#">Habit2</NavDropdown.Item>
          <NavDropdown.Item href="#">Habit3</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Areas" className="nav-dropdown custom-nav-title">
          <NavDropdown.Item as={Link} to="/areas">All Areas</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#">Area1</NavDropdown.Item>
          <NavDropdown.Item href="#">Area2</NavDropdown.Item>
          <NavDropdown.Item href="#">Area3</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div >
  );
}

export default SideMenu;
