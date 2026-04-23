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
