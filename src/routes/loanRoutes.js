import express from 'express';
import {getAllLoansHandler,
    getLoanByIDHandler,
    createLoanHandler,
    deleteLoanHandler,
    updateLoanHandler
} from '../controllers/loanController.js'
import {validateID} from '../middleware/paramValidator.js';
import { validateCreateLoan } from '../middleware/loanValidator.js';

const router = express.Router();


router.get('/', getAllLoansHandler);  //doesnt take a body
router.get('/:id', validateID, getLoanByIDHandler);
router.post('/', validateCreateLoan, createLoanHandler);
router.delete('/:id',validateID, deleteLoanHandler);
router.put('/:id',validateID, updateLoanHandler);






export default router
