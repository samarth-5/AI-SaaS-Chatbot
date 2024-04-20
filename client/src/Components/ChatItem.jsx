import React from 'react'
import {Avatar} from 'flowbite-react';
import ai from '../assets/logo.jpeg';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatItem({role,content,firstLetter}) { 
  return (
    <>
      {
        role==='assistant' ? (<div className='p-2 flex gap-2 my-2 bg-[#07073d] rounded'>
            <Avatar img={ai} alt="ai" rounded />
            <div className='w-full flex items-center font-mono'>{content}</div>
        </div>) : (<div className='p-2 flex gap-2 my-2 bg-[#13136e] rounded'>
            <Avatar placeholderInitials={firstLetter} alt='user' rounded />
            <div className='w-full flex items-center font-sans'>{content}</div>
        </div>)
      }
    </>
  )
}