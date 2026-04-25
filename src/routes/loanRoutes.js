import express from 'express';
import {getAllLoansHandler,
    getLoanByIDHandler,
    createLoanHandler
} from '../controllers/loanController.js'
const router = express.Router();


router.get('/', getAllLoansHandler);
router.get('/:id', getLoanByIDHandler);
router.post('/', createLoanHandler);






export default router
