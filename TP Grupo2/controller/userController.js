import {User} from '../models/models.js';

const getAll = async () => {
    const users = await User.findAll()
    return users
}

const getById = async (id) => {
    const userEncontrado = await User.findByPk(id)
    return userEncontrado
}

const create = async (userData) =>{
    const user = await User.create(userData)
    return user
}

const deleteOne = async (id) =>{
    const deletedRowCount = await User.destroy({
        where: {
          id: id
        }
      });

      if(deletedRowCount === 0) return false
      return true;
}


export default {
    getAll,
    getById,
    create,
    deleteOne,
}