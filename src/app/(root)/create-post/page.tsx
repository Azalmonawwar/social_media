import PostForm from '@/components/forms/PostForm'
import Container from '@/components/shared/Container'
import React from 'react'

const page = () => {
  return (
    <Container>
      <div className='flex flex-col  w-full  md:w-[450px] lg:w-[550px] mx-auto'>
          <h2 className='md:text-xl text-xl font-semibold mb-4'>Create Post</h2>
          <PostForm />  
      </div>
    </Container>
  )
}

export default page