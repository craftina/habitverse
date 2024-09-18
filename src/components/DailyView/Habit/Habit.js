import React from "react";
import { Card, Button, Dropdown, Row, Col } from 'react-bootstrap';

const Habit = ({habit}) => {
  const date = new Date(habit.date);
  const hour = date.getHours();
  const day = date.getDate();
  const minutes = date.getMinutes(); // 0 to 59
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDateTime = `${hour}:${formattedMinutes} ${day}/${formattedMonth}`;

  return (
    <li>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Card.Text>{formattedDateTime}</Card.Text>
              <Card.Title>{habit.name}</Card.Title>
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
                  <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
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
