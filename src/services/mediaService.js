import {allMedia, mediaId, updateMediaById,createMediaRecord, findExistingMedia, deleteMediaRecord} from '../repositories/mediaRepo.js';
import {findAuthorByID} from '../repositories/authorsRepo.js';
import {createCopy, findCheckedOutCopies, deleteMediaCopies} from '../repositories/mediaCopyRepo.js';

export async function getAllMedia(){
    return await allMedia();
}

export async function getMediaById(id){
     const media = await mediaId(id);
        if(media)return media;
        else{
            const error = new Error(`Media with id ${id} not found`);
            error.status= 404;
            throw error;
        }
}

export async function updateMedia(id, data) {
  return await updateMediaById(id, data);
}

export async function createMedia(data) {
  const { title, authorId, publicationYear, mediaType, copies } = data;

  // check author exists
  const author = await findAuthorByID(authorId);
  if (!author) {
    const err = new Error(`Author with ID ${authorId} not found. Author must be in database before adding new media`);
    err.status = 404;
    throw err;
  }

  // check media doesn't already exist
  const existingMedia = await findExistingMedia(title, authorId, publicationYear);
  if (existingMedia) {
    const err = new Error('This media already exists in the system');
    err.status = 409;
    throw err;
  }

  // create media record
  const newMedia = await createMediaRecord({ 
    title, 
    authorId, 
    publicationYear, 
    mediaType 
  });

  // create copies
  for (let i = 1; i <= copies; i++) {
    await createCopy({ mediaId: newMedia.id, 
        copyNumber: i });
  }

  return newMedia;
}

export async function deleteMedia(id) {
  // check media exists
    await getMediaById(id);
 

  // check no copies are checked out
  const checkedOutCopies = await findCheckedOutCopies(id);
  if (checkedOutCopies.length > 0) {
    const err = new Error('Cannot delete media with copies currently checked out');
    err.status = 409;
    throw err;
  }

  // delete copies first
  await deleteMediaCopies(id);

  // then delete media
  return await deleteMediaRecord(id);
}