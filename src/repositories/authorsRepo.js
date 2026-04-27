import prisma from '../config/db.js';


export async function findAuthorByID(id){
    const author = await prisma.author.findUnique({where: {id}});
    return author;
}