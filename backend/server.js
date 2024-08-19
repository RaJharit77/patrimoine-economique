import cors from 'cors';
import express from 'express';
import { readFile, writeFile } from '../data/data.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint to get the list of possessions
app.get('/api/possessions', async (req, res) => {
    try {
        const result = await readFile('./data/data.json');
        if (result.status === "OK") {
            res.json(result.data[1].data.possessions);
        } else {
            res.status(500).json({ message: "Error reading data", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Endpoint for possession
app.post('/api/possessions', async (req, res) => {
    try {
        const newPossession = req.body;
        const result = await readFile('./data/data.json');
        
        if (result.status === "OK") {
            const data = result.data;
            data[1].data.possessions.push(newPossession);

            const writeResult = await writeFile('./data/data.json', data);
            if (writeResult.status === "OK") {
                res.status(201).json(newPossession);
            } else {
                res.status(500).json({ message: "Error writing data", error: writeResult.error });
            }
        } else {
            res.status(500).json({ message: "Error reading data", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

//Endpoint to create possession
app.post('/api/possession/create', async (req, res) => {
    const { libelle, valeur, dateDebut, taux } = req.body;

    if (!libelle || !valeur || !dateDebut || !taux) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    try {
        const result = await readFile('./data/data.json');
        if (result.status !== "OK") {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        const data = result.data;
        
        if (!Array.isArray(data) || !data[1] || !data[1].data || !Array.isArray(data[1].data.possessions)) {
            return res.status(500).json({ error: 'Invalid data format' });
        }

        data[1].data.possessions.push({
            libelle,
            valeur,
            dateDebut,
            taux,
            dateFin: null
        });

        const writeResult = await writeFile('./data/data.json', data);
        if (writeResult.status !== "OK") {
            return res.status(500).json({ error: 'Failed to write data' });
        }

        res.status(201).json({ message: 'Possession créée avec succès', possession: req.body });
    } catch (error) {
        console.error('Error during /api/possession/create:', error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Endpoint to update a possession by libelle
app.put('/api/possession/:libelle', async (req, res) => {
    try {
        const { libelle } = req.params;
        const { libelle: newLibelle, dateFin } = req.body;
        const result = await readFile('./data/data.json');
        
        if (result.status === "OK") {
            const data = result.data;
            const possession = data[1].data.possessions.find(p => p.libelle === libelle);
            
            if (possession) {
                possession.libelle = newLibelle || possession.libelle;
                possession.dateFin = dateFin || possession.dateFin;

                const writeResult = await writeFile('./data/data.json', data);
                if (writeResult.status === "OK") {
                    res.status(200).json(possession);
                } else {
                    res.status(500).json({ message: "Error writing data", error: writeResult.error });
                }
            } else {
                res.status(404).json({ message: "Possession not found" });
            }
        } else {
            res.status(500).json({ message: "Error reading data", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Endpoint to close a possession by setting dateFin to the current date
app.put('/api/possession/:libelle/close', async (req, res) => {
    try {
        const { libelle } = req.params;
        const result = await readFile('./data/data.json');

        if (result.status === "OK") {
            const data = result.data;
            const possession = data[1].data.possessions.find(p => p.libelle === libelle);
            
            if (possession) {
                possession.dateFin = new Date().toISOString();

                const writeResult = await writeFile('./data/data.json', data);
                if (writeResult.status === "OK") {
                    res.status(200).json(possession);
                } else {
                    res.status(500).json({ message: "Error writing data", error: writeResult.error });
                }
            } else {
                res.status(404).json({ message: "Possession not found" });
            }
        } else {
            res.status(500).json({ message: "Error reading data", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Endpoint to get the value of patrimoine at a specific date
app.get('/api/patrimoine/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const result = await readFile('./data/data.json');

        if (result.status === "OK") {
            const data = result.data[1].data;
            const patrimoineValue = data.possessions
                .filter(p => !p.dateFin || new Date(p.dateFin) >= new Date(date))
                .reduce((acc, p) => acc + p.valeur, 0);

            res.status(200).json({ date, valeur: patrimoineValue });
        } else {
            res.status(500).json({ message: "Error reading data", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Endpoint to get the value of patrimoine over a range of time
app.post('/api/patrimoine/range', async (req, res) => {
    try {
        const { type, dateDebut, dateFin, jour } = req.body;
        const result = await readFile('./data/data.json');

        if (result.status === "OK") {
            const data = result.data[1].data;
            const dateStart = new Date(dateDebut);
            const dateEnd = new Date(dateFin);
            let patrimoineRange = [];

            for (let d = new Date(dateStart); d <= dateEnd; d.setDate(d.getDate() + (type === 'month' ? 30 : 1))) {
                if (d.getDate() === jour) {
                    const patrimoineValue = data.possessions
                        .filter(p => !p.dateFin || new Date(p.dateFin) >= d)
                        .reduce((acc, p) => acc + p.valeur, 0);
                    patrimoineRange.push({ date: d.toISOString().split('T')[0], valeur: patrimoineValue });
                }
            }

            res.status(200).json(patrimoineRange);
        } else {
            res.status(500).json({ message: "Error reading data", error: result.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
