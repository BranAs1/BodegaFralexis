import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController.js";

const router = Router();

router.get("/", PedidoController.getAll);

router.get("/:id", PedidoController.getById);

router.post("/", PedidoController.create);

export default router;