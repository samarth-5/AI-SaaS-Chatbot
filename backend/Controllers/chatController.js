import e from "express";
import User from "../Models/userModel.js";
import OpenAI from "openai";

export const generateChatCompletion = async(req,res,next)=>{
    const {message}=req.body;
    try{
        const existingUser = await User.findById(res.locals.jwtData.id);
        if(!existingUser)
        {
            return res.status(404).json({message:'User does not exist!'});
        }
        //grab chats of user
        const chats=existingUser.chats.map(({role, content})=>({role, content}));
        chats.push({content: message, role: "user"});
        existingUser.chats.push({content: message, role: "user"});
        //send chat to open ai api
        const openai = new OpenAI({
            organization: process.env.OPENAI_ORGANIZATION,
            project: process.env.OPENAI_SECRET,
        });
        //get response
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: "Say this is a test" }],
            stream: true});
        console.log(chatResponse);
        existingUser.chats.push(chatResponse.data.choices[0].message);
        await existingUser.save();
        return res.status(200).json({ chats: existingUser.chats });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}