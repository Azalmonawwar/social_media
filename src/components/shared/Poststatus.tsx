'use client'
import { likePostByPostId } from '@/lib/actions/post.action'
import Image from 'next/image'
import React from 'react'

const Poststatus = ({likes,postId,userId,like}:{likes:number,postId:string,userId:string,like:any}) => {
  const handleLike = async() =>{
    const liked = await likePostByPostId(postId,userId)
    console.log(liked)
  }
  const isLiked = like.includes(userId)
  
  return (
    <div
    className={`flex justify-between items-center z-20 mx-2 md:mx-0 `}>
    <div className="flex gap-2 mr-5">
      <Image
        src={ isLiked?
             "/icons/liked.svg"
             :
             "/icons/like.svg"
        }
        alt="like"
        width={20}
        height={20}
        onClick={handleLike}
        className="cursor-pointer"
      />
      <p className="small-medium lg:base-medium">{likes}</p>
    </div>

    <div className="flex gap-2">
      <Image
        src={"/icons/save.svg"}
        alt="share"
        width={20}
        height={20}
        className="cursor-pointer"
        
      />
    </div>
  </div>
  )
}

export default Poststatus