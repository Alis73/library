import {getAllMedia, 
  getMediaById,
  updateMedia, 
  createMedia, 
  deleteMedia} from '../services/mediaService.js';

  
export async function getAllMediaHandler(req, res, next) {
  try {
    const {
      search = '',
      sortBy = 'title',
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

    const media = await getAllMedia(options);
    res.status(200).json(media);
  } catch (err) {
    next(err);
  }
}

export async function getMediaByIdHandler(req,res,next){
    try{const id = parseInt(req.params.id);
    const media = await getMediaById(id);
        res.status(200).json(media);
    }catch(error){
        next(error);
    }
}

export async function updateMediaHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { title, authorId, publicationYear, mediaType } = req.body;

    const data = {};
    if (title) data.title = title;
    if (authorId) data.authorId = parseInt(authorId);
    if (publicationYear) data.publicationYear = new Date(publicationYear);
    if (mediaType) data.mediaType = mediaType;

    const updatedMedia = await updateMedia(id, data);
    res.status(200).json(updatedMedia);
  } catch (err) {
    next(err);
  }
}

export async function createMediaHandler(req, res, next) {
  try {
    const { title, authorId, publicationYear, mediaType, copies} = req.body;
    const newMedia = await createMedia({ 
      title, 
      authorId: parseInt(authorId),
      publicationYear: new Date(publicationYear),
      mediaType,
      copies: parseInt(copies)
     
    });
    res.status(201).json(newMedia);
  } catch (err) {
    next(err);
  }
}

export async function deleteMediaHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const deletedMedia = await deleteMedia(id);
    res.status(200).json(deletedMedia);
  } catch (err) {
    next(err);
  }
}