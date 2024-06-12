import User from '../models/user.js';

const getAll = async () => {
    const users = await User.findAll()
    return users
}

const getById = async (id) => {
    const userEncontrado = await User.findById(id)
    return userEncontrado
}

const create = async (userData) =>{
    const user = await User.create(userData)
    return user
}


export default {
    getAll,
    getById,
    create,
}