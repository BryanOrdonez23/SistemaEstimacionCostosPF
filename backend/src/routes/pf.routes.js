import {Router} from 'express';  

import {calcularPuntosDeFuncionsinAjuste} from "../controllers/pf.controller.js";
import {guardarFactoresAjuste, getFactoresAjuste} from "../controllers/pf.controller.js";

const router = Router();

router.get("/calcularpfsa/:id", calcularPuntosDeFuncionsinAjuste);
router.post("/guardarfactoresajuste", guardarFactoresAjuste);
router.get("/getfactoresajuste", getFactoresAjuste);

export default router;