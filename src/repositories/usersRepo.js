import prisma from '../config/db.js';


export async function getAll() {
  const users = await prisma.user.findMany({omit: { password:true}});
  console.log('finished repo');
  return users;
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

export async function findByEmail(email){
    return prisma.user.findUnique({where: {email}});
}

  export async function update(id, updatedData) {
        try {
            const updatedUser = await prisma.user.update({where: {id},
                 data: updatedData, 
                 select: {id: true, email: true, role: true}});
            return updatedUser;
        }catch (error) {
            if (error.code === 'P2025') return null;

            if (error.code === 'P2002') {
                const err = new Error('Email has already been used');
                err.status = 409;
                throw err;
               }
               throw error;
        }
    }

