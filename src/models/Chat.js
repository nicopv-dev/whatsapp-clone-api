import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const ChatSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    typeChat: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default models.Chat || model("Chat", ChatSchema);
