'use client';

import { useRouter } from "next/navigation";


interface Ifollower {
    follower: {
        _id: string;
        name: string;
        avatar: string;
    }
}
const Person = ({ follower }: Ifollower) => {
    const router = useRouter()
    const handleConversationCreate = async () => {
        router.push(`/message/${follower._id}`)
    }
    return (
        <li key={follower._id} className='flex items-center gap-4 mb-5 bg-gray-800 p-2 rounded-md cursor-pointer' onClick={handleConversationCreate}>
            <img src={follower.avatar} alt={follower.name} className='w-10 h-10 rounded-full' />
            <p>{follower.name}</p>
        </li>
    )
}

export default Person