import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getProyects,
  getProyect,
  createProyect,
  updateProyect,
  deleteProyect,
  getAllProyects
} from "../controllers/proyect.controller.js";
const router = Router();

router.get("/proyectos", authRequired, getProyects);
router.get("/proyecto/:id", authRequired, getProyect);
router.post("/proyecto", authRequired, createProyect);
router.put("/deleteproyecto/:id", authRequired, deleteProyect);
router.put("/proyecto/:id", authRequired, updateProyect);
router.get("/allproyectos", getAllProyects);

export default router;
