import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AreaListItem = ({ area, habits, onDelete, onEdit }) => {
    const habitCount = habits.filter(habit => habit && habit.area && habit.area._id === area._id).length;
    const handleEditArea = () => {
        onEdit(area);
    }

    const handleDeleteArea = () => {
        if (habitCount > 0) {
            alert("There is habits in this area.");
            return;
        }
        onDelete(area._id);
    };

    return (
        <li>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title as={Link} to={`/areas/${area._id}`} className="text-decoration-none">
                                <h4>{area.name}</h4>
                            </Card.Title>
                            <Card.Text>
                                {habitCount > 0
                                    ? `${habitCount} habit${habitCount !== 1 ? 's' : ''} in this area!`
                                    : "There is no habits in this area!"
                                }
                            </Card.Text>
                        </Col>
                        <Col className="d-flex gap-2 align-items-end justify-content-end">
                            <Button onClick={handleEditArea}>Edit</Button>
                            <Button onClick={handleDeleteArea}>Delete</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </li>
    );
}

export default AreaListItem;