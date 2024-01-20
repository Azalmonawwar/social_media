import React from 'react'

const Container = (
    { children }:
        { children: React.ReactNode }
) => {
  return (
    <section className=' flex flex-col items-start  justify-start md:gap-10 gap-2 py-2 md:py-5 mb-[100px] md:mx-2 md:px-8 lg:ml-[270px] md:ml-[100px]  md:mr-[300px] '>{children}</section>
  )
}

export default Container