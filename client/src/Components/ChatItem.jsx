import React from 'react'
import {Avatar} from 'flowbite-react';
import ai from '../assets/gpt.png';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatItem({role,content,firstLetter}) {
  // const extratCodeFromString = (msg)=>{
  //   if(msg.c)
  // } 
  return (
    <>
      {
        role==='assistant' ? (<div className='p-2 flex gap-2 my-2 bg-[#07073d] rounded'>
            <Avatar img={ai} alt="ai" rounded />
            <div className='w-full flex items-center'>{content}</div>
        </div>) : (<div className='p-2 flex gap-2 my-2 bg-[#13136e] rounded'>
            <Avatar placeholderInitials={firstLetter} alt='user' rounded />
            <div className='w-full flex items-center'>{content}</div>
        </div>)
      }
    </>
  )
}