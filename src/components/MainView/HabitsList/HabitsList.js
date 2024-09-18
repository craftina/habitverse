import React, { useState } from 'react';
import Habit from '../../DailyView/Habit/Habit';
import { Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import './HabitsList.css';

const HabitList = () => {

    const habitsArray = [
        { name: 'Running', date: 15.02, area: 'Sport', times: 1, completed: 'No' },
        { name: 'Drinking Water', date: 18.02, area: 'Health', times: 1, completed: 'No' },
        { name: 'Shopping', date: 12.02, area: 'Food', times: 1, completed: 'Yes' },
        { name: 'Meditating', date: 13.02, area: 'Sport', times: 1, completed: 'Yes' }
    ]

    const [searchHabit, setSearchHabit] = useState('');
    const [habits, setHabits] = useState(habitsArray);
    const [sortOrder, setSortOrder] = useState('name');


    // Function to handle search input change
    const handleInputChange = (ev) => {
        setSearchHabit(ev.target.value);
    }

    // Function to handle the search submission
    const handleSearch = (ev) => {
        ev.preventDefault();
        console.log("Hallo");
        // const filteredItems = items.filter((item) =>
        //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
        //   );
    }

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedItems = [...habits].sort((a, b) => {
            if (order === 'name') {
                return console.log('name');

                // return a.name.localeCompare(b.name);
            } else if (order === 'date') {
                return console.log('date');
                // date logic
                // return a.date.localeCompare(b.date);
            } else if (order === "area") {
                return console.log('area');
                // return a.area.localeCompare(b.area);
            }
        });
        setHabits(sortedItems);
    };



    return (
        <div className="habits-list-component d-flex flex-column align-items-center gap-3 mx-3">
            <div className="habits-list-header d-flex align-content-center align-items-end justify-content-between w-100 gap-3">
                <h1 className="m-0">Habits</h1>
                <div className="d-flex gap-2">
                    <div className="search-habit">
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Search Habit..."
                                aria-label="Search"
                                className="search-box rounded-end-0"
                                // aria-describedby="basic-addon1"
                                value={searchHabit}
                                onChange={handleInputChange}
                            />
                            {/* icon search */}
                            <Button className='rounded-start-0' variant="primary" type="submit">Search</Button>
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
                <ul className="habits-list list-unstyled d-flex flex-column gap-3 my-4 w-100">
                    <li><Habit /></li>
                    <li><Habit /></li>
                    <li><Habit /></li>
                    <li><Habit /></li>
                    <li><Habit /></li>
                    <li><Habit /></li>
                    <li><Habit /></li>
                    <li><Habit /></li>
                </ul>
            </div>
        </div>
    );
}

export default HabitList;