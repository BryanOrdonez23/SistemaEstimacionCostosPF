import { Router } from "express";

import {createTipoFuncion, getTipoFunciones} from "../controllers/tiposfunciones.js";
import {guardarFactoresAjuste, getFactoresAjuste} from "../controllers/pf.controller.js";

const router = Router();

router.post("/newtiposfunciones", createTipoFuncion);
router.get("/tipofuncion", getTipoFunciones);
router.post("/guardarfactoresajuste", guardarFactoresAjuste);
router.get("/getfactoresajuste", getFactoresAjuste);

export default router;