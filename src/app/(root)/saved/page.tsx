import Card from '@/components/cards/Card'
import Container from '@/components/shared/Container'
import Wrapper from '@/components/shared/Wrapper'
import { getSavedPosts } from '@/lib/actions/saved.action'
import { getUserByToken } from '@/lib/actions/user.action'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
export const metadata: Metadata = {
  title: 'Saved Post • Metagram',
  description: 'MetaGram is a social media platform for sharing photos and videos with friends and family.',
}
const page = async() => {
  const {data} = await getUserByToken()
  const savedPost = await getSavedPosts(data?._id)
  
  return (
    <Wrapper>
      <h2 className='text-2xl font-bold'>
        Saved Post
      </h2>
      <div className='flex flex-col mx-auto items-center justify-center'>

      <div className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-2 gap-5   items-center '>
         {
           savedPost && savedPost?.data?.post?.map((image:{_id:string,image:string})=>{
             return(
               <Card image={image} key={image.image}/>
               )
              })
            }
      </div>
            </div>
         {
          (savedPost?.data ===null || savedPost?.data?.post.length === 0)  &&
          <div className='self-center sm:h-[400px] h-[350px] text-2xl font-semibold flex flex-col gap-2 items-center justify-center'>
            <Image 
            src={'/icons/save.svg'}
            height={50}
            width={50}
            alt='save'
            />
            Nothing saved yet
            <p className='text-center text-base font-normal text-gray-400'>All the post and items you've saved will<br/>show up here</p>
          </div>
         }
    </Wrapper>
  )
}

export default page