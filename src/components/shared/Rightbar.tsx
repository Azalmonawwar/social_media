import { getUserByToken } from '@/lib/actions/user.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Rightbar = async () => {
  const { data } = await getUserByToken()
  
  return (
    <section className='fixed top-0 right-0 lg:hidden px-6 py-10 flex-col justify-between hidden lg:w-[340px] sl:flex md:hidden bg-zinc-950 h-screen'>
      <div>


        <div className="flex items-center gap-3 mb-5">
          <Link href={`/profile/${data?._id}`} className="w-12 lg:h-12 rounded-full bg-white"  >
            <Image
              height={100}
              width={100}
              src={
                data?.avatar ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className='object-contain h-full w-full'
            />
          </Link>

          <div className="flex flex-col ">
            <p className="text-[16px] capitalize font-medium leading-[140%] lg:text-[18px] lg:font-bold  text-white">
              {data?.name}
            </p>

          </div>
        </div>


        <div className=''>
          <h2 className='text-xl font-semibold'>Top Creators</h2>
            <div className='flex  flex-col  gap-4'>
              <Link href={`/profile/${data?._id}`} className='flex rounded-full items-center gap-4'>
                <Image
                  height={100}
                  width={100}
                  src={
                    data?.avatar ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-12 lg:h-12 rounded-full"
                />
                <div className="flex">
                  <p className="text-[16px]  text-white">
                    {data?.name}
                  </p>

                </div>
              </Link>
            </div>
        </div>
      </div>
    </section>
    
  )
}

export default Rightbar