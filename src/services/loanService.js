import {getAll,
    getLoanByID,
    createLoanRecord
} from '../repositories/loanRepo.js';
import { getByID } from '../repositories/usersRepo.js';
import { createLoanCopy, countActiveItems } from '../repositories/loanCopyRepo.js';
import { findCopyById, updateCopyStatus } from '../repositories/mediaCopyRepo.js';


export async function getAllLoans(){
    return await getAll();
}

export async function getLoanById(id){
     const loan = await getLoanByID(id);
        if(loan)return loan;
        else{
            const error = new Error(`Loan with id ${id} does not exist`);
            error.status= 404;
            throw error;
        }
}


export async function createLoan(userId, copyIds) {

    // Rule 1 — check if user exists
  await getByID(userId);

  // Rule 2 — check user hasn't exceeded 3 items
  const activeItems = await countActiveItems(userId);
  if (activeItems + copyIds.length > 3) {
    const error = new Error('User has 3 items already checked out');
    error.status = 409;
    throw error;
  }

  // Rule 3 — calculate due date
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);

  // Rule 4 — create the loan record
  const loan = await createLoanRecord({ 
     borrowerId: userId, 
     dueDate 
    });

  // Rule 5 — link copies to loan and mark as checked out
  for (const copyId of copyIds) {
    await createLoanCopy(loan.id, copyId);
    await updateCopyStatus(copyId, 'CHECKEDOUT');
  }

  return loan;

}