
import { uploadPic } from '@/lib/utils/uploadPic';
import React from 'react'

const PostForm = () => {
    

    const create =async (formData:FormData) => {
        'use server'
        const image = formData.get('image')
        const picUrl = await uploadPic(image as File)
        console.log(picUrl)

    
        console.log(image)
    };
  return (
    <form action={create}>
        
        <label htmlFor="title">Title</label>
        <input  className='text-black'  type="text" id="title" name='title'  />

        <label htmlFor="content">Content</label>
        <input className='text-black'  type="text" id="content"  name='content'/>

        <label htmlFor="tags">Tags</label>
        <input  className='text-black' type="text" id="tags" name='tags'/>

        <label htmlFor="image">Image</label>
        <input  className='text-black' type="file" id="image"  name='image'/>

        <button type="submit">Submit</button>
    </form>
  )
}

export default PostForm