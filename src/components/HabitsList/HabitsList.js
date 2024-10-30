import React, { useContext, useEffect, useState } from 'react';
import Habit from './HabitListItem/HabitListItem.js';
import { Form, FormControl, Dropdown, Button } from 'react-bootstrap';
import './HabitsList.css';
import { HabitsContext } from '../../context/HabitsContext.js';
import { AreasContext } from '../../context/AreasContext.js';
import { Link } from 'react-router-dom';

const HabitsList = () => {
    const { habits, removeHabit, error } = useContext(HabitsContext);
    const { areas } = useContext(AreasContext);
    const [searchHabit, setSearchHabit] = useState('');
    const [filteredHabits, setFilteredHabits] = useState([]);
    const [sortOrder, setSortOrder] = useState('date');
    const [filteredAreas, setFilteredAreas] = useState([]);

    useEffect(() => {
        if (searchHabit.trim() === '') {
            const resetFilteredHabits = () => {
                if (sortOrder === 'name' || 'area') {
                    return sortByName([...habits]);
                }
                if (sortOrder === 'date') {
                    return sortByDate([...habits]);
                }
            }
            setFilteredHabits(resetFilteredHabits);
            setFilteredAreas(sortByName([...areas]));

            return;
        }

        if (sortOrder === "area") {
            setFilteredAreas(filter([...areas], searchHabit));
        } else {
            setFilteredHabits(filter([...habits], searchHabit));
        }
    }, [searchHabit, sortOrder, areas, habits]);

    useEffect(() => {
        let sortedHabits = [...habits];
        if (sortOrder === 'name') {
            sortedHabits = sortByName(habits);
        } else if (sortOrder === 'date') {
            sortedHabits = sortByDate(habits);
        } else if (sortOrder === "area") {
            const sortedAreas = sortByName([...areas]);
            sortedHabits = sortByName(habits);

            setFilteredAreas(sortedAreas);
        }
        setFilteredHabits(sortedHabits);
    }, [sortOrder, habits, areas]);

    const handleDeleteHabit = (habitId) => {
        removeHabit(habitId);
    };

    const sortByName = (array) => {
        return [...array].sort((a, b) => a.name.localeCompare(b.name));
    }

    const sortByDate = (array) => {
        return [...array].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    const filter = (array, search) => {
        return [...array].filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()));
    }

    const handleInputChange = (ev) => {
        setSearchHabit(ev.target.value);
    }

    const handleSort = (order) => {
        setSortOrder(order);
    }

    return (
        <div className="habits-list-component d-flex flex-column align-items-center gap-3 mx-3">
            <div className="habits-list-header d-flex align-content-center align-items-end justify-content-between w-100 gap-3">
                <h1 className="m-0">Habits</h1>
                <div className="d-flex gap-2">
                    <div className="search-habit">
                        <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                            <FormControl
                                type="search"
                                placeholder={sortOrder === "area" ? "Search Area..." : "Search Habit..."}
                                aria-label="Search"
                                className="search-box border-primary border-2"
                                value={searchHabit}
                                onChange={handleInputChange}
                            />
                        </Form>
                    </div>
                    <div className="add-habit">
                        <Button variant="primary" as={Link} to="/habits/create">Add</Button>
                    </div>
                    <div className="sort-habit">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-sort">
                                Sort by
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSort('date')}>Date</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('name')}>Name</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('area')}>Area</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="habits-list-container w-100 d-flex">
                {error ? <div className="text-center w-100 text-danger">{error}</div> :
                    (filteredHabits.length > 0 ?
                        <ul className="habits-list list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                            {sortOrder === "area"
                                ? (
                                    filteredAreas.length > 0 ?
                                        filteredAreas.map(area => (
                                            <li key={area._id}>
                                                <h2>{area.name}</h2>
                                                <ul className="habits-area list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                                                    {filteredHabits
                                                        .filter(habit => habit.area._id === area._id).length > 0
                                                        ? filteredHabits
                                                            .filter(habit => habit.area._id === area._id)
                                                            .map(habit => (
                                                                <Habit key={habit._id} habit={habit} onDelete={handleDeleteHabit} />
                                                            ))
                                                        : <p>There is no habits in this area!</p>
                                                    }

                                                </ul>
                                            </li>
                                        ))
                                        : <div className="text-center w-100">No areas found with this name!</div>
                                )
                                : (filteredHabits.map(habit => (
                                    <Habit key={habit._id} habit={habit} onDelete={handleDeleteHabit} />
                                )))}
                        </ul>
                        : <div className="text-center w-100">No habits found with this name!</div>
                    )}
            </div>
        </div>
    );
}

export default HabitsList;