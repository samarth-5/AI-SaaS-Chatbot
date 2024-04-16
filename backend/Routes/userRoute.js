import express from 'express';
import { getAllUsers, signup, login, signout } from '../Controllers/userController.js';
import { loginValidator, signupValidator, validate } from '../Utils/validators.js';

const router=express.Router();

router.get("/",getAllUsers);
router.post("/signup",validate(signupValidator),signup);
router.post("/login",validate(loginValidator),login);
router.post("/signout",signout);

export default router;