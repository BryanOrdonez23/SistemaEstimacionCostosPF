import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
  getUserById,
  changePassword,
  updateUser,
  updateUserwoPassword,
  mostrar
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, cambiodatosSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/verify", verifyToken);
router.post("/getUser", authRequired, getUserById);
router.put("/changePassword", authRequired, changePassword);
router.put("/updateUser", authRequired, updateUser);
router.put("/updateUserwoPassword",validateSchema(cambiodatosSchema), authRequired, updateUserwoPassword);
router.get("/prueba",   mostrar);
export default router;
