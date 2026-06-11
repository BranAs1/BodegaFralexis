import { Router } from "express";
import { ChatbotController } from "../controllers/ChatbotController.js";

const router = Router();

router.post("/", ChatbotController.responder);

export default router;