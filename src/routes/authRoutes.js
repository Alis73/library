import express from 'express';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
import { validateSignUp, validateLogin} from '../middleware/userValidators.js';
const router = express.Router();


router.post('/signUp', validateSignUp, signUpHandler);
router.post('/login', logInHandler);

export default router