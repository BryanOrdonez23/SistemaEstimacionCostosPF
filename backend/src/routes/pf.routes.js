import {Router} from 'express';  




import {calcularPuntosDeFuncionsinAjuste, createValorFactoresAjuste, getValorFactoresAjuste, getFunctionPoints} from "../controllers/pf.controller.js";
import {guardarFactoresAjuste, getFactoresAjuste, sumaValorFactoresdeAjuste} from "../controllers/pf.controller.js";

const router = Router();

router.get("/calcularpfsa/:id", calcularPuntosDeFuncionsinAjuste);
router.post("/guardarfactoresajuste/:id", guardarFactoresAjuste);
router.get("/getfactoresajuste/:id", getFactoresAjuste);
router.get("/getvalorfactoresajuste/:id", getValorFactoresAjuste);
router.post("/createvalorfactoresajuste/:id", createValorFactoresAjuste);
router.get("/sumaValorFactoresAjsute/:id", sumaValorFactoresdeAjuste);
router.get("/getPuntosFuncion/:id", getFunctionPoints);
export default router;