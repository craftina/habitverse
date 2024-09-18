import React, { useEffect, useState } from 'react';
import Habit from '../../DailyView/Habit/Habit';
import { Form, FormControl, Button, Dropdown } from 'react-bootstrap';
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

    const [searchHabit, setSearchHabit] = useState('');
    const [habits, setHabits] = useState(habitsArray);
    const [filteredHanits, setFilteredHabits] = useState(habitsArray);
    const [sortOrder, setSortOrder] = useState('name');

    // Filter and sort habits whenever searchHabit or sortOrder changes
    useEffect(() => {
        let filtered = habits.filter(habit =>
            habit.name.toLowerCase().includes(searchHabit.toLowerCase())
        );

        setFilteredHabits(filtered);
    }, [searchHabit, habits]);

    useEffect(() => {
        const sortedItems = [...habits].sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        })
        setFilteredHabits(sortedItems);
    }, [habits]);


    // Function to handle search input change
    const handleInputChange = (ev) => {
        setSearchHabit(ev.target.value);
    }

    // Function to handle the search submission
    const handleSearch = (ev) => {
        ev.preventDefault();
    }

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedItems = [...filteredHanits].sort((a, b) => {
            if (order === 'name') {
                return a.name.localeCompare(b.name);
            }
            else if (order === 'date') {
                return new Date(a.date) - new Date(b.date);
            }
            else if (order === "area") {
                return a.area.localeCompare(b.area);
            }
        });
        setFilteredHabits(sortedItems);
    };

    return (
        <div className="habits-list-component d-flex flex-column align-items-center gap-3 mx-3">
            <div className="habits-list-header d-flex align-content-center align-items-end justify-content-between w-100 gap-3">
                <h1 className="m-0">Habits</h1>
                <div className="d-flex gap-2">
                    <div className="search-habit">
                        <Form className="d-flex" onChange={handleSearch}>
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
                    <div className="sort-habit">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-sort">
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSort('name')}>Name</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('date')}>Date</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('area')}>Area</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="habits-list-container w-100 d-flex">
                {/* sort:
          name - all alphabetically
          area - area title alphabetically and below the tasks
          time of the day - all day/morning/afternoon/evening and below the tasks */}
                {filteredHanits.length > 0 ?
                    <ul className="habits-list list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                        {filteredHanits.map(habit => (
                            <Habit key={habit.id} habit={habit} />
                        ))}
                    </ul>
                    : <div className="text-center w-100">No habits found with this name!</div>
                }
            </div>
        </div>
    );
}

export default HabitsList;