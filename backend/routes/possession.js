import express from 'express';
import { closePossession, createPossession, getPossessions, updatePossession } from '../controllers/possessionController.js';

const router = express.Router();

router.get('/', getPossessions);
router.post('/', createPossession);
router.put('/:libelle', updatePossession);
router.put('/:libelle/close', closePossession);

export default router;
