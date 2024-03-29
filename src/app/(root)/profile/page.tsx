
import PostStatus2 from '@/components/shared/PostStatus2'
import Posts from '@/components/shared/Posts'
import ProfileStats from '@/components/shared/ProfileStats'
import Wrapper from '@/components/shared/Wrapper'
import { Button } from '@/components/ui/button'
import { getFollowingAndFollowers, getUserByToken } from '@/lib/actions/user.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const { data } = await getUserByToken()
  const followers = await getFollowingAndFollowers(data?._id)
  
  return (
    <Wrapper>
      <div className=' py-5 px-4 xl:w-[60%] w-full mx-auto flex sm:justify-center md:gap-24 gap-5 '>
        <div className='bg-white lg:h-[150px] lg:w-[150px] md:h-[100px] md:w-[100px] h-[80px] w-[80px] rounded-full overflow-hidden '>
          <Image
            src={data?.avatar || "/icons/user.svg"}
            alt={data?.name}
            height={200}
            width={200}
            className='object-contain h-full w-full'
             />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex md:gap-10 gap-2 md:flex-row flex-col md:items-center'>
            <div>
              <p className='text-[18px] '>@{data?.username}</p>
            </div>
            <div className='flex gap-4'>
              <Button>Edit Profile</Button>
              <Button><Link href={'/saved'}>View Saved</Link></Button>
            </div>
          </div>
      <PostStatus2 post={data?.posts?.length} followers={followers?.data?.followers} following={followers?.data?.following}/>
         


          <div className='mt-5 hidden md:block'>
            <h2 className='font-[600]  capitalize mb-2'>{data?.name}</h2>

            <p className='first-letter:capitalize'>
              {data?.bio}
            </p>
          </div>
        </div>

      </div>
      {/* //mobile view  */}
      <div className='md:hidden flex flex-col  py-1 px-4 sm:w-[50%] w-full mx-auto'>
        <h2 className='font-[600]  capitalize mb-2'>{data?.name}</h2>

        <p>
          {data?.bio}
        </p>
      </div>

      <hr className='xl:w-[60%] w-full mx-auto block md:hidden' />

      <ProfileStats post={data?.posts?.length} followers={followers?.data?.followers} following={followers?.data?.following}/>
      <hr className='xl:w-[60%] w-full mx-auto' />
      {/* //mobile view closed  */}
      <div className='w-full'>
        <p className=' sm:mb-10 mb:5 text-center font-bold text-2xl'>Your Posts</p>
        <div className='flex flex-col mx-auto items-center justify-center'>

          <div className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-2 gap-5   items-center '>
            {
              data?.posts?.map((image: { _id: string, image: string }) => {
                return (
                  <Posts image={image} key={image._id} user={data._id}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default page