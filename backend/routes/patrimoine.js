import express from 'express';
import { getPatrimoineRange, getPatrimoineValue } from '../controllers/patrimoineController.js';

const router = express.Router();

router.get('/:date', getPatrimoineValue);
router.post('/range', getPatrimoineRange);

export default router;
