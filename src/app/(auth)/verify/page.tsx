import { Button } from '@/components/ui/button'
import { verifyUser } from '@/lib/actions/user.action'
import Link from 'next/link'
import React from 'react'

const page =async ({searchParams}:any) => {
    const {token} = searchParams
  const verify = await verifyUser(token)

  return (
    <div className = 'flex flex-col gap-4 '>
      <p className="text-xl ">{verify.message}</p>
      <Button variant={'secondary'} >
        <Link href="/login">Login</Link>
      </Button>
    </div>
  )
}

export default page