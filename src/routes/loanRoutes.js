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


router.get('/', authenticate, authorizeRoles('EMPLOYEE','ADMIN'), getAllLoansHandler);  //doesnt take a body
router.get('/my-loans', authenticate, authorizeRoles('GUEST'), getMyLoansHandler); //
router.get('/:id', authenticate, authorizeRoles('EMPLOYEE', 'ADMIN'), validateID, getLoanByIDHandler);//
router.post('/', authenticate, authorizeRoles('EMPLOYEE','ADMIN'), validateCreateLoan, createLoanHandler);
router.delete('/:id',validateID, deleteLoanHandler);
router.put('/:id', authenticate, authorizeRoles('EMPLOYEE', 'ADMIN'),validateID, updateLoanHandler);






export default router
