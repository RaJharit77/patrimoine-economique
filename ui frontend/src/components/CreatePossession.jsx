import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CreatePossession = () => {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [taux, setTaux] = useState('');

    const createPossession = () => {
        fetch('/possession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ libelle, valeur, dateDebut, taux }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle response
            console.log(data);
        });
    };

    return (
        <Container>
            <h2>Créer une Possession</h2>
            <Form>
                <Form.Group controlId="formLibelle">
                    <Form.Label>Libelle</Form.Label>
                    <Form.Control
                        type="text"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formValeur">
                    <Form.Label>Valeur</Form.Label>
                    <Form.Control
                        type="number"
                        value={valeur}
                        onChange={(e) => setValeur(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formDateDebut">
                    <Form.Label>Date Début</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formTaux">
                    <Form.Label>Taux</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        value={taux}
                        onChange={(e) => setTaux(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" onClick={createPossession} as={Link} to={'/possession/create'}>
                    Créer
                </Button>
                <Button variant="success" onClick={createPossession} as={Link} to={'/possession/:libelle/update'}>
                    Mise à jour
                </Button>
                <Button variant="danger" onClick={createPossession} as={Link} to={'/possession/:libelle/close'}>
                    Fermer
                </Button>
            </Form>
        </Container>
    );
};

export default CreatePossession;
