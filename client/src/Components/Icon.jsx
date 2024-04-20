import React from 'react'
import logo from '../assets/logo.jpeg';

export default function Icon() {
  return (
    <div className='flex items-center gap-5'>
      <img src={logo} alt="icon" className='h-[70px] w-[70px] rounded-full' />
      <h1 className='text-xl font-serif'>GEMINI</h1>
    </div>
  )
}
