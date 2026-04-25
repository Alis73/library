import prisma from '../config/db.js';

export async function getAll() {
  const loans = await prisma.loan.findMany();
  return loans;
}

export async function getLoanByID(id) {
  const loan = await prisma.loan.findUnique({
    where: {id}
  });
  return loan;
}

export async function countActiveLoans(userId) {
  return await prisma.loan.count({
    where: {
      borrowerId: userId,
      returnDate: null 
    }
  });
}

export async function createLoanRecord(data){
    const newLoan = await prisma.loan.create({ data
    });
    return newLoan;
  
}