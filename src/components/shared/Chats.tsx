"use client"
import React, { useEffect, useState } from 'react'
import Message from './Message';
import { getConversation } from '@/lib/actions/chat.action';
import { pusherClient } from '@/lib/pusher';

interface IChats {
    user: any,
    initialMessages: any,
    conversationId: string
}

const Chats: React.FC<IChats> = ({ user, initialMessages, conversationId }) => {

    const [message, setMessage] = useState<any>(initialMessages.messages)

    useEffect(() => {

        pusherClient.subscribe(conversationId)
        pusherClient.bind("messages:new", (data: any) => {
            setMessage((prev: any) => [...prev, data])
        })
        pusherClient.bind("conversation:new", (data: any) => {
            console.log(data)
        })
        // console.log(message)
        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind("messages:new")
            pusherClient.unbind("conversation:new")
        }

    }, [conversationId])
    return (
        <>
            <div className="w-full h-[560px]  overflow-y-scroll">

                {
                    message?.map((item, index) => (
                        <Message key={index} user={user === item?.user} message={item.content} time={item.sendAt} />
                    ))
                }
            </div>
        </>
    )
}

export default Chats;