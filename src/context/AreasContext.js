import React, { createContext, useState, useEffect } from "react";
import { getAllAreas, postArea, deleteArea } from '../api/api.js';

export const AreasContext = createContext();

export const AreasProvider = ({ children }) => {
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await getAllAreas();
        setAreas(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAreas();
  }, []);

  const addArea = async (newArea) => {
    try {
      const addedArea = await postArea(newArea);
      setAreas((prevAreas) => [...prevAreas, addedArea]);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeArea = async (areaId) => {
    try {
      await deleteArea(areaId);
      setAreas((prevAreas) => prevAreas.filter((area) => area._id !== areaId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AreasContext.Provider value={{ areas, addArea, removeArea, error }}>
      {children}
    </AreasContext.Provider>
  );
};


