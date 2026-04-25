import express from 'express';
import { getAllUsersHandler,
    getUserByIDHandler,
    updateUserHandler
} from '../controllers/usersController.js';




const router = express.Router();

router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIDHandler);
router.put('/me',updateUserHandler);
export default router