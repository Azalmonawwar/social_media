'use client'
import { createCommentByPostId } from '@/lib/actions/post.action'
import Image from 'next/image'
import React, { FormEvent } from 'react'

const CommentForm = ({user,post}:{user:string,post:string}) => {
    const [comment,setComment] = React.useState<string>('')
    const handleSubmit=async(e:FormEvent)=>{
        e.preventDefault()
        const response = await createCommentByPostId(post,user,comment);
        setComment("")
    }
  return (
    <form className='flex' onSubmit={handleSubmit}>
        <input placeholder="Comment..."
      className="peer h-full w-full border-b border-gray-900 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"  value={comment} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setComment(e.target.value)}/>
   
        <button type='submit' className='text-sm'><Image src={'/icons/send.png'} height={24} width={24} alt={'send'} className='invert'/></button>
    </form>
  )
}

export default CommentForm