import { getUserById } from '@/lib/actions/user.action'
import React from 'react'

const page =async ({params}:any) => {
    const {id} = params
    const {data} = await getUserById(id)
    console.log(data)
  return (
    <div>page</div>
  )
}

export default page