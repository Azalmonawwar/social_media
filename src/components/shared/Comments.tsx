import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const Comments = ({comment}:any) => {
  return (
    <div className="mx-auto flex flex-col   md:w-[50%] h-[100%]">
        <div className="flex gap-2">
          
          <Image src={comment.user.avatar} height={24} width={24} alt={comment.text} className="h-8 w-8 rounded-full" / >
          
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
      </div>
  )
}

export default Comments