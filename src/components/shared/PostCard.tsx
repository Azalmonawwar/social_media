import { IPost } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { timeAgo } from '@/lib/utils'

import Poststatus from './Poststatus'
const PostCard = ({post,user}:{post:IPost,user:string}) => {
  // console.log(post.likes)
  return (
    <>
    <div className="   mx-auto flex flex-col   sl:w-[50%] h-[100%] ">
      <div className="flex justify-between items-center mx-2 md:mx-0">
        <div className="flex items-center gap-3 mb-2">
          <Link href={`/profile/${post.user._id}`}>
            <Image
                height={100}
                width={100}
              src={
                post.user?.avatar ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col ">
            <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold  text-white">
              {post.user.name}
            </p>
            <div className="flex justify-center text-xs  items-center gap-2 whitespace-nowrap text-gray-400 ">
              <p >
                {timeAgo(post.createdAt)}
              </p>
              •
              <p className="capitalize whitespace-nowrap">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={`/update-post/${post._id}`}
          className={`${user !== post.user._id && "hidden"}`}>
          <Image
            src={"/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link href={`/posts/${post._id}`} className="">
        
        <div className={` flex items-center overflow-hidden  w-full mb-5`}>

        <Image
        width={600}
        height={600}
        src={post.image || "/icons/profile-placeholder.svg"}
        alt="post image"
        className="   object-fill    "
        />
        </div>
      </Link>
              <Poststatus likes={post.likes.length} like={post.likes}  postId={post._id} userId={user}/>
        <div className="text-gray-300 text-sm mx-2 md:mx-0 mt-4">
          <p className='first-letter:capitalize'>{post.caption.slice(0,60)}...<span className='text-zinc-500'> more</span></p>
          <ul className="flex gap-1 mt-2">
            {post.tags.slice(0,20)
            }...
          </ul>
        </div>

      
    </div>
      </>
  )
}

export default PostCard