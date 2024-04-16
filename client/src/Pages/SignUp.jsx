import React, { useState } from 'react'
import {TextInput, Spinner, Button, Label, Alert} from 'flowbite-react';
import Robot from '../assets/robot.gif';
import {Link, useNavigate} from 'react-router-dom';

export default function SignUp() {

  const [loading,setLoading]=useState(false);
  const [formData,setFormData]=useState({});
  const [errorMessage,setErrorMessage]=useState(null);

  const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }
  //console.log(formData);

  const handleSubmit=async(e)=>{
      e.preventDefault();
      if(!formData.name || !formData.email || !formData.password)
      {
        return setErrorMessage('Please fill out all fields!');
      }
      try{
        setLoading(true);
        setErrorMessage(null);
        const res=await fetch('/api/user/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      console.log(data);
      if(!res.ok)
      {
        setLoading(false);
        return setErrorMessage(data.message);
      }      
      if(res.ok)
      navigate('/login');
    }
    catch(err){
      setErrorMessage(err.message);
      setLoading(false);
    }
  }

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
                           </>) : 'Create an account'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/login' className='text-blue-500'>
              Log In
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
