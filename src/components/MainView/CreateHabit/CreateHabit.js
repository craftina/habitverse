import React, {useState} from "react";
import { Form, Row, Col, Button, Dropdown } from "react-bootstrap";
import "./CreateHabit.css";

const CreateHabit = () => {
    const today = new Date().toISOString().substr(0, 10);

    return (
        <div className="create-container d-flex flex-column align-items-center mx-3">
            <Form className="d-flex flex-column">
                <h2>New Habit</h2>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name..." />
                    </Form.Group>
                    <Form.Group as={Col} controlId="area">
                        <Form.Label>Area</Form.Label>
                        <Form.Select defaultValue="">
                            <option value="">Select an option</option>
                            <option>Food</option>
                            <option>Health</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Label>Goal</Form.Label>
                    <Form.Group as={Col} controlId="goalDuration">
                        <Form.Control type="number" placeholder="number" min="0" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="goalType">
                        <Form.Select defaultValue="Times">
                            <option>Times</option>
                            <option>Minutes</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="goalFrequency">
                        <Form.Select defaultValue="Per Day">
                            <option>Per Day</option>
                            <option>Per Week</option>
                            <option>Per Month</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="repeat">
                        <Form.Select defaultValue="" >
                            <option value="">Repeat</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Interval</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="timeOfDay">
                        <Form.Label>Time of day</Form.Label>
                        <Form.Select defaultValue="Any time">
                            <option>Any time</option>
                            <option>Pick hour</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="startDate">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type="date" className="primary-date-input" defaultValue={today} />
                    </Form.Group>
                </Row>
                <Button className="my-2 align-self-end" variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    );
}

export default CreateHabit