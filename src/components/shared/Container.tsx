import React from 'react'

const Container = (
    { children }:
        { children: React.ReactNode }
) => {
  return (
    <section className=' flex flex-col flex-1 items-center gap-10  py-10 px-5 md:px-8 lg:p-14 '>{children}</section>
  )
}

export default Container