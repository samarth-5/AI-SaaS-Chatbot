import express from 'express';
import { generateChatCompletion } from '../Controllers/chatController.js';

const router=express.Router();

router.post("/new",generateChatCompletion);

export default router;