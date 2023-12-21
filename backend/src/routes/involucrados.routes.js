import {Router} from 'express';  


import {crearInvolucrado, getInvolucrados, eliminarInvolucrado, getInvolucrado,  actualizarInvolucrado} from "../controllers/involucrados.controller.js";


const router = Router();

router.get("/involucrados/:id", getInvolucrados);
router.get("/involucrado/:id", getInvolucrado);
router.post("/guardarInvolucrado/:id", crearInvolucrado);
router.delete("/eliminarInvolucrado/:id1/:id2", eliminarInvolucrado);
router.put("/actualizarInvolucrado/:id1/:id2", actualizarInvolucrado);

export default router;