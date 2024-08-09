import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Patrimoine from '../../../models/Patrimoine.js';
import Argent from '../../../models/possessions/Argent.js';
import BienMateriel from '../../../models/possessions/BienMateriel.js';
import Flux from '../../../models/possessions/Flux.js';

const PossessionsTable = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [patrimoineValue, setPatrimoineValue] = useState(0);
    const [possessionsData, setPossessionsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/possessions');
                console.log('Data fetched:', response.data);
                setPossessionsData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCalculatePatrimoine = () => {
        const possessions = possessionsData.map((item) => {
            switch (item.libelle) { // Assurez-vous que 'item.libelle' est le bon champ pour identifier le type
                case 'Argent':
                    return new Argent(item.possesseur, item.libelle, item.valeur, new Date(item.dateDebut), new Date(item.dateFin), item.tauxAmortissement, item.type);
                case 'BienMateriel':
                    return new BienMateriel(item.possesseur, item.libelle, item.valeur, new Date(item.dateDebut), new Date(item.dateFin), item.tauxAmortissement);
                case 'Flux':
                    return new Flux(item.possesseur, item.libelle, item.valeur, new Date(item.dateDebut), new Date(item.dateFin), item.tauxAmortissement, item.jour);
                default:
                    return null;
            }
        }).filter(item => item !== null);

        const patrimoine = new Patrimoine('Nom du Possesseur', possessions);
        setPatrimoineValue(patrimoine.getValeur(selectedDate));
    };

    const calculateCurrentValue = (possession, date) => {
        // Implémentez cette fonction pour calculer la valeur actuelle
        return possession.valeur; // Remplacez par la logique réelle
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
                            <th>Date de fin</th>
                            <th>Taux d'Amortissement</th>
                            <th>Valeur Actuelle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {possessionsData.length > 0 ? (
                            possessionsData.map((possession, index) => (
                                <tr key={index}>
                                    <td>{possession.libelle}</td>
                                    <td>{possession.valeur}</td>
                                    <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                                    <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
                                    <td>{possession.tauxAmortissement}</td>
                                    <td>{calculateCurrentValue(possession, selectedDate).toFixed(0)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Aucune donnée disponible</td>
                            </tr>
                        )}
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
                    <h4>La Valeur du Patrimoine à la date sélectionnée : {patrimoineValue.toFixed(0)} Ar</h4>
                </div>
            </div>
        </Container>
    );
};

export default PossessionsTable;
