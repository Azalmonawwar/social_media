"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { logoutUser } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'

const TopBar = () => {
  const logout = () => { 
    const res = logoutUser()
    redirect('/login')
}
  return (
    <section className=" sticky top-0 z-50 md:hidden bg-dark-1 w-full">
    <div className="flex justify-between py-4 px-5">
      <Link href="/" className="flex gap-3 items-center">
        <Image
          src="/icons/logo.png"
          alt="logo"
          width={125}
          height={85}
          className='invert'
        />
      </Link>

      <div className="flex gap-4 items-center">
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={logout}
          >
          <Image src="/icons/logout.svg" alt="logout"  width={24} height={24}/>
        </Button>
        <Link href={`/profile`} className="flex-center gap-3  rounded-full">
          <Image
            src={"/icons/user.svg"}
            alt="profile"
            height={24}
            width={24}
            className=" rounded-full "
          />
        </Link>
      </div>
    </div>
  </section>
  )
}

export default TopBar