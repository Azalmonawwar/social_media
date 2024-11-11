import { Schema, model, models, Document } from "mongoose";

export interface IConversation extends Document {
  members: Array<string>;
  createdAt: Date;
  messages: Array<string>;
  lastMessage: string;
}

const conversationSchema = new Schema({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Conversation =
  models.Conversation ||
  model<IConversation>("Conversation", conversationSchema);

export default Conversation;
