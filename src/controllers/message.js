import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import mongoose from "mongoose";

export async function createMessage(req, res) {
  try {
    const { text, sender, chat } = req.body;

    const chatFound = await Chat.findById({ _id: chat });

    if (!chatFound) return res.status(404).json({ message: "Chat not found" });

    const newMessage = new Message({
      text,
      sender,
      chat,
    });

    const messageSaved = await newMessage.save();

    return res.status(201).json(messageSaved);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
