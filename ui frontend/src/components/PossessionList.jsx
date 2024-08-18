import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

const PossessionsTables = () => {
    const [possessions, setPossessions] = useState([]);

    useEffect(() => {
        fetch('/possession')
            .then(response => response.json())
            .then(data => setPossessions(data));
    }, []);

    const handleClose = (libelle) => {
        fetch(`/possession/${libelle}/close`, { method: 'POST' })
            .then(() => {
                setPossessions(possessions.map(p =>
                    p.libelle === libelle ? { ...p, dateFin: new Date().toISOString().split('T')[0] } : p
                ));
            });
    };

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Libelle</th>
                        <th>Valeur</th>
                        <th>Date Début</th>
                        <th>Date Fin</th>
                        <th>Taux Amortissement</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {possessions.map((possession, index) => (
                        <tr key={index}>
                            <td>{possession.libelle}</td>
                            <td>{possession.valeur}</td>
                            <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                            <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
                            <td>{possession.tauxAmortissement || 'N/A'}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleClose(possession.libelle)}>Close</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PossessionsTables;
