import express from 'express';
import {getAllMediaHandler, 
    getMediaByIdHandler,
    updateMediaHandler, 
    createMediaHandler, 
    deleteMediaHandler} from '../controllers/mediaController.js'

const router = express.Router();


router.get('/', getAllMediaHandler);
router.get('/:id',  getMediaByIdHandler);
router.post('/', createMediaHandler);
router.post('/', createMediaHandler);
router.post('/', createMediaHandler);
router.delete('/:id', deleteMediaHandler);
router.put('/:id',updateMediaHandler);






export default router
