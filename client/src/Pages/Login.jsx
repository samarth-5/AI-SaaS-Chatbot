import React, { useState } from 'react'
import {TextInput, Spinner, Button, Label, Alert} from 'flowbite-react';
import Robot from '../assets/robot.gif';
import {Link, useNavigate} from 'react-router-dom';

export default function Login() {

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
      if(!formData.email || !formData.password)
      {
        return setErrorMessage('Please fill out all fields!');
      }
      try{
        setLoading(true);
        setErrorMessage(null);
        const res=await fetch('/api/user/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      //console.log(data);
      if(!res.ok)
      {
        setLoading(false);
        return setErrorMessage(data.message);
      }      
      if(res.ok)
      navigate('/chats');
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
          <p className='text-[40px] pb-5'>Login</p>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                           </>) : 'Login'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-500'>
              Sign Up
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
