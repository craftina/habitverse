import React, { useState, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./CreateHabit.css";
import DaysDropdown from "./DaysDropdown/DaysDropdown";
import AddAreaModal from "../../modals/AddAreaModal/AddAreaModal";
import { HabitsContext } from "../../../context/HabitsContext";
import { AreasContext } from "../../../context/AreasContext";


const CreateHabit = () => {
    const today = new Date().toISOString().substr(0, 10);
    const { addHabit } = useContext(HabitsContext);
    const { areas, addArea } = useContext(AreasContext);
    const [showModal, setShowModal] = useState(false);
    const [resetDays, setResetDays] = useState(false);

    const [habit, setHabit] = useState({
        name: '',
        area: '',
        timesPerDay: 1,
        daysOfWeek: [],
        timeOfDay: 'Any time',
        startDate: today,
        endDate: today,
        description: '',
        dailyProgress: [],
    });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAreaChange = (ev) => {
        if (ev.target.value === 'addArea') {
            handleShowModal();
        } else {
            setHabit((prevHabit) => ({
                ...prevHabit,
                area: ev.target.value,
            }));
        }
    };

    const handleSaveNewArea = (newArea) => {
        const newAreaObject = { name: newArea };
        addArea(newAreaObject);
        handleCloseModal();
    };

    const handleChangeStartDate = (ev) => {
        const newStartDate = ev.target.value;
        setHabit((prevHabit) => ({
            ...prevHabit,
            startDate: newStartDate,
            endDate: new Date(newStartDate) > new Date(prevHabit.endDate) ? newStartDate : prevHabit.endDate,
        }));
    };

    const handleChangeEndDate = (ev) => {
        setHabit((prevHabit) => ({
            ...prevHabit,
            endDate: ev.target.value,
        }));
    };

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setHabit((prevHabit) => ({
            ...prevHabit,
            [name]: value,
        }));
    };

    const handleDaysOfWeekChange = (selectedDays) => {
        setHabit((prevHabit) => ({
            ...prevHabit,
            daysOfWeek: selectedDays,
        }));
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (habit.daysOfWeek.length === 0) {
            alert("Please select at least one day of the week.");
            return;
        }
        addHabit(habit)
        setHabit({
            name: '',
            area: '',
            timesPerDay: 1,
            daysOfWeek: [],
            timeOfDay: 'Any time',
            startDate: today,
            endDate: today,
            description: '',
            dailyProgress: [],
        });
        setResetDays(true);
        setTimeout(() => setResetDays(false), 0);
    };

    return (
        <div className="create-container d-flex flex-column align-items-center mx-3">
            <Form className="d-flex flex-column w-100" onSubmit={handleSubmit}>
                <h2>New Habit</h2>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name..."
                            name="name"
                            value={habit.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="area">
                        <Form.Label>Area</Form.Label>
                        <Form.Select
                            name="area"
                            value={habit.area}
                            onChange={handleAreaChange}
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="addArea">+ Add new area</option>
                            {areas.map((area) => (
                                <option key={area._id} value={area._id}>
                                    {area.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="goalDuration">
                        <Form.Label>Times per day</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="number"
                            min="0"
                            name="timesPerDay"
                            value={habit.timesPerDay}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="formSelect">
                        <Form.Label>Select Days of the Week</Form.Label>
                        <DaysDropdown
                            name="daysOfWeek"
                            selectedDays={habit.daysOfWeek}
                            onChange={handleDaysOfWeekChange}
                            reset={resetDays}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="timeOfDay">
                        <Form.Label>Time of day</Form.Label>
                        <Form.Select
                            name="timeOfDay"
                            value={habit.timeOfDay}
                            onChange={handleChange}
                            required
                        >
                            <option value="Any time">Any time</option>
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="startDate">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            value={habit.startDate}
                            onChange={handleChangeStartDate}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="endDate">
                        <Form.Label>End date</Form.Label>
                        <Form.Control
                            type="date"
                            name="endDate"
                            value={habit.endDate}
                            onChange={handleChangeEndDate}
                            min={habit.startDate}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row className="my-2">
                    <Form.Group as={Col} controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter habit description here..."
                            name="description"
                            value={habit.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>
                <Button className="my-2 align-self-end" variant="primary" type="submit">
                    Create
                </Button>
            </Form>
            <AddAreaModal
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleSaveNewArea}
            />
        </div>
    );
}

export default CreateHabit;