import express from 'express';
import { getAllAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, deleteAuthorHandler } from '../controllers/authorController.js';

const router = express.Router();

router.get('/', getAllAuthorsHandler);
router.get('/:id', getAuthorByIdHandler);
router.post('/', createAuthorHandler);
router.delete('/:id', deleteAuthorHandler);

export default router;