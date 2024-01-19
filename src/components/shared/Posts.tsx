'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { deletePostById } from '@/lib/actions/post.action'


const Posts = ({image,user}:any) => {
    const deletePost = async ()=>{
        try {
            const res = await deletePostById(image._id,user);
            console.log(res)
        } catch (error:any) {
            console.log(error.message)
        }
    }
  return (
    <div className='flex flex-col gap-2'>

    <Link key={image._id} href={`/posts/${image._id}`} className='flex flex-col justify-center xl:justify-start sm:h-[13rem]  sm:w-[13rem] xs:h-[150px] xs:w-[150px] h-[110px] w-[110px] lg:w-[180px] lg:h-[180px]  xl:h-[250px] xl:w-[250px]' >
                    <Image
                      src={image.image}
                      alt={image._id}
                      height={300}
                      width={300}
                      className='object-cover sm:h-[13rem]  sm:w-[13rem] xs:h-[150px] xs:w-[150px] h-[110px] w-[110px] lg:w-[180px] lg:h-[180px]  xl:h-[250px] xl:w-[250px]'
                      />
                  </Link>
    <Button variant={'destructive'} onClick={deletePost}>

    <Image
              src={"/icons/delete.svg"}
              alt="edit"
              width={24}
              height={24}
              
            />
    </Button>
    </div>
  )
}

export default Posts