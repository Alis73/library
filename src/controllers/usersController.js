import {getAllUsers} from '../services/usersService.js';



export async function getAllUsersHandler(req, res){
    console.log('in controler');
    let users = await getAllUsers();
    res.status(200).json(users);
}
