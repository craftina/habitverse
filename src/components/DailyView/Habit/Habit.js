import React from "react";
import { Card, Button, Dropdown, Row, Col } from 'react-bootstrap';

const Habit = () => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>16:00</Card.Text>
            <Card.Title>Title</Card.Title>
          </Col>
          <Col className="d-flex gap-2 align-items-end justify-content-end">
            <Card.Text className="m-0" style={{ whiteSpace: 'nowrap' }}>
              0/1 Times
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
  );
}

export default Habit;
