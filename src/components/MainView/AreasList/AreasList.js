import React, { useState, useEffect, useContext } from "react";
import { Form, FormControl, Button } from 'react-bootstrap';
import './AreasList.css';
import AreaListItem from "./AreaListItem/AreaListItem.js";
import AreaModal from "../../modals/AreaModal/AreaModal.js";
import { AreasContext } from "../../../context/AreasContext.js";

const AreasList = () => {
    const { areas, addArea, removeArea, error } = useContext(AreasContext);
    const [searchArea, setSearchArea] = useState('');
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSaveNewArea = (newAreaName) => {
        const newAreaObject = { name: newAreaName };
        addArea(newAreaObject);
        handleCloseModal();
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
                        <Button variant="primary" onClick={handleShowModal}>Add</Button>
                    </div>
                </div>
            </div>
            <div className="areas-list-container w-100 d-flex">
                <ul className="areas-list list-unstyled d-flex flex-column gap-3 my-4 w-100 pb-3">
                    {
                        filteredAreas.length > 0
                            ? (filteredAreas.map(area => (
                                <AreaListItem key={area._id} area={area} onDelete={handleDeleteArea} />
                            )))
                            : <div className="text-center w-100">No areas found with this name!</div>
                    }
                </ul>
            </div>
            <AreaModal
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleSaveNewArea}
            />
        </div>
    );
}

export default AreasList;