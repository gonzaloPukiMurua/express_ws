import express from 'express';
import {getResults} from '../controllers/results.controllers.js'
const router = express.Router();

router.get('/resultados', getResults);

export default router;