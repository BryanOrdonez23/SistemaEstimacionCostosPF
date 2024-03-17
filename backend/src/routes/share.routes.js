import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createProyectShared,
  getProyectsShared,
  getProyectsSharedByProyect,
  deleteProyectShared,
  getSolicitudesProyectosShared,
  updateStatusProyectShared,
} from "../controllers/shareproyect.controller.js";
const router = Router();

router.post("/share", authRequired, createProyectShared);
router.get("/share", authRequired, getProyectsShared);
router.post("/getProyectsShared", authRequired, getProyectsSharedByProyect);
router.delete("/deleteProyectShared/:id", deleteProyectShared);
router.post("/getSolicitudesProyectosShared", authRequired, getSolicitudesProyectosShared);
router.post("/updateStatusProyectShared", authRequired, updateStatusProyectShared);

export default router;