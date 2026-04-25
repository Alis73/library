import prisma from '../config/db.js';

export async function getAll() {
  const loans = await prisma.loan.findMany();
  return loans;
}

export async function getByID(id) {
  console.log('in repo');
  const user = await prisma.user.findUnique({
    where: {id}
  });
  return user;
}

export async function createUser(data){
    try {
    const newUser = await prisma.user.create({ data, omit: {password :true}
    });
    return newUser;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}