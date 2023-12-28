import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createProyectShared,
  getProyectsShared
} from "../controllers/shareproyect.controller.js";
const router = Router();

router.post("/share", authRequired, createProyectShared);
router.get("/share", authRequired, getProyectsShared);

export default router;