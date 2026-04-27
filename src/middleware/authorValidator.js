import { handleValidationErrors } from './handleValidationError.js';
import { body} from 'express-validator';

export const validateCreateAuthor = [
  body('name')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  handleValidationErrors,
];

export const validateUpdateAuthor = [
  body('name')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  handleValidationErrors,
];