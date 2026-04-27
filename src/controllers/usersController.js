import {getAllUsers,
    getUserByID,
    updateUser,
    deleteUser
} from '../services/usersService.js';



export async function getAllUsersHandler(req, res, next) {
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

    const users = await getAllUsers(options);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserByIDHandler(req, res){
    const id = parseInt(req.params.id);
    const user = await getUserByID(id);
    res.status(200).json(user);
}
export async function updateUserHandler(req, res) {
    const id = parseInt(req.body.id);
    const {email, password} = req.body;
    const updatedUser = await updateUser(id, {email, password});
    res.status(200).json(updatedUser);
}

export async function removeUserHandler(req, res) {
    const id = parseInt(req.body.id);
    await deleteUser(id);
    res.status(204).send();
}

export async function getMyProfileHandler(req, res, next) {
  try {
    const id = req.user.id;
    const user = await getUserByID(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
