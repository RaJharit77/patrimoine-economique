import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePossession = () => {
    const { libelle } = useParams();
    const navigate = useNavigate();
    const [dateFin, setDateFin] = useState('');

    useEffect(() => {
        // Fetch the possession data if needed
    }, [libelle]);

    const updatePossession = () => {
        fetch(`/possession/${libelle}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ libelle, dateFin }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle response
            navigate('/possession');
        });
    };

    return (
        <Container>
            <h2>Mettre à jour la Possession</h2>
            <Form>
                <Form.Group controlId="formDateFin">
                    <Form.Label>Date Fin</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" onClick={updatePossession}>
                    Mettre à jour
                </Button>
            </Form>
        </Container>
    );
};

export default UpdatePossession;
