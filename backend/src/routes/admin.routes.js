import { Router } from "express";

import {createTipoFuncion, getTipoFunciones} from "../controllers/tiposfunciones.js";

const router = Router();

router.post("/newtiposfunciones", createTipoFuncion);
router.get("/tipofuncion", getTipoFunciones);

export default router;