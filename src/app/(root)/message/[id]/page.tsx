import Chats from '@/components/shared/Chats';
import MessageInput from '@/components/shared/MessageInput';
import { getConversation } from '@/lib/actions/chat.action';
import { getUserByToken } from '@/lib/actions/user.action'
import Image from 'next/image';
import React from 'react'

const page = async ({ params }) => {

    const { data } = await getUserByToken();
    const { conversations } = await getConversation(params.id)
    //messages from conversation 


    return (
        <div className='md:h-screen w-full pt-[60px] ml-[300px]'>
            <div className='flex gap-4 items-center mb-10 w-full '>
                <Image height={48} width={48} className='rounded-full' src={"/icons/chat.svg"} alt='hello' />
                <h2>Rathin</h2>
            </div>
            <div className=''>
                <Chats user={data?._id!} conversationId={conversations?._id!} initialMessages={conversations} />
                <div className='fixed flex justify-between bottom-0 w-[60%]  mb-4 text-black mr-[30px]'>
                    <MessageInput conversationId={params.id} userId={data?._id!} />
                </div>
            </div>
        </div>
    )
}

export default page