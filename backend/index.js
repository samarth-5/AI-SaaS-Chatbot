import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'; 

import userRoutes from './Routes/userRoute.js';
import chatRoutes from './Routes/chatRoute.js';

const app=express();
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(morgan("dev"));

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
        .then(()=>{console.log('MongoDB connected !!');})
        .catch(err=>{console.log(err)});

//CRUD

//testing
app.get("/test1",(req,res,next)=>{
    return res.send("Hello");
});
app.post("/test2",(req,res,next)=>{
    //console.log(req.body.name);
    return res.send("Hello");
});

const PORT=process.env.PORT || PORT;
app.listen(PORT,()=>{
    console.log("Server is running on port 5000");
});

app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);