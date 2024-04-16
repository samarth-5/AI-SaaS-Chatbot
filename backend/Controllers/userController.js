import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs';
import { createToken } from "../Utils/token.js";

export const getAllUsers = async(req,res,next)=>{
    try{
        const users=await User.find();
        return res.status(200).json({message:"OK", users});
    }
    catch(err){
        return res.status(403).json({message:err.message});
    }
}

export const signup = async(req,res,next)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password || name==='' || password==='' || email==='')
    {
        return res.status(400).json({message:'All fields are required!'});
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            //console.log(res);
            return res.status(402).json({message:'Account already exists!'});}
        const hashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();        
        return res.status(201).json({message: "Signup Successfull!", id: newUser._id.toString()});
    }
    catch(err){
        return res.status(403).json({message:"Unable to signup!"});
    }
}

export const login = async(req,res,next)=>{
    const {email,password}=req.body;    
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser)
        return res.status(404).json({message:'User does not exist!'});
        const validPassword=bcryptjs.compareSync(password,existingUser.password);
        if(!validPassword)
        return res.status(401).json({message:'Invalid credentials!'});
        
        const token=createToken(existingUser._id.toString(),existingUser.email,"7d");
        //console.log(existingUser);
        const {password:pass,...rest}=existingUser._doc;
       
        return res.status(200)
                  .cookie('access_token',token,{httpOnly:true})
                  .json({message: "Login Successfull!", rest});
    }
    catch(err){
        return res.status(403).json({message:"Unable to login!"});
    }
}