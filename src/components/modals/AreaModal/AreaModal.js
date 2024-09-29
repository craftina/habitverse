import React, { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';

const AreaModal = ({ show, onHide, onSave }) => {
    const [newArea, setNewArea] = useState('');

    const handleSave = () => {
        if (newArea.trim()) {
            onSave(newArea.trim());
            setNewArea('');
        }
    };

    const handleClose = () => {
        setNewArea('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Area</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>New Area Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter area name"
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Area
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AreaModal;