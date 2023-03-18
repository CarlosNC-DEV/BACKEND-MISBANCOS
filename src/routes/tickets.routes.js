import { Router } from "express";
import {
  crearTiket,
  atenderTicket,
  terminarAtencion
} from "../controllers/tickets.controllers.js";

const router = Router();

router.post("/usuarios", crearTiket);
router.put("/atender/:id", atenderTicket);
router.put("/terminarAtencion/:id", terminarAtencion);

export default router;
