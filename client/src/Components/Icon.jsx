import React from 'react'
import gpt from '../assets/gpt.png';

export default function Icon() {
  return (
    <div className='flex items-center gap-5'>
      <img src={gpt} alt="icon" className='h-[70px] w-[70px]' />
      <h1 className='text-xl'>GEMINI</h1>
    </div>
  )
}
