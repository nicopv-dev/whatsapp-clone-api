import { Router } from "express";
import { createChat, chatMessages } from "../controllers/chat.js";

const router = Router();

// http://localhost:8000/api/chats/new
router.post("/new", createChat);
// messages de un chat, by chat ID
router.get("/:id/messages", chatMessages);

export default router;
