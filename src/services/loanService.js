import {getAll,
    getLoanByID,
    createLoanRecord,
    removeLoan,
    updateLoan
} from '../repositories/loanRepo.js';
import { getByID } from '../repositories/usersRepo.js';
import { createLoanCopy, countActiveItems, deleteLoanCopies } from '../repositories/loanCopyRepo.js';
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
  const exist = await getByID(userId);
  if(!exist){
    const error = new Error(`User with ID ${userId} not found`);
    error.status = 404;
    throw error;
  }

  // Rule 2 — check user hasn't exceeded 3 items
  const activeItems = await countActiveItems(userId);
  if (activeItems + copyIds.length > 3) {
    const error = new Error('User has 3 items already checked out');
    error.status = 409;
    throw error;
  }

  for (const copyId of copyIds) {
  const copy = await findCopyById(copyId);
  if (!copy) {
    const err = new Error(`Copy with ID ${copyId} does not exist`);
    err.status = 404;
    throw err;
  }
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

export async function getRidLoan(loanId){
 // check if loan exists
  const loan = await getLoanByID(loanId);
  if (!loan) {
    const error = new Error(`Loan ${loanId} does not exist`);
    error.status = 404;
    throw error;
  }

  // check if loan is still active
  if (loan.returnDate === null) {
    const error = new Error('Cannot delete an active loan');
    error.status = 409;
    throw error;
  }

  // delete loan_copies rows first
  await deleteLoanCopies(loanId);

  // then delete the loan
  return await removeLoan(loanId);


}

export async function updateLoanStatus(id){
    const updatedLoan = await updateLoan(id);

    if(!updatedLoan){
        const err = new Error(`Loan with ID ${id} can not be found`);
        err.status = 404;
        throw err;

    }
    return updatedLoan;

}