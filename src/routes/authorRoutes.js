import express from 'express';
import { getAllAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, deleteAuthorHandler, updateAuthorHandler } from '../controllers/authorController.js';
import {validateID} from '../middleware/paramValidator.js';
import {validateCreateAuthor, validateUpdateAuthor} from '../middleware/authorValidator.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', getAllAuthorsHandler); //like searching library for a book 1
router.get('/:id',authenticate , authorizeRoles('EMPLOYEE', 'ADMIN'), validateID, getAuthorByIdHandler); //emp or admin 3
router.post('/', authenticate ,authorizeRoles('EMPLOYEE', 'ADMIN'), validateCreateAuthor, createAuthorHandler); //emp or admin 2
router.delete('/:id', authenticate , authorizeRoles('ADMIN'),validateID, deleteAuthorHandler); // admin 4
router.put('/:id', authenticate ,authorizeRoles('EMPLOYEE', 'ADMIN'),validateID, validateUpdateAuthor, updateAuthorHandler); //emp or admin 5

export default router;