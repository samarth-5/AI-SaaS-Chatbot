import React, { useEffect, useState } from 'react'
import {Card, Button, Avatar} from 'flowbite-react';
import { PiPaperPlaneRightFill } from "react-icons/pi";
import ChatItem from '../Components/ChatItem';
import {useSelector} from 'react-redux';


export default function Chat() {

  const [formData,setFormData]=useState('');
  const [chatMessages, setChatMessages] = useState([]);

  //console.log(formData);

  const user=useSelector((state)=>state.user);
  
  const firstLetter=user.currentUser.rest.name.charAt(0);
  //console.log(firstLetter);

  const handleDelete=async()=>{
    try{
      const res=await fetch(`/api/chat/delete/${user.currentUser.rest._id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(user)
      });
      const data=await res.json();
      setChatMessages([]);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const getOldMessages=async()=>{
      try{
        const res=await fetch(`/api/chat/old/${user.currentUser.rest._id}`);
        const data=await res.json();
        setChatMessages(data);
      }
      catch(err){
        console.log(err);
      }
    }
    getOldMessages();
  },[]);
  

  
  const sendChatRequest=async(message)=>{
    try{
      const res=await fetch('/api/chat/new',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(message)
      });
      if(!res.ok)
      console.log("Unable to send chat");
      const data=await res.json();
      return data;
    }
    catch(err){
      console.log(err);
    }
  }

  const handleChange=(e)=>{
    setFormData(e.target.value);
  }

  const handleSubmit=async()=>{
    const content=formData;
    const newMessage={role:"user", content, id:user.currentUser.rest._id};
    setChatMessages([...chatMessages, newMessage]);
    setFormData('');

    const updatedUser=await sendChatRequest(newMessage);
    //console.log(chatData);
    //console.log(chatMessages);
    setChatMessages([...chatMessages, updatedUser.chats]);
  }

  return (
    <div className='flex p-10 gap-10'>
      <div className='py-20'>
        <Card className='bg-[#0f1f60] w-[320px]'>
          <Avatar placeholderInitials={firstLetter} rounded size='md' />
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
            chatMessages && chatMessages.map((chat)=>(
              <div key={chat.id}>
                <ChatItem role={chat.role} content={chat.content} firstLetter={firstLetter} />
              </div>
            ))
          }
        </div>
        <div className='flex items-center mt-2'>
          <input placeholder='Type your message...' type="text" className='bg-[#0f1f60] w-full p-3 rounded' value={formData} required onChange={handleChange} />
          <PiPaperPlaneRightFill className='relative right-10 cursor-pointer' size={30} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
