import { handleValidationErrors } from './handleValidationError.js';
import { body} from 'express-validator';

export const validateSignUp = [
     body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters'
    ),

  body('role')
    .optional()
    .isIn(['GUEST', 'ADMIN', 'EMPLOYEE '])
    .withMessage('Role must be either GUEST, EMPLOYEE, or ADMIN'),


    handleValidationErrors,
];

export const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email must be a valid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
        handleValidationErrors ,
];