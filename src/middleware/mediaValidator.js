import { handleValidationErrors } from './handleValidationError.js';
import { body} from 'express-validator';

// CREATE MEDIA — all fields required
export const validateCreateMedia = [
  body('title')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),
  body('authorId')
    .exists({ values: 'falsy' })
    .withMessage('Author ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Author ID must be a positive integer'),
  body('publicationYear')
    .optional()
    .isISO8601()
    .withMessage('Publication year must be a valid date e.g. 2022-01-01'),
  body('mediaType')
    .exists({ values: 'falsy' })
    .withMessage('Media type is required')
    .bail()
    .isIn(['BOOK', 'MAGAZINE', 'DVD'])
    .withMessage('Media type must be BOOK, MAGAZINE or DVD'),
  body('copies')
    .exists({ values: 'falsy' })
    .withMessage('Copies is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Copies must be a positive integer'),
  handleValidationErrors,
];

// UPDATE MEDIA — all fields optional but validated if provided
export const validateUpdateMedia = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),
  body('authorId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Author ID must be a positive integer'),
  body('publicationYear')
    .optional()
    .isISO8601()
    .withMessage('Publication year must be a valid date e.g. 2022-01-01'),
  body('mediaType')
    .optional()
    .isIn(['BOOK', 'MAGAZINE', 'DVD'])
    .withMessage('Media type must be BOOK, MAGAZINE or DVD'),
  handleValidationErrors,
];