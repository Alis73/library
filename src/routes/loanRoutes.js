import express from 'express';
import {getAllLoansHandler,
    getLoanByIDHandler,
    createLoanHandler,
    deleteLoanHandler,
    updateLoanHandler
} from '../controllers/loanController.js'
import { handleValidationErrors} from '../middleware/handleValidationError.js';
import {validateID} from '../middleware/paramValidator.js';

const router = express.Router();


router.get('/', getAllLoansHandler);
router.get('/:id', validateID, handleValidationErrors, getLoanByIDHandler);
router.post('/', createLoanHandler);
router.delete('/:id',validateID, handleValidationErrors, deleteLoanHandler);
router.put('/:id',validateID, handleValidationErrors, updateLoanHandler);






export default router
