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