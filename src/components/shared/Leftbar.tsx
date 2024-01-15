import { sidebarLinks } from '@/constants';
import Link from 'next/link'
import React from 'react'
import { Fira_Sans } from 'next/font/google';
import { Button } from '../ui/button';
import Image from 'next/image';

const fira = Fira_Sans({ weight: ["400", "500", "600", "700"], subsets: ['latin'] })
const Leftbar = () => {
    return (
        <nav className='absolute top-0 left-0 md:flex px-6 py-10 flex-col justify-between hidden lg:w-[270px] md:w-[100px] bg-primary h-screen'>
            <div className="flex flex-col gap-11">
                <Link href="/" className="flex gap-3 items-center md:justify-center lg:justify-start">
                    <Image src={'/icons/home.svg'} width={32} height={32} alt="logo" />
                    <p className={`text-2xl font-bold tracking-wider hidden lg:block ${fira.className}`}>Metagram</p>
                </Link>
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: any) => {

                        return (
                            <li
                                key={link.label}
                                className={` rounded-lg text-base leading-[140%] hover:bg-blue-400 hover:text-white transition group `}>
                                <Link
                                    href={link.route}
                                    className="flex gap-4 items-center p-4">
                                    <Image
                                        width={32}
                                        height={32}
                                        src={link.imgURL}
                                        alt={link.label}
                                        className={` lg:w-[24px]`}
                                    />
                                    <span className='md:hidden lg:block hidden'>{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                
            </div>
            <Button
                    variant="ghost"
                    
                    className="mt-auto  rounded-lg  leading-[140%] p-4 hover:bg-tertiary hover:text-dark-secondary transition flex justify-start gap-5"
                >
                    <Image height={24} width={24} src="/icons/logout.svg" alt="logout" />
                    <p className="text-base md:hidden lg:block">Logout</p>
                </Button>
        </nav>
    )
}

export default Leftbar