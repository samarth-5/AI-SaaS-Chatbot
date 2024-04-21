import React,{useEffect,useRef} from 'react'
import {Avatar} from 'flowbite-react';
import ai from '../assets/logo.jpeg';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatItem({role,content,firstLetter}) { 

  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat item component
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [content]);

  const extractCodeFromString = (message) => {
    if (message.includes("```")) {
      const blocks = message.split("```");
      return blocks;
    }
  }
  const isCodeBlock = (str) => {
    if (str.includes("=") || str.includes(";") || str.includes("[") || str.includes("]") ||
        str.includes("{") || str.includes("}") || str.includes("#") || str.includes("//")) 
    return true;
    return false;
  }
  const messageBlocks = extractCodeFromString(content);

  return (
    <>
      {
        role==='assistant' ? (<div className='p-2 flex gap-2 my-2 bg-[#07073d] rounded'>
            <div style={{ alignSelf: 'flex-start' }} className='mt-2' ref={scrollRef}>
              <Avatar img={ai} alt="ai" rounded />
            </div>
            {
              !messageBlocks && (                
                <div className='w-full flex items-center font-mono'>{content}</div>
              )
            }
            {messageBlocks && messageBlocks.length && messageBlocks.map((block) =>
                         isCodeBlock(block) ? (
                         <SyntaxHighlighter style={coldarkDark} language="javascript">
                            {block}
                         </SyntaxHighlighter>
            ) : (<></>)
          )}
        </div>) : (<div className='p-2 flex gap-2 my-2 bg-[#13136e] rounded' ref={scrollRef}>
            <Avatar placeholderInitials={firstLetter} alt='user' rounded />
            <div className='w-full flex items-center font-sans'>{content}</div>
        </div>)
      }
    </>
  )
}