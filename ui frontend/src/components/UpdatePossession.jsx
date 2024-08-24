import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePossession = () => {
    const { libelle } = useParams();
    const libelleEncoded = encodeURIComponent(libelle);
    const navigate = useNavigate();

    const [libelleUpdated, setLibelleUpdated] = useState('');
    const [valeurInitiale, setValeurInitiale] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [tauxAmortissement, setTauxAmortissement] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPossession = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/possession/${libelleEncoded}`);
                if (response.data) {
                    setLibelleUpdated(response.data.libelle);
                    setValeurInitiale(response.data.valeur);
                    setDateDebut(response.data.dateDebut);
                    if (response.data.dateFin) {
                        setDateFin(response.data.dateFin);
                    }
                    setTauxAmortissement(response.data.tauxAmortissement);
                }
            } catch (error) {
                setError('Erreur lors de la récupération des données de la possession.');
            }
        };

        fetchPossession();
    }, [libelleEncoded]);

    const updatePossession = async () => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/possession/${libelleEncoded}`, {
                libelle: libelleUpdated,
                valeur: valeurInitiale,
                dateDebut,
                dateFin,
                tauxAmortissement
            });
            navigate('/possession');
        } catch (error) {
            setError('Erreur lors de la mise à jour de la possession.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/possession');
    };

    return (
        <Container className="mt-5">
            <h2>Mettre à jour la Possession</h2>
            {error && <p className="text-danger">{error}</p>}
            <Form>
                <Form.Group controlId="formLibelle">
                    <Form.Label>Libellé</Form.Label>
                    <Form.Control
                        type="text"
                        value={libelleUpdated}
                        onChange={(e) => setLibelleUpdated(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formValeurInitiale">
                    <Form.Label>Valeur Initiale</Form.Label>
                    <Form.Control
                        type="number"
                        value={valeurInitiale}
                        onChange={(e) => setValeurInitiale(e.target.value)}
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

                <Form.Group controlId="formDateFin">
                    <Form.Label>Date Fin</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formTauxAmortissement">
                    <Form.Label>Taux d'Amortissement</Form.Label>
                    <Form.Control
                        type="number"
                        value={tauxAmortissement}
                        onChange={(e) => setTauxAmortissement(e.target.value)} 
                    />
                </Form.Group>

                <Button variant="primary" onClick={updatePossession} disabled={loading}>
                    {loading ? 'Mise à jour en cours...' : 'Mettre à jour'}
                </Button>
                <Button variant="secondary" onClick={handleCancel} className="ms-2">
                    Annuler
                </Button>
            </Form>
        </Container>
    );
};

export default UpdatePossession;
