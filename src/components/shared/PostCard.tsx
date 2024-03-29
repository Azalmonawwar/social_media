import { IPost } from '@/lib/types'
import Link from 'next/link'
import React, { Suspense } from 'react'
import Image from 'next/image'
import { timeAgo } from '@/lib/utils'

import Poststatus from './Poststatus'
import { getSaved } from '@/lib/actions/saved.action'
import CommentForm from '../forms/CommentForm'
import Loader from './Loader'
const PostCard = async ({ post, user }: { post: IPost, user: string }) => {
  const saved = await getSaved(user);
  return (
    <>
      <div className="   mx-auto flex flex-col w-full  md:w-[50%] h-[100%] ">
        <div className="flex justify-between items-center mx-2 md:mx-0">
          <div className="flex items-center gap-3 mb-2">
            <Link href={`/profile/${post?.user?._id}`} className="w-12 h-12 rounded-full overflow-hidden bg-white">
              <Image
                height={100}
                width={100}
                src={
                  post.user?.avatar ||
                  "/icons/profile-placeholder.svg"
                }
                alt="creator"
                className='object-contain h-full w-full'
              />
            </Link>

            <div className="flex flex-col ">
              <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold  text-white first-letter:capitalize">
                {post?.user?.name}
              </p>
              <div className="flex justify-center text-xs  items-center gap-2 whitespace-nowrap text-gray-400 ">
                <p >
                  {timeAgo(post?.createdAt)}
                </p>
                •
                <p className="capitalize whitespace-nowrap">
                  {post?.location}
                </p>
              </div>
            </div>
          </div>

          
            

        </div>

        <Link href={`/posts/${post?._id}`} className="">

          <div className={`  overflow-hidden w-full md:h-[500px] md:w-auto mb-5`}>
                <Suspense fallback={<Loader/>}>
            <Image
              width={400}
              height={400}
              src={post?.image || "/icons/profile-placeholder.svg"}
              alt="post image"
              className="   object-contain w-full  md:h-full  "
            />
            </Suspense>
          </div>
        </Link>
        <Poststatus likes={post?.likes?.length} like={post?.likes} saved={saved?.data?.post} postId={post._id} userId={user} />
        <div className="text-gray-300 text-sm mx-2 md:mx-0 mt-4">
          <p className='first-letter:capitalize'>{post?.caption?.slice(0, 60)}...<span className='text-zinc-500'> more</span></p>
          <ul className="flex gap-1 mt-2">
            {post?.tags?.slice(0, 20)
            }...
          </ul>
        </div>

            <CommentForm user={user} post={post?._id}/>
      </div>
    </>
  )
}

export default PostCard