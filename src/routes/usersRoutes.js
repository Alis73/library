import express from 'express';
import { getAllUsersHandler,
    getUserByIDHandler,
    updateUserHandler,
    removeUserHandler,
    getMyProfileHandler,
    updateMyProfileHandler,
    removeMyProfileHandler
} from '../controllers/usersController.js';
import {validateID} from '../middleware/paramValidator.js';
import { validateUpdateUser } from '../middleware/userValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';





const router = express.Router();

router.get('/me', authenticate, getMyProfileHandler); //2
router.get('/',  authenticate, authorizeRoles('EMPLOYEE','ADMIN'), getAllUsersHandler);//1
router.get('/:id', authenticate, authorizeRoles('EMPLOYEE','ADMIN'), validateID, getUserByIDHandler);//5
router.put('/me', authenticate, validateUpdateUser, updateMyProfileHandler); //3
router.put('/:id', authenticate, authorizeRoles('EMPLOYEE', 'ADMIN'), validateID, validateUpdateUser, updateUserHandler); //6
router.delete('/me', authenticate, removeMyProfileHandler); //4
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateID, removeUserHandler); //7


export default router