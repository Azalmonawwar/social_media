import React from 'react'

const PostStatus2 = ({post,followers,following}:any) => {
  return (
    <div className='md:flex md:gap-8 gap-2 hidden  items-center text-[18px] mt-2'>
    <div className='flex gap-2 items-center'>
      <p className='text-blue-500 '>{post}</p>
      <p>Posts</p>
    </div>
    <div className='flex gap-2 items-center'>
      <p className='text-blue-500 '>{followers?.length}</p>
      <p>Followers</p>
    </div>
    <div className='flex gap-2 items-center'>
      <p className='text-blue-500 '>{following?.length}</p>
      <p>Following</p>
    </div>
  </div>
  )
}

export default PostStatus2