import {getAll,
    getByID,
    createUser
} from '../repositories/usersRepo.js';



export async function getAllUsers() {
    console.log('in service');
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

