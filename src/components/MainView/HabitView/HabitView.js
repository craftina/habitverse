import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getHabit } from '../../../api/api';

const HabitView = () => {
    const { id } = useParams();
    const [habit, setHabit] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHabit = async () => {
            try {
                const data = await getHabit(id);
                setHabit(data);
            } catch (err) {
                setError(err.message);
            }
        };
        loadHabit();
    }, [id]);

    const getDateFunction = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDateTime = `${day}/${formattedMonth}`;
        return formattedDateTime;
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>;
    }

    if (!habit) {
        return <div>Loading...</div>;
    }

    return (
        <div className="habit-view-container d-flex flex-column mx-3 gap-1">
            <div className="habit-view-heading d-flex justify-content-between align-items-center mb-2">
                <h1>{habit.name}</h1>
                <div className="habit-view-dates text-nowrap">
                    <h4>From: {getDateFunction(habit.startDate)}</h4>
                    <h4>To: {getDateFunction(habit.endDate)}</h4>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <h3>Times per day: 0 / {habit.timesPerDay}</h3>
                <div className="completion-buttons d-flex gap-2">
                    <Button className="completion-button">+1</Button>
                    <Button className="completion-button"><b>&#x2713;</b></Button>
                </div>
            </div>
            <h3>Time of the day: {habit.timeOfDay}</h3>
            <h3>Days of the week: {habit.daysOfWeek.length === 7 ? "Every day" : habit.daysOfWeek.join(", ")}</h3>
            <h4>Area: {habit.area.name}</h4>
            <h4>Description:</h4>
            <p>{habit.description === "" ? "There is no discription for this habit" : habit.description}</p>
            <div className="habit-view-buttons d-flex gap-2 justify-content-end">
                <Button>Edit</Button>
                <Button>Delete</Button>
            </div>
        </div>
    );
}

export default HabitView;