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
export async function removeLoan(id) {
  try {
    const deletedLoan = await prisma.loan.delete({
      where: { id },
    });
    return deletedLoan;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function updateLoan(id){

    try {
     const updatedLoan = await prisma.loan.update({
    where: { id },
    data: {
      returnDate: new Date() 
    }
  });
    return updatedLoan;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function getLoansByUserID(userId) {
  return await prisma.loan.findMany({
    where: { borrowerId: userId }
  });
}