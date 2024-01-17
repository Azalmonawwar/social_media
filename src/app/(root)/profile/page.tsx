import Container from '@/components/shared/Container'
import { getUserByToken } from '@/lib/actions/user.action'
import Image from 'next/image'
import React from 'react'

const page = async () => {
  const { data } = await getUserByToken()
  
  return (
    <Container>
       <h2>{data?.name}</h2>
    </Container>
  )
}

export default page