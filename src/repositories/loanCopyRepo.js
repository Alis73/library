import prisma from '../config/db.js';

export async function countActiveItems(userId) {
  return await prisma.loanCopy.count({
    where: {
      loan: {
        borrowerId: userId,
        returnDate: null // loan not returned yet
      }
    }
  });
}

export async function createLoanCopy(loanId, copyId) {
  return await prisma.loanCopy.create({
    data: { 
      loanId, 
      copyId 
    }
  });
}

export async function getLoanCopies(loanId){
    
  const loanCopies = await prisma.loanCopy.findMany({
    where: {loanId}
  });
  return loanCopies;
}

export async function deleteLoanCopies(loanId) {
  return await prisma.loanCopy.deleteMany({
    where: { loanId }
  });
}

