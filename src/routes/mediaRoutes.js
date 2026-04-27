import express from 'express';
import {getAllMediaHandler, 
    getMediaByIdHandler,
    updateMediaHandler, 
    createMediaHandler, 
    deleteMediaHandler} from '../controllers/mediaController.js';
import {validateID} from '../middleware/paramValidator.js';
import {validateCreateMedia, validateUpdateMedia} from '../middleware/mediaValidator.js'


const router = express.Router();


router.get('/', getAllMediaHandler);
router.get('/:id', validateID,  getMediaByIdHandler);
router.post('/', validateCreateMedia, createMediaHandler); //
router.delete('/:id',validateID, deleteMediaHandler);
router.put('/:id', validateID, validateUpdateMedia, updateMediaHandler); //






export default router
