import { getAllAuthors, getAuthorById, createAuthor, deleteAuthor } from '../services/authorService.js';

export async function getAllAuthorsHandler(req, res, next) {
  try {
    const authors = await getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    next(err);
  }
}

export async function getAuthorByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const author = await getAuthorById(id);
    res.status(200).json(author);
  } catch (err) {
    next(err);
  }
}

export async function createAuthorHandler(req, res, next) {
  try {
    const { name } = req.body;
    const newAuthor = await createAuthor({ name });
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
}

export async function deleteAuthorHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const deletedAuthor = await deleteAuthor(id);
    res.status(200).json(deletedAuthor);
  } catch (err) {
    next(err);
  }
}