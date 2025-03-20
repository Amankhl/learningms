import React from 'react'
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className='flex items-center gap-2 bg-white w-[30%] max-sm:w-[50%] h-[70%] pl-2 py-1 rounded-3xl'>
        <CiSearch className='text-[1.3rem]'/>
        <input type="text" className='outline-none w-[80%]' placeholder='Search courses'/>
    </div>
  )
}

export default Search