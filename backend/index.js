import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app=express();
app.use(express.json());

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