import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from 'react-bootstrap';
import './AreasList.css';
import { getAllHabits, getAllAreas, deleteArea, postArea } from '../../../api/api.js';
import AreaListItem from "./AreaListItem/AreaListItem.js";
import { Link } from 'react-router-dom';
import AreaModal from "../../modals/AreaModal/AreaModal.js";

const AreasList = () => {
    // const [fetchedHabits, setFetchedHabits] = useState([]);
    const [fetchedAreas, setFetchedAreas] = useState([]);
    const [searchArea, setSearchArea] = useState('');
    const [areas, setAreas] = useState(fetchedAreas);
    const [area, setArea] = useState('');
    // const [habits, setHabits] = useState(fetchedHabits);
    // const [filteredHabits, setFilteredHabits] = useState(fetchedHabits);
    const [filteredAreas, setFilteredAreas] = useState(fetchedAreas);
    const [error, setError] = useState(null);
    const [newArea, setNewArea] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [triggerPostArea, setTriggerPostArea] = useState(false);


    useEffect(() => {
        // const loadHabits = async () => {
        //     try {
        //         const data = await getAllHabits();
        //         setFetchedHabits(data);
        //         setHabits(data);
        //     } catch (err) {
        //         setError(err.message);
        //     }
        // };
        const loadAreas = async () => {
            try {
                const data = await getAllAreas();
                setFetchedAreas(data);
                setAreas(data);
            } catch (err) {
                setError(err.message);
                console.log(err.message);
            }
        };
        // loadHabits();
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
        if (searchArea.trim() === '') {
            // setFilteredHabits(sortByName([...habits]));
            const resetFilteredAreas = sortByName([...areas]);
            setFilteredAreas(resetFilteredAreas);

            return;
        }
        const filtered = filter([...areas], searchArea);
        setFilteredAreas(filtered);
    }, [searchArea, areas]);

    useEffect(() => {
        setFilteredAreas(sortByName([...areas]));
        // setFilteredHabits(sortByName([...habits]));
    }, [areas]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddArea = (ev) => {
        ev.preventDefault();
        handleShowModal();
    };

    const handleSaveNewArea = (newArea) => {
        const newAreaObject = { name: newArea };
        setNewArea(newAreaObject);
        setTriggerPostArea(true);
    };

    const sortByName = (array) => {
        return [...array].sort((a, b) => a.name.localeCompare(b.name));
    }

    const filter = (array, search) => {
        return [...array].filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()));
    }

    const handleInputChange = (ev) => {
        setSearchArea(ev.target.value);
    }

    const handleSearch = (ev) => {
        ev.preventDefault();
    }

    const handleDeleteArea = async (areaId) => {
        try {
            await deleteArea(areaId);
            setAreas((prevArea) => prevArea.filter(area => area._id !== areaId));
        } catch (error) {
            console.error('Error deleting area:', error);
        }
    };

    return (
        <div className="areas-list-component d-flex flex-column align-items-center gap-3 mx-3">
            <div className="areas-list-header d-flex align-content-center align-items-end justify-content-between w-100 gap-3">
                <h1 className="m-0">Areas</h1>
                <div className="d-flex gap-2">
                    <div className="search-area">
                        <Form className="d-flex" onChange={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Search Area..."
                                aria-label="Search"
                                className="search-box border-primary border-2"
                                value={searchArea}
                                onChange={handleInputChange}
                            />
                        </Form>
                    </div>
                    <div className="add-area">
                        <Button variant="primary" onClick={handleAddArea}>Add</Button>
                    </div>
                </div>
            </div>
            <div className="areas-list-container w-100 d-flex">
                <ul className="areas-list list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                    {
                        filteredAreas.length > 0
                            ? (filteredAreas.map(area => (
                                <AreaListItem key={area._id} area={area} onDelete={handleDeleteArea} />
                            )))
                            : <div className="text-center w-100">No areas found with this name!</div>
                    }
                </ul>
            </div>
            <AreaModal
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleSaveNewArea}
            />
        </div>
    );
}

export default AreasList;