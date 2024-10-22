import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./CreateHabit.css";
import DaysDropdown from "./DaysDropdown/DaysDropdown";
import AreaModal from "../../modals/AreaModal/AreaModal";
import { getAllAreas, postArea, postHabit } from '../../../api/api.js';


const CreateHabit = () => {
    const today = new Date().toISOString().substr(0, 10);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [fetchedAreas, setFetchedAreas] = useState([]);
    const [areas, setAreas] = useState(fetchedAreas);
    const [area, setArea] = useState('');
    const [newArea, setNewArea] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [triggerPostArea, setTriggerPostArea] = useState(false);
    const [error, setError] = useState(null);
    const [resetDays, setResetDays] = useState(false);
    
    useEffect(() => {
        const loadAreas = async () => {
            try {
                const data = await getAllAreas();
                setFetchedAreas(sortByName(data));
                setAreas(sortByName(data))
            } catch (err) {
                setError(err.message);
                console.log(err.message);
            }
        };
        loadAreas();
    }, []);

    useEffect(() => {
        const addArea = async () => {
            if (newArea) {
                try {
                    const data = await postArea(newArea);
                    setAreas((prevAreas) => sortByName([...prevAreas, data]));
                    setArea(data)
                } catch (err) {
                    setError(err.message);
                    console.log(err.message);
                } finally {
                    setNewArea('');
                    setTriggerPostArea(false);
                    handleCloseModal();
                }
            }
        };
        if (triggerPostArea) {
            addArea();
        }
    }, [triggerPostArea, newArea])

    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end < start) {
            setEndDate(startDate);
        }
    }, [startDate, endDate]);

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

    const sortByName = (array) => {
        return [...array].sort((a, b) => a.name.localeCompare(b.name));
    }

    const handleAreaChange = (event) => {
        const selectedAreaValue = event.target.value;
        if (selectedAreaValue === 'addArea') {
            handleShowModal();
        } else {
            setArea(selectedAreaValue);
            handleChange(event);
        }
    };

    const handleSaveNewArea = (newArea) => {
        const newAreaObject = { name: newArea };
        setNewArea(newAreaObject);
        setTriggerPostArea(true);
    };

    const handleChangeStartDate = (ev) => {
        setStartDate(ev.target.value);
        const selectedStartDate = ev.target.value;
        setHabit((prevHabit) => ({
            ...prevHabit,
            startDate: selectedStartDate,
            endDate: new Date(selectedStartDate) > new Date(prevHabit.endDate) ? selectedStartDate : prevHabit.endDate,
        }));;
    };

    const handleChangeEndDate = (ev) => {
        setEndDate(ev.target.value);
        handleChange(ev);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (habit.daysOfWeek.length === 0) {
            alert("Please select at least one day of the week.");
            return;
        }

        try {
            const newHabit = await postHabit(habit);
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
        } catch (error) {
            console.error('Error creating habit:', error.message);
        }
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
                                <option key={area._id} value={area.name}>
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
            <AreaModal
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleSaveNewArea}
            />
        </div>
    );
}

export default CreateHabit;