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
    const room = await Room.add()
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

const addUser = async(user_id, room_id)=>{
    const user = await Room.create({user_id,room_id});
    return user;
 }
 
 const getCurrentPlayers = async(room_id)=>{
     const currentPlayers = await Room.count({ where: { room_id } });
     return currentPlayers;
 }
 
 const userExist = async(user_id, room_id)=>{
     const userExists = await Room.findOne({where: {user_id,room_id}})
     return userExists;
 }
 

export default {
    getAll,
    getById,
    create,
    deleteOne,
    addUser,
    getCurrentPlayers,
    userExist
}