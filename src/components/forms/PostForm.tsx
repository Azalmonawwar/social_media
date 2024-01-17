
import { uploadPic } from '@/lib/utils/uploadPic';
import React from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { getUserByToken } from '@/lib/actions/user.action';
import { createPost } from '@/lib/actions/post.action';
import { redirect } from 'next/navigation';

const PostForm =async () => {
  const {data} = await getUserByToken()
  const id = data._id
  
  const create = async (formData: FormData) => {
    'use server'
    const pic = formData.get('image')
    const caption = formData.get('caption')
    const tags = formData.get('tags')
    const location = formData.get('location')
    const image = await uploadPic(pic as File)
    const res = await createPost(id,{ caption, tags, location, image })
    if (res.status) {
      redirect('/')
    }
  };
  return (
    <form action={create} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4'>
        <label htmlFor="Caption">Caption</label>
        <textarea className='bg-dark-secondary text-white p-3 outline-none border-none rounded-md' placeholder='Enter Your Caption' rows={6} id="caption" name='caption' />
      </div>
      <div className='flex flex-col gap-4'>
        <label htmlFor="tags">Tags</label>
        <input className='bg-dark-secondary text-white p-3 outline-none border-none rounded-md' placeholder='Tags' type="text" id="tags" name='tags' />
      </div>

      <div className='flex flex-col gap-4'>
        <label htmlFor="location">Location</label>
        <input className='bg-dark-secondary text-white p-3 outline-none border-none rounded-md' placeholder='location' type="text" id="location" name='location' />
      </div>

      <div className='flex flex-col gap-4'>
        <label htmlFor="image">Image</label>
        <Input className='bg-dark-secondary text-white p-3 outline-none border-none rounded-md'  type="file" id="image" name='image' />
      </div>
      <Button type="submit" className='bg-zinc-600'>Submit</Button>
    </form>
  )
}

export default PostForm