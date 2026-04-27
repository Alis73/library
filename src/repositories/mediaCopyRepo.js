import prisma from '../config/db.js';



export async function findCopyById(id) {
  return await prisma.mediaCopy.findUnique({
    where: { id }
  });
}

export async function updateCopyStatus(copyId, status) {
  return await prisma.mediaCopy.update({
    where: { id: copyId },
    data: { currentStatus: status }
  });
}

export async function createCopy(data) {
  return await prisma.mediaCopy.create({ data });
}

export async function findCheckedOutCopies(mediaId) {
  return await prisma.mediaCopy.findMany({
    where: {
      mediaId,
      currentStatus: 'CHECKEDOUT'
    }
  });
}

export async function deleteMediaCopies(mediaId) {
  return await prisma.mediaCopy.deleteMany({
    where: { mediaId }
  });
}