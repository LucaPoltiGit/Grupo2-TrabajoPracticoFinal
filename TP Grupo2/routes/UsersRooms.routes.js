
import { Router } from "express";
import UserRoomController from "../controller/UserRoomController.js";
import userController from "../controller/userController.js";
import roomController from "../controller/roomController.js";

const router = Router();

router.post('/agregarJugador', async(req, res) => {
    try {
        const {user_id, room_id} = req.body;

       

        const user = await userController.getById(user_id);
        
        if(!user){
         return res.status(404).json({status: 'Error', msg: `No se encontro el user con el id: ${user_id}`})
        }

        const room = await roomController.getById(room_id);
        // console.log(room)
        if(!room){
         return res.status(404).json({status: 'Error', msg: `No se encontro el room con el id: ${room_id}`})
        }
        // const currentPlayers = await UserRoomController.getCurrentPlayers(room_id);
        // if(currentPlayers >= 2){
        //     return res.status(400).json({status: 'Error', msg: `La sala ya esta llena`})
        // }
        // const userExists = await UserRoomController.userExist(user_id,room_id);
        // if(userExists){
        //     return res.status(400).json({status: 'Error', msg: `El usuario ya esta en la sala`})
        // }

        const userAdd = await UserRoomController.addUser(user_id, room_id) 
        
        res.status(200).json({status:'success', payload: userAdd});


    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
})

export default router