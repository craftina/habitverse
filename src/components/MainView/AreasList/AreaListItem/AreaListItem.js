import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AreaListItem = ({ area, habits, onDelete }) => {
    const handleDeleteClick = () => {
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
                                {}
                            </Card.Text>
                        </Col>
                        <Col className="d-flex gap-2 align-items-end justify-content-end">
                            <Button onClick={handleDeleteClick}>Delete</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </li>
    );
}

export default AreaListItem;