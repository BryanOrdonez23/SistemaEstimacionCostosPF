import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getFunctions,
  createFunctions,
  getFunction,
  updateFunctions,
  deleteFunction,
} from "../controllers/functions.controller.js";

const router = Router();

router.get("/functions/:id", authRequired, getFunctions);
router.post("/functions/:id", authRequired, createFunctions);
router.get("/function/:id", authRequired, getFunction);
router.put("/functions/:id1/:id2", authRequired, updateFunctions);
router.delete("/functions/:id1/:id2", authRequired, deleteFunction);
export default router;
