import express from 'express';
import { getAllUsersHandler,
    getUserByIDHandler,
    updateUserHandler,
    removeUserHandler,
    getMyProfileHandler
} from '../controllers/usersController.js';
import {validateID} from '../middleware/paramValidator.js';
import { validateUpdateUser } from '../middleware/userValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';





const router = express.Router();

router.get('/me', authenticate, getMyProfileHandler);
router.get('/',  authenticate, authorizeRoles('EMPLOYEE','ADMIN'), getAllUsersHandler);//
router.get('/:id', authenticate, authorizeRoles('EMPLOYEE','ADMIN'), validateID, getUserByIDHandler);//
router.put('/me', validateUpdateUser, updateUserHandler);
router.delete('/me', removeUserHandler);


export default router