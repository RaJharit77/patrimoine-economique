const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes for Possession
app.get('/possession', (req, res) => {
  // Code to get the list of possessions
});

app.post('/possession', (req, res) => {
  // Code to create a new possession
});

app.put('/possession/:libelle', (req, res) => {
  // Code to update possession by libelle
});

app.patch('/possession/:libelle/close', (req, res) => {
  // Code to close a possession
});

// Routes for Patrimoine
app.get('/patrimoine/:date', (req, res) => {
  // Code to get valeur patrimoine on a specific date
});

app.post('/patrimoine/range', (req, res) => {
  // Code to get valeur patrimoine range
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
