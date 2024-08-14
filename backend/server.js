import cors from 'cors';
import express from 'express';
import patrimoineRoutes from './routes/patrimoine.js';
import possessionRoutes from './routes/possession.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/possessions', possessionRoutes);
app.use('/api/patrimoine', patrimoineRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
/**
import express from 'express';
import possessionRoutes from './routes/possession.js';
import patrimoineRoutes from './routes/patrimoine.js';

const app = express();
app.use(express.json());

app.use('/possession', possessionRoutes);
app.use('/patrimoine', patrimoineRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 */