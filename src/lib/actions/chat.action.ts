"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db/connect";
import Conversation from "../db/models/conversation.model";
import Message from "../db/models/message.model";
import PusherServer from "pusher";
const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: "ap2",
  useTLS: true,
});
export const createConversation = async ({ userId, followingId }) => {
  try {
    await connectToDatabase();
    const existingConversation = await Conversation.findOne({
      $or: [
        { members: { $all: [userId, followingId] } },
        { members: { $all: [followingId, userId] } },
      ],
    });

    if (existingConversation) {
      const data = {
        message: "Conversation already exists",
        newConversation: existingConversation,
      };
      return JSON.parse(JSON.stringify(data));
    }
    const newConversation = new Conversation({
      members: [userId, followingId],
    });
    await newConversation.save();
    const data = {
      message: "Conversation created successfully",
      newConversation,
    };
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    const message = {
      message: "Error creating conversation",
      error,
    };
    return JSON.parse(JSON.stringify(message));
  }
};

export const getConversation = async (conversationId: string) => {
  try {
    await connectToDatabase();
    const conversations = await Conversation.findById(conversationId)
      .populate({ path: "members", model: "User" })
      .populate({ path: "messages", model: "Message" });

    const data = {
      message: "Conversations retrieved successfully",
      conversations,
    };
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    const message = {
      message: "Error retrieving conversations",
      error,
    };
    return JSON.parse(JSON.stringify(message));
  }
};

export const createMessage = async ({ conversationId, user, content }) => {
  try {
    await connectToDatabase();
    const newMessage = await Message.create({
      conversationId,
      user,
      content,
    });

    const data = {
      message: "Message created successfully",
      newMessage,
    };
    const conversation = await Conversation.findOneAndUpdate(
      { _id: conversationId },
      { lastMessage: newMessage._id },
      { new: true }
    );
    conversation.messages.push(newMessage._id);
    await conversation.save();
    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    revalidatePath("/message");
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    const message = {
      message: "Error creating message",
      error,
    };
    return JSON.parse(JSON.stringify(message));
  }
};
