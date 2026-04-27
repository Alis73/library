import express from 'express';
import {getAllLoansHandler,
    getLoanByIDHandler,
    createLoanHandler,
    deleteLoanHandler,
    updateLoanHandler
} from '../controllers/loanController.js'
import {validateID} from '../middleware/paramValidator.js';
import { validateCreateLoan } from '../middleware/loanValidator.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();


router.get('/', getAllLoansHandler);  //doesnt take a body
router.get('/:id', validateID, getLoanByIDHandler);
router.post('/', authenticate, authorizeRoles('EMPLOYEE','ADMIN'), validateCreateLoan, createLoanHandler);
router.delete('/:id',validateID, deleteLoanHandler);
router.put('/:id',validateID, updateLoanHandler);






export default router
