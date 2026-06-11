import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";

const router = Router();

router.get("/", UsuarioController.getAll);
router.post("/registro", UsuarioController.registro);
router.post("/login", UsuarioController.login);

export default router;