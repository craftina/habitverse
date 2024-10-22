import React from "react";
import { Card, Button, Dropdown, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Habit = ({ habit, onDelete }) => {
  const date = new Date(habit.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDateTime = `${day}/${formattedMonth}`;

  const handleDeleteClick = () => {
    onDelete(habit._id); // Call the parent's delete function with the habit ID
  };

  return (
    <li>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Card.Text>{formattedDateTime}</Card.Text>
              <Card.Title as={Link} to={`/habits/${habit._id}`} className="text-decoration-none">
                <h4>{habit.name}</h4>
              </Card.Title>
            </Col>
            <Col className="d-flex gap-2 align-items-end justify-content-end">
              <Card.Text className="m-0" style={{ whiteSpace: 'nowrap' }}>
                0/{habit.times} Times
              </Card.Text>
              <Button variant="success">Tick</Button>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Complete</Dropdown.Item>
                  <Dropdown.Item onClick={handleDeleteClick}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </li>
  );
}

export default Habit;
