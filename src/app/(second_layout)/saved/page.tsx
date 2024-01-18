import Card from '@/components/cards/Card'
import Container from '@/components/shared/Container'
import { getSavedPosts } from '@/lib/actions/saved.action'
import { getUserByToken } from '@/lib/actions/user.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async() => {
  const {data} = await getUserByToken()
  const savedPost = await getSavedPosts(data._id)
  
  return (
    <Container>
      <h2 className='text-2xl font-bold'>
        Saved Post
      </h2>
      <div className='grid grid-cols-3 sl:grid:cols-3 xl:grid-cols-4 md:gap-2 sm:gap-1   items-center w-full'>
         {
          savedPost && savedPost?.data?.post?.map((image:{_id:string,image:string})=>{
            return(
              <Card image={image} key={image.image}/>
            )
          })
         }
      </div>
         {
          (savedPost.data ===null || savedPost.data?.post.length === 0)  &&
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
    </Container>
  )
}

export default page