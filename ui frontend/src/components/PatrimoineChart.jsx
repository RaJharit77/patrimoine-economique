import 'bootstrap/dist/css/bootstrap.min.css';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function PatrimoineChart() {
    const [chartData, setChartData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Valeur du Patrimoine',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    });

    const [dateDebut, setDateDebut] = useState(null);
    const [dateFin, setDateFin] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [jour, setJour] = useState('');

    const handleValidateRange = () => {
        // Appeler l'API pour obtenir la valeur du patrimoine sur une période donnée avec le jour sélectionné
        setChartData({
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Valeur du Patrimoine',
                    data: [70, 60, 90, 85, 60, 65],
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.1,
                },
            ],
        });
    };

    const handleValidateDate = () => {
        // Appeler l'API pour obtenir la valeur du patrimoine à la date sélectionnée
        setChartData({
            labels: ['Selected Date'],
            datasets: [
                {
                    label: 'Valeur du Patrimoine',
                    data: [78],
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.1,
                },
            ],
        });
    };

    return (
        <Container style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Date Début</Form.Label>
                            <DatePicker
                                selected={dateDebut}
                                onChange={(date) => setDateDebut(date)}
                                className="form-control"
                                placeholderText="Sélectionner une date"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Date Fin</Form.Label>
                            <DatePicker
                                selected={dateFin}
                                onChange={(date) => setDateFin(date)}
                                className="form-control"
                                placeholderText="Sélectionner une date"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Jour</Form.Label>
                            <Form.Select value={jour} onChange={(e) => setJour(e.target.value)}>
                                <option value="">Sélectionner un jour</option>
                                <option value="Lundi">Lundi</option>
                                <option value="Mardi">Mardi</option>
                                <option value="Mercredi">Mercredi</option>
                                <option value="Jeudi">Jeudi</option>
                                <option value="Vendredi">Vendredi</option>
                                <option value="Samedi">Samedi</option>
                                <option value="Dimanche">Dimanche</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-end">
                        <Button variant="primary" onClick={handleValidateRange}>
                            Validate Range
                        </Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Date </Form.Label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className="form-control"
                                placeholderText="Sélectionner une date"
                            />
                        </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-end">
                        <Button variant="success" onClick={handleValidateDate}>
                            Validate Date
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Line data={chartData} />
        </Container>
    );
}

export default PatrimoineChart;