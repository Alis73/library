import express from 'express';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
const router = express.Router();


router.post('/signUp', signUpHandler);
router.post('/login', logInHandler);

export default router