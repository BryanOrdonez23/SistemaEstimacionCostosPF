import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createProyect,
  getProyects
} from "../controllers/shareproyect.controller.js";
const router = Router();

router.post("/share/:id", authRequired, createProyect);
router.get("/share", authRequired, getProyects);

export default router;