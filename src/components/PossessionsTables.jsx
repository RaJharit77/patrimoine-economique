import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import possessionsData from '../data';

const calculateCurrentValue = (possession, date) => {
    const startDate = new Date(possession.dateDebut);
    const yearsDifference = (date - startDate) / (365 * 24 * 60 * 60 * 1000);
    const amortissement = possession.valeur * (possession.tauxAmortissement / 100) * yearsDifference;
    return possession.valeur - amortissement;
};

const PossessionsTable = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [patrimoineValue, setPatrimoineValue] = useState(0);

    const handleCalculatePatrimoine = () => {
        let totalValue = 0;
        possessionsData.forEach(possession => {
            totalValue += calculateCurrentValue(possession, selectedDate);
        });
        setPatrimoineValue(totalValue);
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Libellé</th>
                        <th>Valeur Initiale</th>
                        <th>Date Début</th>
                        <th>Date Fin</th>
                        <th>Taux d'Amortissement</th>
                        <th>Valeur Actuelle</th>
                    </tr>
                </thead>
                <tbody>
                    {possessionsData.map((possession, index) => (
                        <tr key={index}>
                            <td>{possession.libelle}</td>
                            <td>{possession.valeur}</td>
                            <td>{possession.dateDebut}</td>
                            <td>{possession.dateFin}</td>
                            <td>{possession.tauxAmortissement}</td>
                            <td>{calculateCurrentValue(possession, new Date()).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Form>
                <Form.Group>
                    <Form.Label>Sélectionner une date</Form.Label>
                    <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                </Form.Group>
                <Button variant="primary" onClick={handleCalculatePatrimoine}>
                    Valider
                </Button>
            </Form>
            <div className="mt-3">
                <h4>La Valeur du Patrimoine à la date sélectionnée est : {patrimoineValue.toFixed(2)} Ar</h4>
            </div>
        </div>
    );
};

export default PossessionsTable;
