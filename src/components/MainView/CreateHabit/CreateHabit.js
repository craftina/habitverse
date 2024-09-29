import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./CreateHabit.css";
import DaysDropdown from "./DaysDropdown/DaysDropdown";
import AreaModal from "../../modals/AreaModal/AreaModal";
import { getAllAreas, postArea } from '../../../api/api.js';


const CreateHabit = () => {
    const today = new Date().toISOString().substr(0, 10);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [fetchedAreas, setFetchedAreas] = useState([]);
    const [areas, setAreas] = useState(fetchedAreas);
    const [selectedArea, setSelectedArea] = useState('');
    const [newArea, setNewArea] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [triggerPostArea, setTriggerPostArea] = useState(false);
    const [error, setError] = useState(null);


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
                    setSelectedArea(data)
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
            setSelectedArea(selectedAreaValue);
        }
    };

    const handleSaveNewArea = (newArea) => {
        const newAreaObject = { name: newArea };
        setNewArea(newAreaObject);
        setTriggerPostArea(true);
    };

    const handleChangeStartDate = (ev) => {
        setStartDate(ev.target.value);
    };

    const handleChangeEndDate = (ev) => {
        setEndDate(ev.target.value)
    }
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
                        <Form.Select value={selectedArea} onChange={handleAreaChange}>
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
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={handleChangeStartDate} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="endDate">
                        <Form.Label>End date (optional)</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={handleChangeEndDate}
                            min={startDate}
                        />
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
            <AreaModal
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleSaveNewArea}
            />
        </div>
    );
}

export default CreateHabit;