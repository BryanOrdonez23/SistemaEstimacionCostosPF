import {Router} from 'express';  

import {calcularPuntosDeFuncionsinAjuste} from "../controllers/pf.controller.js";

const router = Router();

router.get("/calcularpfsa/:id", calcularPuntosDeFuncionsinAjuste);

export default router;