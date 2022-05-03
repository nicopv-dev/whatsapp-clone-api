import { Router } from "express";
import { createMessage } from "../controllers/message.js";

const router = Router();

// http://localhost:8000/api/messages/new
router.post("/new", createMessage);

export default router;
