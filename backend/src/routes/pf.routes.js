import {Router} from 'express';  
import {calcularPresupuesto, calcularPuntosDeFuncionsinAjuste, createValorFactoresAjuste, getValorFactoresAjuste, getFunctionPoints} from "../controllers/pf.controller.js";
import {guardarFactoresAjuste, getFactoresAjuste, sumaValorFactoresdeAjuste, guardaryActualizarDatosPF} from "../controllers/pf.controller.js";

import { validacionDatosEsfuerzo} from "../schemas/datos.schema.js";
import { createPDF } from "../controllers/pdf.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/calcularpfsa/:id", calcularPuntosDeFuncionsinAjuste);
router.post("/guardarfactoresajuste/:id", guardarFactoresAjuste);
router.get("/getfactoresajuste/:id", getFactoresAjuste);
router.get("/getvalorfactoresajuste/:id", getValorFactoresAjuste);
router.post("/createvalorfactoresajuste/:id", createValorFactoresAjuste);
router.get("/sumaValorFactoresAjsute/:id", sumaValorFactoresdeAjuste);
router.get("/getPuntosFuncion/:id", getFunctionPoints);
router.post("/actualizarDatosPF/:id", validateSchema(validacionDatosEsfuerzo) ,guardaryActualizarDatosPF);
router.get("/calcularpresupuesto/:id", calcularPresupuesto);
router.get("/createPDF", createPDF);
export default router;