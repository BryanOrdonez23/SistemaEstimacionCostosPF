import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createProyectShared,
  getProyectsShared,
  getProyectsSharedByProyect,
  deleteProyectShared
} from "../controllers/shareproyect.controller.js";
const router = Router();

router.post("/share", authRequired, createProyectShared);
router.get("/share", authRequired, getProyectsShared);
router.post("/getProyectsShared", authRequired, getProyectsSharedByProyect);
router.delete("/deleteProyectShared/:id", authRequired, deleteProyectShared);


export default router;