import express from 'express';
import {getAllLoansHandler,
    getLoanByIDHandler,
    createLoanHandler,
    deleteLoanHandler,
    updateLoanHandler
} from '../controllers/loanController.js'
import {validateID} from '../middleware/paramValidator.js';

const router = express.Router();


router.get('/', getAllLoansHandler);
router.get('/:id', validateID, getLoanByIDHandler);
router.post('/', createLoanHandler);
router.delete('/:id',validateID, deleteLoanHandler);
router.put('/:id',validateID, updateLoanHandler);






export default router
