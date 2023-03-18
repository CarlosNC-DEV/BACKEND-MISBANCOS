import { Router } from 'express';
import { crearAsesor, auchAsesor } from '../controllers/asesores.controllers.js';

const router = Router();

router.post("/asesores", crearAsesor);
router.post("/auch/asesores", auchAsesor);


export default router;