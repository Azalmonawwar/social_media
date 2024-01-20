import React from 'react'

const Wrapper = (
    { children }:
        { children: React.ReactNode }
) => {
  return (
    <section className=' flex flex-col items-start justify-start gap-10   md:py-20 mx-2 md:px-8 lg:ml-[270px] md:ml-[100px] md:mr-0  mb-[100px] pb-4'>{children}</section>
  )
}

export default Wrapper