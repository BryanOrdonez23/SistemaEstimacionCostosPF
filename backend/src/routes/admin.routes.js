import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { authRequired } from "../middlewares/validateToken.js";
import {guardarFactoresAjuste, getFactoresAjuste} from "../controllers/pf.controller.js";
import {
    login,
    register,
    logout,
    profile,
    verifyToken,
    getAdmins,
    getUserbyName,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
} from "../controllers/admin.controller.js";

import {  getProyects,
    getProyect,
    createProyect,
    updateProyect,
    deleteProyect,
    getAllProyects} from "../controllers/proyect.controller.js";

import {createTipoFuncion, deleteTipoFuncion, getTipoFunciones, getTipoFuncion, updateTipoFuncion} from "../controllers/tiposfunciones.js";

const router = Router();

router.post("/newtiposfunciones", createTipoFuncion);
router.get("/tipofuncion", getTipoFunciones);
router.get("/tipofuncion/:id", getTipoFuncion);
router.put("/tipofuncion/:id", updateTipoFuncion);
router.delete("/deletetipofuncion/:id", deleteTipoFuncion);

router.post("/guardarfactoresajuste", guardarFactoresAjuste);
router.get("/getfactoresajuste", getFactoresAjuste);


router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/verify", verifyToken);
router.get("/admins", getAdmins);
router.get("/userbyname/:name", getUserbyName);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);
router.get("/getUser/:id", getUserById);

//proyect
router.get("/proyectos", getProyects);
router.get("/proyecto/:id", getProyect);
router.put("/deleteproyecto/:id",  deleteProyect);
router.put("/proyecto/:id", updateProyect);
router.get("/allproyectos", getAllProyects);

export default router;