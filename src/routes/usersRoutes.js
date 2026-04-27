import express from 'express';
import { getAllUsersHandler,
    getUserByIDHandler,
    updateUserHandler,
    removeUserHandler
} from '../controllers/usersController.js';
import {validateID} from '../middleware/paramValidator.js';
import { validateUpdateUser } from '../middleware/userValidators.js';





const router = express.Router();

router.get('/', getAllUsersHandler);
router.get('/:id', validateID, getUserByIDHandler);
router.put('/me', validateUpdateUser, updateUserHandler);
router.delete('/me', removeUserHandler);
export default router