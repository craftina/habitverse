import React, { useEffect, useState } from 'react';
import Habit from '../../DailyView/Habit/Habit';
import { Form, FormControl, Dropdown } from 'react-bootstrap';
import './HabitsList.css';
import { getAllHabits, getAllAreas } from '../../../api/api.js';

const HabitsList = () => {
    const [fetchedHabits, setFetchedHabits] = useState([]);
    const [fetchedAreas, setFetchedAreas] = useState([]);
    const [searchHabit, setSearchHabit] = useState('');
    const [habits, setHabits] = useState(fetchedHabits);
    const [filteredHabits, setFilteredHabits] = useState(fetchedHabits);
    const [sortOrder, setSortOrder] = useState('date');
    const [areas, setAreas] = useState(fetchedAreas);
    const [filteredAreas, setFilteredAreas] = useState(fetchedAreas);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const data = await getAllHabits();
                setFetchedHabits(data);
                setHabits(data);
            } catch (err) {
                setError(err.message);
            }
        };
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
        loadHabits();
        loadAreas();
    }, []);

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

            const resetFilteredAreas = sortByName([...areas]);
            setFilteredAreas(resetFilteredAreas);

            return;
        }

        if (sortOrder === "area") {
            const filtered = filter([...areas], searchHabit);
            setFilteredAreas(filtered);
        } else {
            const filtered = filter([...habits], searchHabit);
            setFilteredHabits(filtered);
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

    const sortByName = (array) => {
        return [...array].sort((a, b) => a.name.localeCompare(b.name));
    }

    const sortByDate = (array) => {
        return [...array].sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    const filter = (array, search) => {
        return [...array].filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()));
    }

    const handleInputChange = (ev) => {
        setSearchHabit(ev.target.value);
    }

    const handleSearch = (ev) => {
        ev.preventDefault();
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
                        <Form className="d-flex" onChange={handleSearch}>
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
                    <div className="sort-habit">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-sort">
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
                                                        .filter(habit => habit.area === area.name)
                                                        .map(habit => (
                                                            <Habit key={habit._id} habit={habit} />
                                                        ))}
                                                </ul>
                                            </li>
                                        ))
                                        : <div className="text-center w-100">No areas found with this name!</div>
                                )
                                : (filteredHabits.map(habit => (
                                    <Habit key={habit._id} habit={habit} />
                                )))}
                        </ul>
                        : <div className="text-center w-100">No habits found with this name!</div>
                    )}
            </div>
        </div>
    );
}

export default HabitsList;