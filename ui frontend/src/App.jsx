import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PossessionsTable from './components/PossessionsTables';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PossessionsTable />} />
      </Routes>
    </Router>
  );
}

export default App;
