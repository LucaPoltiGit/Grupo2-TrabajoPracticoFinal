import {Room,User } from '../models/models.js';

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

const addUser = async(user, room_id)=>{
    const userUpdate = await user.update({RoomRoomId: room_id})
    return userUpdate;
 }
 
 const getCurrentPlayers = async(room_id)=>{
     const currentPlayers = await User.count({ where: { RoomRoomId: room_id } });
     return currentPlayers;
 }
 
 const userExist = async(user_id, room_id)=>{
     const userExists = await User.findOne({where: {id: user_id,RoomRoomId: room_id}})
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