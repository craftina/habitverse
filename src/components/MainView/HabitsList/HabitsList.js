import React, { useEffect, useState } from 'react';
import Habit from '../../DailyView/Habit/Habit';
import { Form, FormControl, Dropdown } from 'react-bootstrap';
import './HabitsList.css';

const HabitsList = () => {

    const habitsArray = [
        { id: 1, name: 'Running', date: '2024-09-18T14:30:00Z', area: 'Sport', times: 1, completed: 'No' },
        { id: 2, name: 'Drinking Water', date: '2024-09-18T11:30:00Z', area: 'Health', times: 1, completed: 'No' },
        { id: 3, name: 'Shopping', date: '2024-09-18T15:30:00Z', area: 'Food', times: 1, completed: 'Yes' },
        { id: 4, name: 'Shopping', date: '2024-09-18T15:30:00Z', area: 'Food', times: 1, completed: 'Yes' },
        { id: 5, name: 'Shopping', date: '2024-09-18T15:30:00Z', area: 'Food', times: 1, completed: 'Yes' },
        { id: 6, name: 'Shopping', date: '2024-09-18T15:30:00Z', area: 'Food', times: 1, completed: 'Yes' },
        { id: 7, name: 'Shopping', date: '2024-09-18T15:30:00Z', area: 'Food', times: 1, completed: 'Yes' },
        { id: 8, name: 'Meditating', date: '2024-09-16T14:30:00Z', area: 'Sport', times: 1, completed: 'Yes' }
    ]

    const areaList = [
        { id: 1, name: 'Sport' },
        { id: 2, name: 'Health' },
        { id: 3, name: 'Food' }
    ]

    const [searchHabit, setSearchHabit] = useState('');
    const [habits, setHabits] = useState(habitsArray);
    const [filteredHabits, setFilteredHabits] = useState(habitsArray);
    const [sortOrder, setSortOrder] = useState('date');
    const [areas, setAreas] = useState(areaList);
    const [filteredAreas, setFilteredAreas] = useState(areaList);

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
                {filteredHabits.length > 0 ?
                    <ul className="habits-list list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                        {sortOrder === "area"
                            ? (
                                filteredAreas.length > 0 ?
                                    filteredAreas.map(area => (
                                        <li key={area.name}>
                                            <h2>{area.name}</h2>
                                            <ul className="habits-area list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                                                {filteredHabits
                                                    .filter(habit => habit.area === area.name)
                                                    .map(habit => (
                                                        <Habit key={habit.id} habit={habit} />
                                                    ))}
                                            </ul>
                                        </li>
                                    ))
                                    : <div className="text-center w-100">No areas found with this name!</div>
                            )
                            : (filteredHabits.map(habit => (
                                <Habit key={habit.id} habit={habit} />
                            )))}
                    </ul>
                    : <div className="text-center w-100">No habits found with this name!</div>
                }
            </div>
        </div>
    );
}

export default HabitsList;