"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { createMessage } from "@/lib/actions/chat.action";

interface IMessageInput {
    conversationId: string;
    userId: string;
}

const MessageInput: React.FC<IMessageInput> = ({
    conversationId, userId
}) => {

    const [message, setMessage] = useState('');


    const sendMessage = async () => {

        const response = await createMessage({
            conversationId,
            user: userId,
            content: message
        });
        setMessage("")
        console.log(response)
    }

    return (
        <div className="relative w-full">
            <input
                type="text"
                name="message"
                className=" text-black
          font-light
          py-3
          px-5
          bg-neutral-100
          w-[90%]
          rounded-full
          focus:outline-none
        "
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage} className="py-6
          px-6 rounded-full">Send</Button>
        </div>
    );
}

export default MessageInput;