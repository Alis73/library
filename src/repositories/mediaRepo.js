import prisma from '../config/db.js';

export async function allMedia(){
    const media = await prisma.media.findMany();
    return media;
}

export async function mediaId(id){
    const media = await prisma.media.findUnique({
        where: {id}
    });

    return media;
}
export async function updateMediaById(id, data) {
  return await prisma.media.update({
    where: { id },
    data
  });
}

export async function createMediaRecord(data) {
  return await prisma.media.create({ data });
}

export async function findExistingMedia(title, authorId, publicationYear) {
  return await prisma.media.findFirst({
    where: {
      title,
      authorId,
      publicationYear
    }
  });
}

export async function deleteMediaRecord(id) {
  return await prisma.media.delete({
    where: { id }
  });
}