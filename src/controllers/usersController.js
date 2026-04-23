import {getAllUsers,
    getUserByID
} from '../services/usersService.js';



export async function getAllUsersHandler(req, res){
    console.log('in controler');
    let users = await getAllUsers();
    res.status(200).json(users);
}

export async function getUserByIDHandler(req, res){
    const id = parseInt(req.params.id);
    const user = await getUserByID(id);
    res.status(200).json(user);
}
