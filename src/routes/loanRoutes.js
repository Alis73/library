import express from 'express';
import {getAllLoansHandler} from '../controllers/loanController.js'
const router = express.Router();


router.get('/', getAllLoansHandler);





export default router
