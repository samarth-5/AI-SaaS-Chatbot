import User from "../Models/userModel.js";
//import OpenAI from "openai";
import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateChatCompletion = async(req,res,next)=>{
    const message=req.body;
    //console.log(message);
    //console.log(req);
    try{
        // const existingUser = await User.findById(res.locals.jwtData.id);
        // console.log(existingUser);
        
        // if(!existingUser)
        // {
        //     return res.status(404).json({message:'User does not exist!'});
        // }
        //grab chats of user
        // const chats=existingUser.chats.map(({role, content})=>({role, content}));
        // chats.push({content: message, role: "user"});
        // existingUser.chats.push({content: message, role: "user"});
        //send chat to open ai api
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        //get response
        // const chatResponse = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [{ role: "user", content: "Say this is a test" }],
        //     stream: true});
        // console.log(chatResponse);
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
            return res.status(200).json({ role:"assistant", content: text });
        }
        run();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong!!" });
    }
}