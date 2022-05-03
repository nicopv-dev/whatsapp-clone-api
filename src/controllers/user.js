import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export async function userChats(req, res) {
  const { id } = req.params;

  const chats = await Chat.find({ members: id })
    .populate("members")
    .sort({ createdAt: -1 });

  // found messages for each chat
  const chatsWithMessages = await Promise.all(
    chats.map(async (chat) => {
      const messages = await Message.find({ chat: chat._id });
      return { ...chat._doc, messages };
    })
  );

  return res.status(200).json(chatsWithMessages);
}
