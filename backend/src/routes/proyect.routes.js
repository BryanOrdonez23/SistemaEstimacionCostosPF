import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getProyects,
  getProyect,
  createProyect,
  updateProyect,
  deleteProyect,
} from "../controllers/proyect.controller.js";
const router = Router();

router.get("/proyectos", authRequired, getProyects);
router.get("/proyecto/:id", authRequired, getProyect);
router.post("/proyecto", authRequired, createProyect);
router.delete("/proyecto/:id", authRequired, deleteProyect);
router.put("/proyecto/:id", authRequired, updateProyect);

export default router;
