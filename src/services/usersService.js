import {getAll} from '../repositories/usersRepo.js';



export async function getAllUsers() {
    console.log('in service');
  return getAll();
}