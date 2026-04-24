import prisma from '../config/db.js';


export async function getAll() {
  console.log('in repo');
  const users = await prisma.user.findMany();
  console.log('finished repo');
  return users;
}

export async function getByID(id) {
  console.log('in repo');
  const user = await prisma.user.findUnique({
    where: {id}
  });
  console.log('finished repo');
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

export async function findByEmail(email){
    return prisma.user.findUnique({where: {email}});
}

