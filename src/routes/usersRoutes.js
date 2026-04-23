import express from 'express';
import { getAllUsersHandler } from '../controllers/usersController.js';




const router = express.Router();

router.get('/', getAllUsersHandler);

export default router