import { Router } from "express";
import { MetodoPagoController } from "../controllers/MetodoPagoController.js";

const router = Router();

router.get("/", MetodoPagoController.getAll);
router.get("/:id", MetodoPagoController.getById);
router.post("/", MetodoPagoController.create);

export default router;