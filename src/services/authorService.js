import { findAuthorByID, allAuhtors, newAuthor, deleteAuthorRecord } from '../repositories/authorsRepo.js';
import { findMediaByAuthorId, deleteMediaByAuthorId } from '../repositories/mediaRepo.js';
import { findCheckedOutCopies, deleteMediaCopies } from '../repositories/mediaCopyRepo.js';

export async function getAllAuthors() {
  return await allAuhtors();
}

export async function getAuthorById(id) {
  const author = await findAuthorByID(id);
  if (!author) {
    const err = new Error(`Author with ID ${id} not found`);
    err.status = 404;
    throw err;
  }
  return author;
}

export async function createAuthor(data) {
  return await newAuthor(data);
}

export async function deleteAuthor(id) {
  // check author exists
  const author = await getAuthorById(id);

  // get all media by this author
  const authorMedia = await findMediaByAuthorId(id);

  // check all copies of all media are available
  for (const media of authorMedia) {
    const checkedOutCopies = await findCheckedOutCopies(media.id);
    if (checkedOutCopies.length > 0) {
      const err = new Error(`Cannot delete author - media "${media.title}" has copies currently checked out`);
      err.status = 409;
      throw err;
    }
  }

  // delete all copies of all media first
  for (const media of authorMedia) {
    await deleteMediaCopies(media.id);
  }

 await deleteMediaByAuthorId(id);

  // delete the author
  return await deleteAuthorRecord(id);
}