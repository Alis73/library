import prisma from '../config/db.js';


export async function getAll() {
  console.log('in repo');
  const users = await prisma.user.findMany();
  console.log('finished repo');
  return users;
}
