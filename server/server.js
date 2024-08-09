import cors from 'cors';
import express from 'express';
import { readFile, writeFile } from '../data/data.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
