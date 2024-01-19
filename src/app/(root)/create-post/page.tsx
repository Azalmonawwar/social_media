import PostForm from '@/components/forms/PostForm'
import Wrapper from '@/components/shared/Wrapper'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Create-post • Metagram',
  description: 'MetaGram is a social media platform for sharing photos and videos with friends and family.',
}
const page = () => {
  return (
    <Wrapper>
      <div className='flex flex-col  w-full  md:w-[450px] lg:w-[550px] mx-auto'>
          <h2 className='md:text-xl text-xl font-semibold mb-4'>Create Post</h2>
          <PostForm/>
          
      </div>
    </Wrapper>
  )
}

export default page