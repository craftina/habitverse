import React, { useState, useEffect } from "react";
import { Form, FormControl } from 'react-bootstrap';
import Habit from '../../HabitsList/HabitListItem/HabitListItem.js';
import './AreasList.css';
import { getAllHabits, getAllAreas } from '../../../api/api.js';

const AreasList = () => {
    const [fetchedHabits, setFetchedHabits] = useState([]);
    const [fetchedAreas, setFetchedAreas] = useState([]);
    const [searchArea, setSearchArea] = useState('');
    const [areas, setAreas] = useState(fetchedAreas);
    const [habits, setHabits] = useState(fetchedHabits);
    const [filteredHabits, setFilteredHabits] = useState(fetchedHabits);
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
                            )))
                            : <div className="text-center w-100">No areas found with this name!</div>
                    }
                </ul>
            </div>
        </div>
    );
}

export default AreasList;