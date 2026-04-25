import prisma from '../config/db.js';


export async function findCopyById(id) {
  return await prisma.mediaCopy.findUnique({
    where: { id }
  });
}

export async function updateCopyStatus(id, status) {
  return await prisma.mediaCopy.update({
    where: { id },
    data: { currentStatus: status }
  });
}