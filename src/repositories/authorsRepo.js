import prisma from '../config/db.js';


export async function findAuthorByID(id){
    const author = await prisma.author.findUnique({where: {id}});
    return author;
}
export async function allAuhtors(){
    const authors = await prisma.author.findMany();
    return authors;
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