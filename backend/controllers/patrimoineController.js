import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve('backend/data/data.json');
let rawData = fs.readFileSync(dataFilePath);
let data = JSON.parse(rawData);

// Get patrimoine value on a specific date
export const getPatrimoineValue = (req, res) => {
    const { date } = req.params;
    const patrimoine = calculatePatrimoineValue(new Date(date));
    res.json({ date, valeur: patrimoine });
};

// Get patrimoine value over a range
export const getPatrimoineRange = (req, res) => {
    const { dateDebut, dateFin, jour, type } = req.body;
    // Logic to calculate patrimoine value over range
    const patrimoineRange = calculatePatrimoineOverRange(new Date(dateDebut), new Date(dateFin), jour, type);
    res.json({ dateDebut, dateFin, patrimoineRange });
};

const calculatePatrimoineValue = (date) => {
    // Logic to calculate patrimoine value
    return 100000; // example value
};

const calculatePatrimoineOverRange = (dateDebut, dateFin, jour, type) => {
    // Logic to calculate patrimoine value over a range
    return [
        { date: dateDebut, valeur: 100000 },
        { date: dateFin, valeur: 150000 }
    ]; // example range
};
