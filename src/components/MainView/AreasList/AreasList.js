import React, { useState, useEffect } from "react";
import { Form, FormControl } from 'react-bootstrap';
import Habit from '../../DailyView/Habit/Habit';
import './AreasList.css';

const AreasList = () => {

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

    const [searchArea, setSearchArea] = useState('');
    const [areas, setAreas] = useState(areaList);
    const [habits, setHabits] = useState(habitsArray);
    const [filteredHabits, setFilteredHabits] = useState(habitsArray);
    const [filteredAreas, setFilteredAreas] = useState(areaList);

    useEffect(() => {
        if (searchArea.trim() === '') {
            setFilteredHabits(sortByName([...habits]));
            const resetFilteredAreas = sortByName([...areas]);
            setFilteredAreas(resetFilteredAreas);

            return;
        }
        const filtered = filter([...areas], searchArea);
        setFilteredAreas(filtered);
    }, [searchArea, areas, habits]);

    useEffect(() => {
        setFilteredAreas(sortByName([...areas]));
        setFilteredHabits(sortByName([...habits]));
    }, [habits, areas]);

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

    return (
        <div className="areas-list-component d-flex flex-column align-items-center gap-3 mx-3">
            <div className="areas-list-header d-flex align-content-center align-items-end justify-content-between w-100 gap-3">
                <h1 className="m-0">Areas</h1>
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
            </div>
            <div className="areas-list-container w-100 d-flex">
                <ul className="areas-list list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                    {
                        filteredAreas.length > 0
                            ? (filteredAreas.map(area => (
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
                            )))
                            : <div className="text-center w-100">No areas found with this name!</div>
                    }
                </ul>
            </div>
        </div>
    );
}

export default AreasList;