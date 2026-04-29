import express from 'express';
import {getAllLoansHandler,
    getLoanByIDHandler,
    createLoanHandler,
    deleteLoanHandler,
    updateLoanHandler,
    getMyLoansHandler
} from '../controllers/loanController.js'
import {validateID} from '../middleware/paramValidator.js';
import { validateCreateLoan } from '../middleware/loanValidator.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();


router.get('/', authenticate, authorizeRoles('EMPLOYEE','ADMIN'), getAllLoansHandler);  //doesnt take a body 1
router.get('/my-loans', authenticate, authorizeRoles('GUEST'), getMyLoansHandler); //3
router.get('/:id', authenticate, authorizeRoles('EMPLOYEE', 'ADMIN'), validateID, getLoanByIDHandler);  // 4
router.post('/', authenticate, authorizeRoles('EMPLOYEE','ADMIN'), validateCreateLoan, createLoanHandler);  //2
router.delete('/:id',authenticate, authorizeRoles('ADMIN'), validateID, deleteLoanHandler);  //5
router.put('/:id', authenticate, authorizeRoles('EMPLOYEE', 'ADMIN'),validateID, updateLoanHandler); //6






export default router
