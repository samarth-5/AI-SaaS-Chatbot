import User from "../Models/userModel.js";
import { GoogleGenerativeAI } from '@google/generative-ai';

export const getOldMessages=async(req,res,next)=>{
    try{
        const existingUser=await User.findById(req.params.id);
        if(!existingUser)
        {
            return res.status(404).json({message:'User does not exist!'});
        }
        const chats=existingUser.chats;
        res.status(200).json(chats);
    }
    catch(err){
        next(err);
    }
}

export const generateChatCompletion = async(req,res,next)=>{
    const message=req.body;
    try{
        const existingUser = await User.findById(message.id);
        //console.log(existingUser);        
        if(!existingUser)
        {
            return res.status(404).json({message:'User does not exist!'});
        }
        //grab chats of user
        //const chats=existingUser.chats.map(({role, content})=>({role, content}));
        existingUser.chats.push({role: "user", content: message.content});
        
        //send chat to open ai api
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        async function run() {
            // For text-only input, use the gemini-pro model
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
          
            const prompt = message.content;
          
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            existingUser.chats.push({role: "assistant", content: text});
            //console.log(chats);
            const updatedUser=await User.findByIdAndUpdate(existingUser._id,{$set:{chats:existingUser.chats}},{new: true});
            return res.status(200).json(updatedUser);
        }
        run();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong!!" });
    }
}

export const deleteChat=async(req,res,next)=>{
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set: {chats: []}},
                                                                                {new: true});
        //console.log(updatedUser);
        res.status(200).json(updatedUser);
    }
    catch(err){
        console.log(err);
    }
}