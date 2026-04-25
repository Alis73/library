import {getAllLoans,
    getLoanById,
    createLoan
} from '../services/loanService.js';



export async function getAllLoansHandler(req,res){
    let loans = await getAllLoans();
        res.status(200).json(loans);
}

export async function getLoanByIDHandler(req,res){
    console.log('in controller');
    const id = parseInt(req.params.id);
    console.log(`${id}`);
    const loan = await getLoanById(id);
    res.status(200).json(loan);

}

export async function createLoanHandler(req,res,next){
    try {
    const { userId, copyIds } = req.body;
    const loan = await createLoan(userId, copyIds);
    res.status(200).json(loan);
  } catch (err) {
    next(err);
  }
}