import { cn } from '@/lib/utils';
import React from 'react'

interface IMessage {
    message: string;
    user?: boolean;
    time: string;
}

const Message = ({ message, user, time }: IMessage) => {
    return (
        <div className={cn("flex gap-2.5 mx-5", user ? "justify-end" : "justify-start")}>
            <div className="grid mb-2">
                <div className={cn("px-3 py-2  rounded", user ? "bg-indigo-600" : "bg-gray-900")}>
                    <h2 className="text-white text-sm font-normal leading-snug">{message}</h2>
                </div>
                <div className="justify-start items-center inline-flex">
                    <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">{time}</h3>
                </div>
            </div>
        </div>
    )
}

export default Message