import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    chat: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Chat",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default models.Message || model("Message", MessageSchema);
