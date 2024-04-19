import express from 'express';
import { generateChatCompletion,getOldMessages } from '../Controllers/chatController.js';

const router=express.Router();

router.get("/old/:id",getOldMessages);
router.post("/new",generateChatCompletion);

export default router;