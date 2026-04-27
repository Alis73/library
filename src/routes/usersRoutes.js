import express from 'express';
import { getAllUsersHandler,
    getUserByIDHandler,
    updateUserHandler,
    removeUserHandler
} from '../controllers/usersController.js';
import { handleValidationErrors} from '../middleware/handleValidationError.js';
import {validateID} from '../middleware/paramValidator.js';





const router = express.Router();

router.get('/', getAllUsersHandler);
router.get('/:id', validateID, getUserByIDHandler);
router.put('/me',updateUserHandler);
router.delete('/me', removeUserHandler);
export default router