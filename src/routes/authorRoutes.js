import express from 'express';
import { getAllAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, deleteAuthorHandler } from '../controllers/authorController.js';
import { handleValidationErrors} from '../middleware/handleValidationError.js';
import {validateID} from '../middleware/paramValidator.js';

const router = express.Router();

router.get('/', getAllAuthorsHandler);
router.get('/:id',validateID, handleValidationErrors, getAuthorByIdHandler);
router.post('/', createAuthorHandler);
router.delete('/:id', deleteAuthorHandler);

export default router;