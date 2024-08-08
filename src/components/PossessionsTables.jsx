import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const calculateCurrentValue = (possession, date) => {
    const startDate = new Date(possession.dateDebut);
    const yearsDifference = (date - startDate) / (365 * 24 * 60 * 60 * 1000);
    const amortissement = possession.valeur * (possession.tauxAmortissement / 100) * yearsDifference;
    return possession.valeur - amortissement;
};

const PossessionsTable = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [patrimoineValue, setPatrimoineValue] = useState(0);
    const [possessionsData, setPossessionsData] = useState([]);

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

    const handleCalculatePatrimoine = () => {
        let totalValue = 0;
        possessionsData.forEach(possession => {
            totalValue += calculateCurrentValue(possession, selectedDate);
        });
        setPatrimoineValue(totalValue);
    };

    return (
        <Container className="mt-5">
            <div className="text-center" style={{ width: '100%' }}>
                <h2 className="mb-4">Liste des Possessions</h2>
                <Table striped bordered hover className="mx-auto" style={{ maxWidth: '90%' }}>
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Valeur Initiale</th>
                            <th>Date de début</th>
                            <th>Date de fin(Provisoirement)</th>
                            <th>Taux d'Amortissement</th>
                            <th>Valeur Actuelle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {possessionsData.map((possession, index) => (
                            <tr key={index}>
                                <td>{possession.libelle}</td>
                                <td>{possession.valeur}</td>
                                <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                                <td>{new Date(possession.dateFin).toLocaleDateString()}</td>
                                <td>{possession.tauxAmortissement}</td>
                                <td>{calculateCurrentValue(possession, new Date()).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Sélectionner une date :</Form.Label>
                        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleCalculatePatrimoine}>
                        Valider
                    </Button>
                </Form>
                <div className="mt-3">
                    <h4>Valeur du Patrimoine à la date sélectionnée : {patrimoineValue.toFixed(0)} Ar</h4>
                </div>
            </div>
        </Container>
    );
};

export default PossessionsTable;
