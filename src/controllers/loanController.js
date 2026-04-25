import {getAllLoans} from '../services/loanService.js';



export async function getAllLoansHandler(req,res){
    let loans = await getAllLoans();
        res.status(200).json(loans);
}