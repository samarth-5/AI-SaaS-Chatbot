import React from 'react'
import movie from '../assets/movie.mp4';

export default function Home() {
  return (
    <div>
      <video src={movie} autoPlay muted loop className='w-full h-full static'></video>
      <h1>Building the Next-Level AI</h1>
    </div>
  )
}
