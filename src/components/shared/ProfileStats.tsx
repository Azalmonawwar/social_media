'use client'

import { useState } from "react"

const ProfileStats = ({post,followers,following}:any) => {
    const [isFollowerOpen,setIsFollowerOpen] = useState(false)
    const [isFollowingOpen,setIsFollowingOpen] = useState(false)
  return (
    <div className='flex  gap-2 md:hidden  items-center justify-around text-xs  w-full'>
        <div className='flex flex-col gap-1 items-center'>
          <p className='font-semibold '>{post}</p>
          <p>Posts</p>
        </div>
        <div className='flex flex-col cursor-pointer gap-1 items-center' onClick={()=>setIsFollowerOpen(!isFollowerOpen)} >
          <p className='font-semibold '>{followers?.length}</p>
          <p>Followers</p>
        </div>
        
        {
            isFollowerOpen && followers?.map((user:any) => (
                <div className='flex flex-col gap-1 items-center'>
                    <p className='font-semibold '>{user?.name}</p>
                </div>
            ))
          }
        <div className='flex flex-col gap-1 items-center'>
          <p className='font-semibold '>{following?.length}</p>
          <p>Following</p>
        </div>
      </div>
  )
}

export default ProfileStats