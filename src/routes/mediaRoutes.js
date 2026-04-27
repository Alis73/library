import express from 'express';
import {getAllMediaHandler, 
    getMediaByIdHandler,
    updateMediaHandler, 
    createMediaHandler, 
    deleteMediaHandler} from '../controllers/mediaController.js';
import { handleValidationErrors} from '../middleware/handleValidationError.js';
import {validateID} from '../middleware/paramValidator.js';


const router = express.Router();


router.get('/', getAllMediaHandler);
router.get('/:id', validateID,  getMediaByIdHandler);
router.post('/', createMediaHandler);
router.post('/', createMediaHandler);
router.post('/', createMediaHandler);
router.delete('/:id',validateID, deleteMediaHandler);
router.put('/:id', validateID, updateMediaHandler);






export default router
