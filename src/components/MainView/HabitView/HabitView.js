import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
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

    if (error) {
        return <div className="text-danger text-center">{error}</div>;
    }

    if (!habit) {
        return <div>Loading...</div>;
    }

    return (
        <div>
           {habit.name}
        </div>
    );
}

export default HabitView;