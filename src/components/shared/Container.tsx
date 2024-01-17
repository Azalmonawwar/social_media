import React from 'react'

const Container = (
    { children }:
        { children: React.ReactNode }
) => {
  return (
    <section className=' flex flex-col items-start justify-start gap-10  py-12 md:py-20 mx-2 md:px-8 lg:ml-[270px] md:ml-[100px] md:mr-0 sl:mr-[300px] '>{children}</section>
  )
}

export default Container