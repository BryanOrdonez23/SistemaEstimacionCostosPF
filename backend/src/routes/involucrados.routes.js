import {Router} from 'express';  


import {contarInvolucrados, promedioSueldosInvolucrados, sumatoriaCostosInvolucrados, crearInvolucrado, getInvolucrados, eliminarInvolucrado, getInvolucrado,  actualizarInvolucrado} from "../controllers/involucrados.controller.js";

import { involucradoControl} from "../schemas/datos.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/involucrados/:id", getInvolucrados);
router.get("/involucrado/:id", getInvolucrado);
router.post("/guardarInvolucrado/:id", validateSchema(involucradoControl), crearInvolucrado);
router.delete("/eliminarInvolucrado/:id1/:id2", eliminarInvolucrado);
router.put("/actualizarInvolucrado/:id1/:id2", validateSchema(involucradoControl), actualizarInvolucrado);

router.get("/sumaInvolucrados/:id", sumatoriaCostosInvolucrados);
router.get("/promedioSueldosInvolucrados/:id/", promedioSueldosInvolucrados);
router.get("/contarInvolucrados/:id", contarInvolucrados);

export default router;