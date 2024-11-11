'use client';

import { createConversation } from "@/lib/actions/chat.action";
import { useRouter } from "next/navigation";


interface Ifollower {
    follower: {
        _id: string;
        name: string;
        avatar: string;
    },
    user: {
        _id: string
    }
}
const Person = ({ follower, user }: Ifollower) => {
    const router = useRouter()
    const handleConversationCreate = async () => {
        const findOrCreateConversation = await createConversation({ userId: user, followingId: follower._id })
        console.log(findOrCreateConversation)
        router.push(`/message/${findOrCreateConversation.newConversation?._id}`);
    }
    return (
        <li key={follower._id} className='flex items-center gap-4 mb-5 bg-gray-800 p-2 rounded-md cursor-pointer' onClick={handleConversationCreate}>
            <img src={follower.avatar} alt={follower.name} className='w-10 h-10 rounded-full' />
            <p>{follower.name}</p>
        </li>
    )
}

export default Person