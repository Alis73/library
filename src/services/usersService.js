import {getAll,
    getByID,
    createUser,
    update,
    remove

} from '../repositories/usersRepo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export async function getAllUsers() {
  return getAll();
}

export async function getUserByID(ID){
    const user = await getByID(ID);
    if(user)return user;
    else{
        const error = new Error(`User with id ${ID} does not exist`);
        error.status= 404;
        throw error;
    }
}
export async function updateUser(id, updatedData) {
    const dataToUpdate = {};

  if (updatedData.email) {
    dataToUpdate.email = updatedData.email;
  }

  if (updatedData.password) {
    dataToUpdate.password = await bcrypt.hash(updatedData.password, 10);
  }

  const updatedUser = await update(id, dataToUpdate);

  if (updatedUser) return updatedUser;

  const error = new Error('User not found');
  error.status = 404;
  throw error;
}

export async function deleteUser(id) {
    const deletedUser = await remove(id);
    if (deletedUser) return deletedUser;
    else {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
}

