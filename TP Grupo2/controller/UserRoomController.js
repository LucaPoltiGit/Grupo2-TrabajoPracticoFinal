import User from "../models/user.js";
import Room from "../models/room.js";
import UserRoom from "../models/UserRoom.js";

const addUser = async(user_id, room_id)=>{
   const user = await UserRoom.create({user_id,room_id});
   return user;
}

const getCurrentPlayers = async(room_id)=>{
    const currentPlayers = await UserRoom.count({ where: { room_id } });
    return currentPlayers;
}

const userExist = async(user_id, room_id)=>{
    const userExists = await UserRoom.findOne({where: {user_id,room_id}})
    return userExists;
}

export default {
    addUser,
    getCurrentPlayers,
    userExist,
}