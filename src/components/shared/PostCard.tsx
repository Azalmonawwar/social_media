import { IPost } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { timeAgo } from '@/lib/utils'

import Poststatus from './Poststatus'
import { getSaved } from '@/lib/actions/saved.action'
const PostCard = async({post,user}:{post:IPost,user:string}) => {
const saved = await getSaved(user);
  return (
    <>
    <div className="   mx-auto flex flex-col   md:w-[50%] h-[100%] ">
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
            <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold  text-white first-letter:capitalize">
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
        
        <div className={`  items-center overflow-hidden md:h-[500px] md:w-auto mb-5`}>

        <Image
        width={600}
        height={600}
        src={post.image || "/icons/profile-placeholder.svg"}
        alt="post image"
        className="   object-contain w-full  md:h-full  "
        />
        </div>
      </Link>
              <Poststatus likes={post.likes.length} like={post.likes}  saved={saved?.data?.post} postId={post._id} userId={user}/>
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