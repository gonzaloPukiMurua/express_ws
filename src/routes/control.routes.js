import express from 'express';
import {getControls} from '../controllers/control.controllers.js'
const router = express.Router();

router.get('/control', getControls);

export default router;