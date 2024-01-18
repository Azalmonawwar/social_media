import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type ImageProps={
    image:{
        _id:string,
        image:string
    }
}
const Card = ({image}:ImageProps) => {
  return (
    <Link key={image._id} href={`/posts/${image._id}`} className='flex justify-center xl:justify-start sm:h-[13rem]  sm:w-[13rem] xs:h-[150px] xs:w-[150px] h-[110px] w-[110px] lg:w-[180px] lg:h-[180px]  xl:h-[250px] xl:w-[250px]' >
                <Image
                src={image.image}
                alt={image._id}
                height={300}
                width={300}
                className='object-cover sm:h-[13rem]  sm:w-[13rem] xs:h-[150px] xs:w-[150px] h-[110px] w-[110px] lg:w-[180px] lg:h-[180px]  xl:h-[250px] xl:w-[250px]' 
                />
              </Link>
  )
}

export default Card