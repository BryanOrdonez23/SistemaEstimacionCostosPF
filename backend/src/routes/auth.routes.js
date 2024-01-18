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
  updateUserwoPassword
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/verify", verifyToken);
router.get("/getUser/:id", getUserById);
router.put("/changePassword", authRequired, changePassword);
router.put("/updateUser", authRequired, updateUser);
router.put("/updateUserwoPassword", authRequired, updateUserwoPassword);
export default router;
