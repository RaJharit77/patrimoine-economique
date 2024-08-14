import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve('backend/data/data.json');
let rawData = fs.readFileSync(dataFilePath);
let data = JSON.parse(rawData);

// Fetch all possessions
export const getPossessions = (req, res) => {
    const possessions = data.find(entry => entry.model === "Patrimoine").data.possessions;
    res.json(possessions);
};

// Create a new possession
export const createPossession = (req, res) => {
    const newPossession = req.body;
    data.find(entry => entry.model === "Patrimoine").data.possessions.push(newPossession);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.status(201).json(newPossession);
};

// Update a possession by libelle
export const updatePossession = (req, res) => {
    const { libelle } = req.params;
    const possession = data.find(entry => entry.model === "Patrimoine").data.possessions.find(p => p.libelle === libelle);
    if (possession) {
        Object.assign(possession, req.body);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json(possession);
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
};

// Close a possession by setting dateFin to the current date
export const closePossession = (req, res) => {
    const { libelle } = req.params;
    const possession = data.find(entry => entry.model === "Patrimoine").data.possessions.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = new Date();
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json(possession);
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
};
