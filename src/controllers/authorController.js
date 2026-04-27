import { getAllAuthors, getAuthorById, createAuthor, deleteAuthor, updateAuthor } from '../services/authorService.js';

export async function getAllAuthorsHandler(req, res, next) {
  try {
    const {
      search = '',
      sortBy = 'name',
      order = 'asc',
      offset = 0,
      limit = 10,
    } = req.query;

    const options = {
      search,
      sortBy,
      order,
      offset: parseInt(offset),
      limit: parseInt(limit),
    };

    const authors = await getAllAuthors(options);
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

export async function updateAuthorHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const data = {};
    if (name) data.name = name.trim();

    const updatedAuthor = await updateAuthor(id, data);
    res.status(200).json(updatedAuthor);
  } catch (err) {
    next(err);
  }
}