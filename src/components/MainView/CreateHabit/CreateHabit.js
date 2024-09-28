import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./CreateHabit.css";
import DaysDropdown from "./DaysDropdown/DaysDropdown";

const CreateHabit = () => {
    const today = new Date().toISOString().substr(0, 10);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit');

    };

    return (
        <div className="create-container d-flex flex-column align-items-center mx-3">
            <Form className="d-flex flex-column w-100" onSubmit={handleSubmit}>
                <h2>New Habit</h2>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name..." />
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="area">
                        <Form.Label>Area</Form.Label>
                        <Form.Select defaultValue="">
                            <option value="">Select an option</option>
                            <option>Food</option>
                            <option>Health</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="goalDuration">
                        <Form.Label>Times per day</Form.Label>
                        <Form.Control type="number" placeholder="number" min="0" />
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="formSelect">
                        <Form.Label>Select Days of the Week</Form.Label>
                        <DaysDropdown />
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="timeOfDay">
                        <Form.Label>Time of day</Form.Label>
                        <Form.Select defaultValue="Any time">
                            <option>Any time</option>
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="startDate">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type="date" defaultValue={today} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="endDate">
                        <Form.Label>End date (optional)</Form.Label>
                        <Form.Control type="date" defaultValue={today} />
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter habit description here..." />
                    </Form.Group>
                </Row>
                <Button className="my-2 align-self-end" variant="primary" type="submit">
                    Create
                </Button>
            </Form>

        </div>
    );
}

export default CreateHabit;