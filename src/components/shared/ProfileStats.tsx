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
        
        {isFollowerOpen && <div className='flex absolute flex-col gap-1 items-center overflow-y-scroll h-[50%] w-[70%] bg-gray-900 rounded-lg p-4'>
          <p className="absolute top-0 right-0 p-4 cursor-pointer" onClick={()=>setIsFollowerOpen(!isFollowerOpen)}>X</p>
        {
             followers?.map((user:any) => (
              <>
                    <p className='font-semibold  py-2 text-base'>{user?.name}</p>
                    </>
            ))
          }
                </div>
        }
        {isFollowingOpen && <div className='flex absolute flex-col gap-1 items-center overflow-y-scroll h-[50%] w-[70%] bg-gray-900 rounded-lg p-4'>
          <p className="absolute top-0 right-0 p-4 cursor-pointer" onClick={()=>setIsFollowingOpen(!isFollowingOpen)}>X</p>
        {
             following?.map((user:any) => (
              <>
                    <p className='font-semibold  py-2 text-base'>{user?.name}</p>
                    </>
            ))
          }
                </div>
        }
        <div className='flex flex-col gap-1 items-center' onClick={()=>setIsFollowingOpen(!isFollowingOpen)}>
          <p className='font-semibold '>{following?.length}</p>
          <p>Following</p>
          
        </div>
      </div>
  )
}

export default ProfileStats