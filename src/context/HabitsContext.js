import React, { createContext, useState, useEffect } from "react";
import { getAllHabits, postHabit, deleteHabit } from '../api/api.js';

export const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getAllHabits();
        setHabits(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHabits();
  }, []);

  const addHabit = async (newHabit) => {
    try {
      const addedHabit = await postHabit(newHabit);
      setHabits((prevHabits) => [...prevHabits, addedHabit]);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeHabit = async (habitId) => {
    try {
      await deleteHabit(habitId);
      setHabits((prevHabits) => prevHabits.filter((habit) => habit._id !== habitId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <HabitsContext.Provider value={{ habits, addHabit, removeHabit, error }}>
      {children}
    </HabitsContext.Provider>
  );
};

