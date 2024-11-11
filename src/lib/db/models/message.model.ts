import { Schema, model, models, Document } from "mongoose";

export interface IConversation extends Document {
  user: string;
  content: string;
  conservationId: string;
  sendAt: Date;
}

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  conservationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
  sendAt: {
    type: Date,
    default: Date.now,
  },
});

const Message =
  models.Message || model<IConversation>("Message", messageSchema);

export default Message;
