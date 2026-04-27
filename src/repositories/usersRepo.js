import prisma from '../config/db.js';


export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};

  if (search) {
    conditions.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  return await prisma.user.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
     
    }
  });
}

export async function getByID(id) {
  const user = await prisma.user.findUnique({
    where: {id},
    select: {
      id: true,
      name: true,
      email: true,
      role: true
      
    }
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

     export async function remove(id) {
        try {
            const removeUser = await prisma.user.delete({where: {id}});
            return removeUser;
        } catch (error) {
            if (error.code === 'P2025') return null;
        throw error;
        }
    }


