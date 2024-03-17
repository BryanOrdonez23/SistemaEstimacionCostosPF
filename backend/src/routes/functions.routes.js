import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getFunctions,
  createFunctions,
  getFunction,
  updateFunctions,
  deleteFunction,
} from "../controllers/functions.controller.js";
import { validacionCantidad} from "../schemas/datos.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/functions/:id", authRequired, getFunctions);
router.post("/functions/:id", validateSchema(validacionCantidad), authRequired, createFunctions);
router.get("/function/:id", authRequired, getFunction);
router.put("/functions/:id1/:id2", validateSchema(validacionCantidad), authRequired, updateFunctions);
router.delete("/functions/:id1/:id2", authRequired, deleteFunction);
export default router;
