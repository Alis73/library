import express from 'express';
import {getAllMediaHandler, 
    getMediaByIdHandler,
    updateMediaHandler, 
    createMediaHandler, 
    deleteMediaHandler} from '../controllers/mediaController.js';
import {validateID} from '../middleware/paramValidator.js';
import {validateCreateMedia, validateUpdateMedia} from '../middleware/mediaValidator.js'

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';


const router = express.Router();


router.get('/', getAllMediaHandler); //anyone can search media member or not 1
router.get('/:id', validateID,  getMediaByIdHandler); //3

router.post('/', authenticate, authorizeRoles('EMPLOYEE', 'ADMIN'),validateCreateMedia, createMediaHandler); //2 
router.delete('/:id', authenticate, authorizeRoles('ADMIN'),validateID, deleteMediaHandler); //4
router.put('/:id', authenticate, authorizeRoles('EMPLOYEE', 'ADMIN'), validateID, validateUpdateMedia, updateMediaHandler);  //5






export default router
