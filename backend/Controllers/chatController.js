import User from "../Models/userModel.js";
import { GoogleGenerativeAI } from '@google/generative-ai';

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
        const chats=existingUser.chats.map(({role, content})=>({role, content}));
        chats.push({role: "user", content: message.content});
        
        //send chat to open ai api
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        // existingUser.chats.push(chatResponse.data.choices[0].message);
        // await existingUser.save();
        // return res.status(200).json({ chats: existingUser.chats });
        async function run() {
            // For text-only input, use the gemini-pro model
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
          
            const prompt = message.content;
          
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            chats.push({role: "assisstant", content: text});
            console.log(chats);
            const updatedUser=await User.findByIdAndUpdate(existingUser._id,{$set:{chats}},{new: true});
            return res.status(200).json(updatedUser);
        }
        run();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong!!" });
    }
}