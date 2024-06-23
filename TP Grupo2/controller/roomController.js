import Room from '../models/room.js';

const getAll = async () => {
    const rooms = await Room.findAll()
    return rooms
}

const getById = async (id) => {
    const roomEncontrado = await Room.findByPk(id)
    return roomEncontrado
}

const create = async () =>{
    const room = await Room.create()
    return room
}

const deleteOne = async (id) =>{
    const deletedRowCount = await Room.destroy({
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