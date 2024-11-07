import React from 'react'
import Wrapper from './Wrapper'
import { getFollowers, getFollowingAndFollowers, getUserByToken } from '@/lib/actions/user.action'
import Person from './Person'

const MessageList = async () => {
    const { data } = await getUserByToken()
    const followers = await getFollowingAndFollowers(data._id);
    return (
        <Wrapper>
            <h2 className='text-2xl font-bold'>
                Messages
            </h2>
            <ul className='h-full w-[240px] '>
                {
                    followers?.data?.following.map((follower: any) => (
                        <Person follower={follower} key={follower._id} />
                    ))
                }

            </ul>

        </Wrapper>
    )
}

export default MessageList