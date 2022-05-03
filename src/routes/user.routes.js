import { Router } from "express";
import { userChats } from "../controllers/user.js";

const router = Router();

router.get("/:id/chats", userChats);

export default router;
