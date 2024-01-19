import OnboardForm from '@/components/forms/OnboardForm'
import { getUserByToken } from '@/lib/actions/user.action'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'
export const metadata: Metadata = {
  title: 'Onboard • Metagram',
  description: 'MetaGram is a social media platform for sharing photos and videos with friends and family.',
}
const page = async() => {
  const {data} = await getUserByToken()
  if(data?.onboarding){
    redirect('/')
  }
  // console.log(data.email)
  return (
    <div className='my-auto sm:my-0'>
    <p className='text-lg md:text-2xl mb-5 text-center'>Please Complete you profile</p>
    <OnboardForm  email={data?.email}/>
    </div>
  )
}

export default page