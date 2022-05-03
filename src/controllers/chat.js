import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export async function createChat(req, res) {
  const { members, typeChat } = req.body;

  const newChat = new Chat({
    members,
    typeChat,
  });

  const chatSaved = await newChat.save();

  return res.status(201).json(chatSaved);
}

export async function chatMessages(req, res) {
  const { id } = req.params;

  const messages = await Message.find({ chat: id }).populate("sender");

  return res.status(200).json(messages);
}
