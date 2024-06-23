import User from "../models/user.js";
import Room from "../models/room.js";
import UserRoom from "../models/UserRoom.js";

const addUser = async(uid, rid)=>{
   const user = await UserRoom.create({uid,rid});
   return user;
}

const getCurrentPlayers = async(rid)=>{
    const currentPlayers = await UserRoom.count({where: {rid}});
    return currentPlayers;
}

const userExist = async(uid, rid)=>{
    const userExists = await UserRoom.findOne({where: {uid,rid}})
    return userExists;
}

export default {
    addUser,
    getCurrentPlayers,
    userExist,
}