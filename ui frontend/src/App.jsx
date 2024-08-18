import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import CreatePossession from './pages/CreatePossessionPage';
import PatrimoinePage from './pages/Patrimoine';
import PossessionList from './pages/Possessions';
import PossessionsTables from './pages/PossessionsTables';
import UpdatePossession from './pages/UpdatePossessionPage';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<PossessionsTables />} />
                <Route path="/possession" element={<CreatePossession />} />
                <Route path="/possession/create" element={<PossessionList />} />
                <Route path="/patrimoine" element={<PatrimoinePage />} />
                <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
            </Routes>
        </Router>
    );
}

export default App;
/*
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import CreatePossession from './pages/CreatePossessionPage';
import PatrimoinePage from './pages/Patrimoine';
import PossessionList from './pages/Possessions';
import UpdatePossession from './pages/UpdatePossessionPage';

function App() {
    const [possessions, setPossessions] = useState([]);

    useEffect(() => {
        fetch('/possession')
            .then(response => response.json())
            .then(data => setPossessions(data));
    }, []);

    const closePossession = (libelle) => {
        fetch(`/possession/${libelle}/close`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(() => {
                setPossessions(prev => prev.map(possession =>
                    possession.libelle === libelle
                        ? { ...possession, dateFin: new Date().toISOString() }
                        : possession
                ));
            });
    };

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<PossessionsTables />} />
                <Route path="/possession/create" element={<CreatePossession />} />
                <Route path="/possession" element={<PossessionList />} />
                <Route path="/patrimoine" element={<PatrimoinePage />} />
                <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
            </Routes>
        </Router>
    );
}

export default App;*/
