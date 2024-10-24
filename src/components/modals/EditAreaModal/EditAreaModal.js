import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from 'react-bootstrap';

const EditAreaModal = ({ area, show, onHide, onSave }) => {
    const [updatedArea, setUpdatedArea] = useState('');

    useEffect(() => {
        if (area && area.name.trim()) {
            setUpdatedArea(area.name.trim());
        }
    }, [area]);

    const handleSave = () => {
        onSave(updatedArea);
        setUpdatedArea('');
    };

    const handleClose = () => {
        setUpdatedArea('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Area</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Edit Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={updatedArea}
                        value={updatedArea}
                        onChange={(e) => setUpdatedArea(e.target.value)}
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

export default EditAreaModal;