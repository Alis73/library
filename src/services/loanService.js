import {getAll} from '../repositories/loanRepo.js';


export async function getAllLoans(){
    return await getAll();
}