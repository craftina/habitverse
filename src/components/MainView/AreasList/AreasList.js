import React, { useState, useEffect, useContext } from "react";
import { Form, FormControl, Button } from 'react-bootstrap';
import './AreasList.css';
import AreaListItem from "./AreaListItem/AreaListItem.js";
import AddAreaModal from "../../modals/AddAreaModal/AddAreaModal.js";
import { AreasContext } from "../../../context/AreasContext.js";
import { HabitsContext } from "../../../context/HabitsContext.js";
import EditAreaModal from "../../modals/EditAreaModal/EditAreaModal.js";

const AreasList = () => {
    const { areas, addArea, editArea, removeArea } = useContext(AreasContext);
    const { habits } = useContext(HabitsContext);
    const [searchArea, setSearchArea] = useState('');
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [showAddAreaModal, setShowAddAreaModal] = useState(false);
    const [showEditAreaModal, setShowEditAreaModal] = useState(false);
    const [currentArea, setCurrentArea] = useState(null);

    useEffect(() => {
        if (searchArea.trim() === '') {
            setFilteredAreas(sortByName([...areas]));
        } else {
            setFilteredAreas(filter([...areas], searchArea));
        }
    }, [searchArea, areas]);

    const sortByName = (array) => {
        return [...array].sort((a, b) => a.name.localeCompare(b.name));
    };

    const filter = (array, search) => {
        return [...array].filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    };

    const handleInputChange = (ev) => {
        setSearchArea(ev.target.value);
    };

    const handleShowAddAreaModal = () => setShowAddAreaModal(true);
    const handleCloseAddAreaModal = () => setShowAddAreaModal(false);

    const handleSaveNewArea = (newAreaName) => {
        const newAreaObject = { name: newAreaName };
        addArea(newAreaObject);
        handleCloseAddAreaModal();
    };

    const handleShowEditAreaModal = (area) => {
        setCurrentArea(area);
        setShowEditAreaModal(true);
    };

    const handleCloseEditAreaModal = () => {
        setCurrentArea(null);
        setShowEditAreaModal(false);
    };

    const handleUpdateArea = async (updatedAreaName) => {
        const updatedAreaObject = { name: updatedAreaName };

        try {
            await editArea(currentArea._id, updatedAreaObject);
            handleCloseEditAreaModal();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    const handleDeleteArea = (areaId) => {
        removeArea(areaId);
    };

    return (
        <div className="areas-list-component d-flex flex-column align-items-center gap-3 mx-3">
            <div className="areas-list-header d-flex align-content-center align-items-end justify-content-between w-100 gap-3">
                <h1 className="m-0">Areas</h1>
                <div className="d-flex gap-2">
                    <div className="search-area">
                        <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
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
                    <div className="add-area">
                        <Button variant="primary" onClick={handleShowAddAreaModal}>Add</Button>
                    </div>
                </div>
            </div>
            <div className="areas-list-container w-100 d-flex">
                <ul className="areas-list list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                    {
                        filteredAreas.length > 0
                            ? (filteredAreas.map(area =>
                                <AreaListItem key={area._id} area={area} habits={habits} onEdit={() => handleShowEditAreaModal(area)} onDelete={handleDeleteArea} />
                            ))
                            : <div className="text-center w-100">No areas found with this name!</div>
                    }
                </ul>
            </div>
            <AddAreaModal
                show={showAddAreaModal}
                onHide={handleCloseAddAreaModal}
                onSave={handleSaveNewArea}
            />
            <EditAreaModal
                area={currentArea}
                show={showEditAreaModal}
                onHide={handleCloseEditAreaModal}
                onSave={handleUpdateArea}
            />

        </div>
    );
}

export default AreasList;