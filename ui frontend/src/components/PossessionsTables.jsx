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
            <Form.Group controlId="datePicker" className="mb-3">
                <Form.Label>Select Date</Form.Label>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    className="form-control"
                />
            </Form.Group>
            <Button onClick={handleCalculatePatrimoine} variant="primary">Calculate Patrimoine</Button>
            <h3 className="mt-3">Patrimoine Value: {patrimoineValue}</h3>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Libelle</th>
                        <th>Valeur</th>
                        <th>Date Début</th>
                        <th>Date Fin</th>
                        <th>Taux Amortissement</th>
                        <th>Valeur Actuelle</th>
                    </tr>
                </thead>
                <tbody>
                    {possessionsData.map((possession, index) => (
                        <tr key={index}>
                            <td>{possession.libelle}</td>
                            <td>{possession.valeur}</td>
                            <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                            <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
                            <td>{possession.tauxAmortissement}%</td>
                            <td>{calculateCurrentValue(possession, selectedDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PossessionsTable;
