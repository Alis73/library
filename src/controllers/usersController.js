import {getAllUsers,
    getUserByID,
    updateUser
} from '../services/usersService.js';



export async function getAllUsersHandler(req, res){
    let users = await getAllUsers();
    res.status(200).json(users);
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