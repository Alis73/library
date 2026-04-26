import express from 'express';
import {getAllLoansHandler,
    getLoanByIDHandler,
    createLoanHandler,
    deleteLoanHandler,
    updateLoanHandler
} from '../controllers/loanController.js'
const router = express.Router();


router.get('/', getAllLoansHandler);
router.get('/:id', getLoanByIDHandler);
router.post('/', createLoanHandler);
router.delete('/:id',deleteLoanHandler);
router.put('/:id',updateLoanHandler);






export default router
