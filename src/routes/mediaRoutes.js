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
router.get('/:id', validateID, handleValidationErrors,  getMediaByIdHandler);
router.post('/', createMediaHandler);
router.post('/', createMediaHandler);
router.post('/', createMediaHandler);
router.delete('/:id',validateID, handleValidationErrors, deleteMediaHandler);
router.put('/:id', validateID, handleValidationErrors, updateMediaHandler);






export default router
