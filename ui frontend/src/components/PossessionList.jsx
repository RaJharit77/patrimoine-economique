import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const calculateCurrentValue = (possession) => {
    const startDate = new Date(possession.dateDebut);
    const yearsDifference = (new Date() - startDate) / (365 * 24 * 60 * 60 * 1000);
    const amortissement = possession.valeur * (possession.tauxAmortissement / 100) * yearsDifference;
    return possession.valeur - amortissement;
};

const PossessionList = () => {
    const [possessionsData, setPossessionsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/possessions');
                setPossessionsData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditPossession = (libelle) => {
        navigate(`/possession/${libelle}/update`);
    };

    const handleClosePossession = async (libelle) => {
        try {
            await axios.put(`http://localhost:5000/api/possession/${libelle}/close`);
            const updatedData = possessionsData.map(possession => {
                if (possession.libelle === libelle) {
                    return { ...possession, dateFin: new Date().toISOString().split('T')[0] };
                }
                return possession;
            });
            setPossessionsData(updatedData);
        } catch (error) {
            console.error('Error closing possession:', error);
        }
    };

    const handleCreatePossession = () => {
        navigate('/possession/create');
    };

    return (
        <Container className="mt-5">
            <div className="text-center" style={{ width: '100%' }}>
                <h2 className="mb-4">Gestion des Patrimoines</h2>
                <Table striped bordered hover className="mx-auto" style={{ maxWidth: '90%' }}>
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Valeur Initiale</th>
                            <th>Date de début</th>
                            <th>Date de fin</th>
                            <th>Taux d'Amortissement</th>
                            <th>Valeur Actuelle</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {possessionsData.map((possession, index) => (
                            <tr key={index}>
                                <td>{possession.libelle}</td>
                                <td>{possession.valeur}</td>
                                <td>{possession.dateDebut}</td>
                                <td>{possession.dateFin || 'N/A'}</td>
                                <td>{possession.tauxAmortissement}</td>
                                <td>{calculateCurrentValue(possession).toFixed(0)}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleEditPossession(possession.libelle)}>
                                        Éditer
                                    </Button>{' '}
                                    <Button variant="danger" onClick={() => handleClosePossession(possession.libelle)}>
                                        Clôturer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="success" onClick={handleCreatePossession}>
                        Créer une nouvelle possession
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default PossessionList;
