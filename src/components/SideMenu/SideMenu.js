/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./SideMenu.css";
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllHabits, getAllAreas } from '../../api/api.js';


const SideMenu = () => {
  const [fetchedHabits, setFetchedHabits] = useState([]);
  const [sortedHabits, setSortedHabits] = useState(fetchedHabits);
  const [fetchedAreas, setFetchedAreas] = useState([]);
  const [sortedAreas, setSortedAreas] = useState(fetchedAreas);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const data = await getAllHabits();
        setFetchedHabits(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadHabits();

    const loadAreas = async () => {
      try {
        const data = await getAllAreas();
        setFetchedAreas(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadAreas();
  }, []);

  useEffect(() => {
    const habitsList = [...fetchedHabits].sort((a, b) => a.name.localeCompare(b.name));
    setSortedHabits(habitsList);
    const areasList = [...fetchedAreas].sort((a, b) => a.name.localeCompare(b.name));
    setSortedAreas(areasList);
  }, [fetchedHabits, fetchedAreas]);

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
          {sortedHabits.map(habit => {
           return <NavDropdown.Item key={"menu" + habit._id} href={`/habits/${habit._id}`}>{habit.name}</NavDropdown.Item>
          })}
        </NavDropdown>
        <NavDropdown title="Areas" className="nav-dropdown custom-nav-title">
          <NavDropdown.Item as={Link} to="/areas">All Areas</NavDropdown.Item>
          <NavDropdown.Divider />
          {sortedAreas.map(area => {
           return <NavDropdown.Item key={"menu" + area._id} href={`/habits/${area._id}`}>{area.name}</NavDropdown.Item>
          })}
        </NavDropdown>
      </Nav>
    </div >
  );
}

export default SideMenu;
