import express from 'express';
import { generateChatCompletion } from '../Controllers/chatController.js';
import { chatCompletionValidator, validate } from '../Utils/validators.js';

const router=express.Router();

router.post("/new",validate(chatCompletionValidator),generateChatCompletion);

export default router;