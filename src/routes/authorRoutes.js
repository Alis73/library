import express from 'express';
import { getAllAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, deleteAuthorHandler, updateAuthorHandler } from '../controllers/authorController.js';
import {validateID} from '../middleware/paramValidator.js';
import {validateCreateAuthor, validateUpdateAuthor} from '../middleware/authorValidator.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', getAllAuthorsHandler);
router.get('/:id',validateID, getAuthorByIdHandler);
router.post('/', validateCreateAuthor, createAuthorHandler);
router.delete('/:id', deleteAuthorHandler);
router.put('/:id', validateID, validateUpdateAuthor, updateAuthorHandler);

export default router;