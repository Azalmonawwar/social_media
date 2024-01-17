'use client'
import { bottombarLinks } from '@/constants';
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';
const Bottombar = () => {
  const pathname = usePathname()
  return (
    <section className="z-50 flex justify-between  w-full fixed bg-zinc-950  bottom-0  rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            href={link.route}
            className={`${isActive && 
               "rounded-[10px] bg-zinc-700 "
            } flex items-center flex-col gap-1 p-2 transition`}>
            <img
              src={link.imgURL}
              alt={link.label}
              width={24}
              height={24}
              className={ "fill-[white]"}
            />

           
          </Link>
        );
      })}
    </section>
  )
}

export default Bottombar