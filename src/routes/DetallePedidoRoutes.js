import { Router } from "express";
import { DetallePedidoController } from "../controllers/DetallePedidoController.js";

const router = Router();

router.get("/", DetallePedidoController.getAll);

router.get("/:id", DetallePedidoController.getById);

router.post("/", DetallePedidoController.create);

export default router;