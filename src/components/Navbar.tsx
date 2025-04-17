'use client'
import React, { useEffect, useState } from 'react'
import Search from './Search'
import { LuMessageSquareMore } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { SidebarTrigger } from './ui/sidebar';
import Link from 'next/link';
import { useProfile } from '@/context/ProfileContext';

const Navbar = () => {
  const { user } = useProfile();

  return (
    <header className='bg-[#121213] w-full h-[3.5rem] sticky top-0 z-50 flex items-center justify-between px-5 max-sm:px-3 border-b border-[#333]'>
      <div className='flex justify-between h-full items-center'>
        <SidebarTrigger className='text-white' />
      </div>

      <Search />

      <div className='flex gap-4 max-sm:gap-2 h-[100%] items-center text-white'>
        <LuMessageSquareMore className='text-[1.7rem] max-sm:text-[1.5rem]' />
        {user ? (
          <Link href={'/Profile'}>
            <CgProfile className='text-[1.7rem] max-sm:text-[1.4rem]' />
          </Link>
        ) : (
          <Link href={'/Login'}>
            <CgProfile className='text-[1.7rem] max-sm:text-[1.4rem]' />
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar