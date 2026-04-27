import prisma from '../config/db.js';


export async function findAuthorByID(id){
    const author = await prisma.author.findUnique({where: {id}});
    return author;
}
export async function allAuhtors({ search, sortBy, order, offset, limit }) {
  const conditions = {};

  if (search) {
    conditions.OR = [
      { name: { contains: search, mode: 'insensitive' } },
    ];
  }

  return await prisma.author.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
}

export async function newAuthor(data){
    const newAuthor = await prisma.author.create({data});
    return newAuthor;
}

export async function deleteAuthorRecord(id) {
  return await prisma.author.delete({
    where: { id }
  });
}

export async function updateAuthorRecord(id, data) {
  return await prisma.author.update({
    where: { id },
    data
  });
}