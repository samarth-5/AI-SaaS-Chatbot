import React from 'react'
import {Card, Button} from 'flowbite-react';
import { PiPaperPlaneRightFill } from "react-icons/pi";

export default function Chat() {

  const handleDelete=async()=>{}

  const handleSubmit=async()=>{}

  return (
    <div className='flex p-10 gap-10'>
      <div className='py-20'>
        <Card className='bg-[#0f1f60] w-[320px]'>
          <h3 className='text-2xl font-bold'>You are talking to a CHATBOT !!</h3>
          <p>You can ask questions related to Knowledge, Buisness, Advices,
            Education, etc. 
          </p>
          <p>Avoid sharing personal information!</p>
          <Button pill gradientDuoTone='pinkToOrange' onClick={handleDelete}>CLEAR CONVERSATION</Button>
        </Card>
      </div>
      <div className='w-full'>
        <h1 className='text-[40px] text-bold text-center'>MODEL - GPT 3.5 TURBO</h1>
        <div className='h-[65vh] rounded'></div>
        <div className='flex items-center'>
          <input type="text" className='bg-[#0f1f60] w-full p-3 rounded' />
          <PiPaperPlaneRightFill className='relative right-10 cursor-pointer' size={30} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
