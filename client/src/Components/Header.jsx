import React from 'react'
import {Navbar,Button} from 'flowbite-react';
import {Link} from 'react-router-dom';
import Icon from './Icon';

export default function Header() {
  return (
    <Navbar className='border-b-2 flex items-center mx-auto bg-[#081625] p-0'>
      <Link to='/'>
        <Icon />
      </Link>
      <div className='flex gap-5'>
        <Link to='/login'>
          <Button pill gradientDuoTone='purpleToBlue'>Login</Button>
        </Link>
        <Link to='/signup'>
          <Button pill gradientDuoTone='purpleToBlue' outline>Signup</Button>
        </Link>
      </div>
    </Navbar>
  )
}
