import type { Metadata } from 'next'
import SignupForm from '@/components/forms/SignupForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LoginForm from '@/components/forms/LoginForm'
export const metadata: Metadata = {
  title: 'Login • MetaGram',
  description: 'MetaGram is a social media platform for sharing photos and videos with friends and family.',
}
const page = () => {
  return (
        <div className='flex flex-col sm:gap-4 gap-0'>
        <div className=' xs:w-full sm:w-[300px] lg:w-[400px] md:w-[350px] sm:border-[1px] border-primary rounded-lg'>
          <div className='flex mt-10 mb-2 justify-center'>
            <Image height={125} width={325} src="/icons/logo.png" alt="logo"  className='invert hidden md:block'/>
            <Image height={100} width={250} src="/icons/logo.png" alt="logo"  className='invert md:hidden block'/>
          </div>
          
          <div className=' xs:px-3 sm:px-2 md:px-6 lg:px-8 mb-10 pb-5'>
            <LoginForm/>
          </div>
          
        </div>
        <div className='xs:w-full sm:w-[300px] lg:w-[400px] md:w-[350px] p-5 sm:border-[1px] border-primary rounded-lg'>
        <p className="text-small-regular text-light-2 text-center">
                      Don't have an account?{' '}
                      <Link
                          href="/signup"
                          className="text-blue-500 text-small-semibold ml-1">
                          Sign Up
                      </Link>
                  </p>
        </div>
        </div>
    
  )
}

export default page