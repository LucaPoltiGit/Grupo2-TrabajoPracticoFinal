import User from "../models/user.js";
import Room from "../models/room.js";
import UserRoom from "../models/UserRoom.js";
import { Router } from "express";
import UserRoomController from "../controller/UserRoomController.js";
import userController from "../controller/userController.js";
import roomController from "../controller/roomController.js";

const router = Router();

router.post('/agregarJugador', async(req, res) => {
    try {
        const {uid, rid} = req.body;

       

        const user = await userController.getById(uid);
        
        if(!user){
         return res.status(404).json({status: 'Error', msg: `No se encontro el user con el id: ${uid}`})
        }

        const room = await roomController.getById(rid);
        console.log(room)
        if(!room){
         return res.status(404).json({status: 'Error', msg: `No se encontro el room con el id: ${rid}`})
        }
        const currentPlayers = await UserRoomController.getCurrentPlayers(rid);
        if(currentPlayers >= 2){
            return res.status(400).json({status: 'Error', msg: `La sala ya esta llena`})
        }
        const userExists = await UserRoomController.userExist(uid,rid);
        if(userExists){
            return res.status(400).json({status: 'Error', msg: `El usuario ya esta en la sala`})
        }

        const userAdd = await UserRoomController.addUser(uid, rid) 
        
        res.status(200).json({status:'success', payload: userAdd});


    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
})

export default router