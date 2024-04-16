import React from 'react'
import {Navbar,Button} from 'flowbite-react';
import {Link} from 'react-router-dom';
import Icon from './Icon';
import {useSelector, useDispatch} from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice.js';

export default function Header() {

  const dispatch=useDispatch();
  const {currentUser}=useSelector(state=>state.user);

  const handleSignOut=async()=>{
    try{
        const res=await fetch('/api/user/signout', {
            method: 'POST',
        });
        const data=await res.json();
        if(!res.ok)
        {
            console.log(data.message);
        }
        else
        {
            dispatch(signOutSuccess());
        }
    }
    catch(err){
        console.log(err.message);
    }
  }

  return (
    <Navbar className='border-b-2 flex items-center mx-auto bg-[#081625] p-0'>
      <Link to='/'>
        <Icon />
      </Link>
      <div className='flex gap-5'>
        {
          currentUser ? (
            <>
              <Link to='/chat'>
                <Button pill gradientDuoTone='purpleToBlue'>Go to Chats</Button>
              </Link>
              <Button pill gradientDuoTone='pinkToOrange' onClick={handleSignOut}>Sign out</Button>
            </>
          ) : (
            <>
            <Link to='/login'>
              <Button pill gradientDuoTone='purpleToBlue'>Login</Button>
            </Link>
            <Link to='/signup'>
              <Button pill gradientDuoTone='purpleToBlue' outline>Signup</Button>
            </Link>
            </>
          )
        }
        
      </div>
    </Navbar>
  )
}
