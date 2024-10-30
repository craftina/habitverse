import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Dropdown } from 'react-bootstrap';
import Habit from '../../HabitsList/HabitListItem/HabitListItem';
import EditAreaModal from '../../modals/EditAreaModal/EditAreaModal';
import { useParams } from 'react-router-dom';
import { AreasContext } from '../../../context/AreasContext';
import { HabitsContext } from '../../../context/HabitsContext';
import './AreaView.css';

const AreaView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { areas, editArea, removeArea, error } = useContext(AreasContext);
    const { habits, removeHabit } = useContext(HabitsContext);
    const [searchHabit, setSearchHabit] = useState('');
    const [currentHabits, setCurrentHabits] = useState([]);
    const [filteredHabits, setFilteredHabits] = useState(currentHabits);
    const [showEditAreaModal, setShowEditAreaModal] = useState(false);
    const [sortOrder, setSortOrder] = useState('date');
    const [isLoading, setIsLoading] = useState(true);
    const [currentArea, setCurrentArea] = useState({});

    useEffect(() => {
        if (id && areas.length) {
            const area = areas.find(area => area._id === id);
            if (area) {
                setCurrentArea(area);
                setCurrentHabits(habits.filter(habit => habit.area._id === id));
            } else {
                console.error(`Area with id ${id} not found`);
            }
            setIsLoading(false);
        }
    }, [id, areas, habits]);

    useEffect(() => {
        if (searchHabit.trim() === '') {
            const resetFilteredHabits = () => {
                if (sortOrder === 'name') {
                    return sortByName([...currentHabits]);
                } else {
                    return sortByDate([...currentHabits]);
                }
            }
            setFilteredHabits(resetFilteredHabits);
            return;
        }
        setFilteredHabits(filter([...currentHabits], searchHabit));
    }, [searchHabit, sortOrder, currentHabits]);

    useEffect(() => {
        let sortedHabits = [...currentHabits];
        if (sortOrder === 'name') {
            sortedHabits = sortByName(currentHabits);
        } else if (sortOrder === 'date') {
            sortedHabits = sortByDate(currentHabits);
        }
        setFilteredHabits(sortedHabits);
    }, [sortOrder, currentHabits]);

    const handleSort = (order) => {
        setSortOrder(order);
    }

    const sortByName = (array) => {
        return [...array].sort((a, b) => a.name.localeCompare(b.name));
    }

    const sortByDate = (array) => {
        return [...array].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    const filter = (array, search) => {
        return [...array].filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    };

    const handleInputChange = (ev) => {
        setSearchHabit(ev.target.value);
    };

    const handleShowEditAreaModal = (ev) => {
        ev.preventDefault();
        setShowEditAreaModal(true);
    };

    const handleCloseEditAreaModal = () => {
        setShowEditAreaModal(false);
    };

    const handleUpdateArea = async (updatedAreaName) => {
        const updatedAreaObject = { name: updatedAreaName };

        try {
            await editArea(id, updatedAreaObject);
            handleCloseEditAreaModal();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    const handleDeleteArea = (ev) => {
        ev.preventDefault();
        const habitCount = filteredHabits.filter(habit => habit.area._id === id).length;
        if (habitCount > 0) {
            alert("There is habits in this area.");
            return;
        }
        removeArea(id);
        navigate('/areas');
    };

    const handleDeleteHabit = (habitId) => {
        removeHabit(habitId);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!currentArea) {
        return <p>Area not found.</p>;
    }


    return (
        <div className="area-list-component d-flex flex-column align-items-center gap-3 mx-3">
            <div className="area-list-header d-flex align-content-center align-items-end justify-content-between w-100 gap-3">
                <h1 className="m-0">{currentArea.name}</h1>
                <div className="d-flex gap-2">
                    <div className="search-area">
                        <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                            <FormControl
                                type="search"
                                placeholder="Search Habit..."
                                aria-label="Search"
                                className="search-box border-primary border-2"
                                value={searchHabit}
                                onChange={handleInputChange}
                            />
                        </Form>
                    </div>
                    <div className="area-actions">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" className="" id="dropdown-actions">
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/habits/create">Add Habit</Dropdown.Item>
                                <Dropdown.Item onClick={handleShowEditAreaModal}>Edit Area</Dropdown.Item>
                                <Dropdown.Item onClick={handleDeleteArea}>Delete Area</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="sort-area">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" className="" id="dropdown-sort">
                                Sort by
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSort('date')}>Date</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('name')}>Name</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="habits-list-container w-100 d-flex">
                {error ? <div className="text-center w-100 text-danger">{error}</div> :
                    (filteredHabits.length > 0 ?
                        <ul className="habits-list list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                            {filteredHabits.map(habit => (
                                <Habit key={habit._id} habit={habit} onDelete={handleDeleteHabit} />
                            ))}
                        </ul>
                        : <div className="text-center w-100">No habits found in this area!</div>
                    )}
            </div>
            <EditAreaModal
                area={currentArea}
                show={showEditAreaModal}
                onHide={handleCloseEditAreaModal}
                onSave={handleUpdateArea}
            />

        </div>
    );
}

export default AreaView;