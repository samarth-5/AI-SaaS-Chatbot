import React, { useState } from 'react'
import {TextInput, Spinner, Button, Label} from 'flowbite-react';
import Robot from '../assets/robot.gif';
import {Link} from 'react-router-dom';

export default function SignUp() {

  const [loading,setLoading]=useState(false);

  const handleSubmit=async()=>{}
  const handleChange=async()=>{}
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20'>
        <div className='flex-1'>
          <img src={Robot} alt="robot" />
        </div>
        <div className='flex-1'>
          <p className='text-[40px] pb-5'>Signup</p>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label className='text-white-500' value='Your Full Name' />
              <TextInput type='text' placeholder='Name' id='name' onChange={handleChange} />
            </div>
            <div>
              <Label className='text-white-500' value='Your Email' />
              <TextInput type='email' placeholder='name@gmail.com' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label className='text-white-500' value='Your Password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (<>
                             <Spinner size='sm' /> 
                             <span className='pl-3'>Loading...</span>
                           </>) : 'Sign Up'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/login' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
