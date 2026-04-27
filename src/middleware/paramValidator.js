import {param} from 'express-validator';

export const validateID = [
    param('id')
    .trim()
    .escape()
    .isInt({min:1})
    .withMessage('ID must be a positive integer'),
    



];