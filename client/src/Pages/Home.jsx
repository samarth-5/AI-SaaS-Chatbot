import React from 'react';
import movie from '../assets/movie.mp4';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='bg-black h-screen relative'> 
      <video className='videoTag absolute inset-0 w-full h-full' autoPlay loop muted>
        <source src={movie} type='video/mp4' />
      </video>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white pb-20 font-serif">
        <div className="text-[30px] md:text-[50px] lg:text-[80px]">
          Building the Next-Gen AI
        </div>
        <div className="text-[50px] md:text-[80px] lg:text-[100px] hover:text-[120px] transition-all duration-300">
          GEMINI
        </div>
        <Link to='/chat'>
          <Button pill gradientDuoTone='purpleToBlue' size='xl' className='flex items-center font-sans'>
             Try it now 
          </Button>
        </Link>
        <p className='flex items-center absolute bottom-20'>Made with &hearts; by Samarth</p>
      </div>
    </div>
  );
}
