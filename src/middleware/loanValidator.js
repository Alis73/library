import { handleValidationErrors } from './handleValidationError.js';
import { body} from 'express-validator';



export const validateCreateLoan = [
  body('userId')
    .exists({ values: 'falsy' })
    .withMessage('User ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  body('copyIds')
    .exists({ values: 'falsy' })
    .withMessage('Copy IDs are required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('Copy IDs must be an array with at least one item'),
  body('copyIds.*')
    .isInt({ min: 1 })
    .withMessage('Each copy ID must be a positive integer'),
  handleValidationErrors,
];