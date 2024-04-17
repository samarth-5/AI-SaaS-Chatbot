import React from 'react'
import {Card, Button, Avatar} from 'flowbite-react';
import { PiPaperPlaneRightFill } from "react-icons/pi";
import ChatItem from '../Components/ChatItem';
import {useSelector} from 'react-redux';

const chatMessages=[
  {
      role: "user",
      content: "Hi there! How can I help you today?"
  },
  {
      role: "assistant",
      content: "Hello! I'm here to assist you. What do you need help with?"
  },
  {
      role: "user",
      content: "I'm having some trouble with my computer. It keeps crashing."
  },
  {
      role: "assistant",
      content: "I can help with that. Have you tried restarting your computer?"
  },
  {
      role: "user",
      content: "Yes, I've tried that a few times already."
  },
  {
      role: "assistant",
      content: "Let's try running a virus scan to see if there's any malware causing the issue."
  },
  {
      role: "user",
      content: "Good idea. I'll do that right now."
  },
  {
      role: "assistant",
      content: "Let me know if you need further assistance after the scan completes."
  }
];

export default function Chat() {

  const user=useSelector(state=>state.user);
  const firstLetter=user.currentUser.rest.name.charAt(0);
  //console.log(firstLetter);

  const handleDelete=async()=>{}

  const handleSubmit=async()=>{}

  return (
    <div className='flex p-10 gap-10'>
      <div className='py-20'>
        <Card className='bg-[#0f1f60] w-[320px]'>
          <Avatar placeholderInitials={firstLetter} rounded border size='md' />
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
        <div className='h-[65vh] rounded overflow-auto pb-4'>
          {
            chatMessages.map((chat)=>(
              <div>
                <ChatItem role={chat.role} content={chat.content} firstLetter={firstLetter} />
              </div>
            ))
          }
        </div>
        <div className='flex items-center mt-2'>
          <input placeholder='Type your message...' type="text" className='bg-[#0f1f60] w-full p-3 rounded' />
          <PiPaperPlaneRightFill className='relative right-10 cursor-pointer' size={30} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
