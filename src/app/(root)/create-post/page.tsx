import PostForm from '@/components/forms/PostForm'
import Wrapper from '@/components/shared/Wrapper'
import React from 'react'

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