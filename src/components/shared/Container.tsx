import React from 'react'

const Container = (
    { children }:
        { children: React.ReactNode }
) => {
  return (
    <section className=' flex flex-col items-start gap-10  py-10 px-5 md:px-8 lg:ml-[270px] md:ml-[100px] '>{children}</section>
  )
}

export default Container