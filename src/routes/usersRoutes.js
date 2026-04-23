import express from 'express';
import { getAllUsersHandler,
    getUserByIDHandler
} from '../controllers/usersController.js';




const router = express.Router();

router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIDHandler);
export default router