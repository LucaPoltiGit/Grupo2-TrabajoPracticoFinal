import {User} from '../models/models.js';

const getAll = async () => {
    const users = await User.findAll()
    return users
}

const getById = async (id) => {
    const userEncontrado = await User.findByPk(id)
    return userEncontrado
}

const getByEmail = async (email) => {
    const userEncontrado = await User.findOne({where: {email: email}})
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

const update = async (name, email, id) =>{
    const userModificado = await User.update({name, email}, {where: {id}})
    return userModificado
}

const modifyPoints = async (user, points) =>{
    const id = user.id
    const puntajeGanado = user.points + points
    const puntajeFinal = await User.update({points: puntajeGanado}, {where: {id} }) 
    return puntajeFinal
}

export default {
    getAll,
    getById,
    create,
    deleteOne,
    getByEmail,
    update,
    modifyPoints,
}