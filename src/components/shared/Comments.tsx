'use client'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { deleteCommentByPostId } from '@/lib/actions/post.action'

const Comments = ({ comment, user }: any) => {

  const deleteComment = async ()=>{
    const response = await deleteCommentByPostId(comment.post,user,comment._id)
    console.log(response)
  }
  return (
    <div className="md:mx-auto flex flex-row justify-between mb-1 mx-2 w-full  md:w-[50%] h-[100%]">
      <div className="flex gap-2">
        <div className='h-8 w-8 rounded-full overflow-hidden'>

        <Image src={comment.user.avatar} height={24} width={24} alt={comment.text} className="" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <p className="font-semibold text-sm">{comment.user.name}</p>
            <p className="text-sm">{comment.text}</p>
          </div>

          <div className="flex gap-3">
            <p className="text-xs"> {timeAgo(comment.createdAt)}</p>
          </div>
        </div>

      </div>
      <Button variant={'destructive'} onClick={deleteComment}>

        <Image
          src={"/icons/delete.svg"}
          alt="edit"
          width={24}
          height={24}
          className={comment.user._id===user?'block':'hidden'}
        />
      </Button>
    </div>
  )
}

export default Comments