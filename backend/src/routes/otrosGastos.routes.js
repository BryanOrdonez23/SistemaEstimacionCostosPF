import {Router} from 'express';  


import {crearOtrosGastos,actualizarOtrosGastos,getOtroGasto,getOtrosGastos, eliminarOtrosGastos, sumatoriaCostosOtrosGastos} from "../controllers/otrosGastos.controller.js";


const router = Router();

router.get("/otrosGastos/:id", getOtrosGastos);
router.get("/otroGasto/:id", getOtroGasto);
router.post("/guardarOtroGasto/:id", crearOtrosGastos);
router.delete("/eliminarOtroGasto/:id1/:id2", eliminarOtrosGastos);
router.put("/actualizarOtroGasto/:id1/:id2", actualizarOtrosGastos);
router.get("/sumaotroGastos/:id", sumatoriaCostosOtrosGastos);

export default router;