import { Router } from "express";
import roomController from "../controller/roomController.js";
import userController from "../controller/userController.js";

const router = Router();

router.get("/", async (req, res) => {
    try {

        const rooms = await roomController.getAll()

        res.status(201).json({status: "success", payload: rooms});

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }

})

router.get("/:rid", async (req, res) => {
    try {
        const { rid } = req.params

        const room = await roomController.getById(rid)

        if(!room) {
            return res.status(404).json({status: "Error", msg: `La sala ${uid} no se encontro`})
        }

        res.status(201).json({status: "success", payload: room});

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }

})

router.post("/", async (req, res) => {
    try {
        

        const newroom = await roomController.create()

        res.status(201).json({status: "success", newroom, id:newroom.dataValues.room_id });
        console.log(newroom.dataValues.room_id)
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }
})


router.delete("/:rid", async (req, res)  => {
    try {
        const { rid } = req.params

        const room = await roomController.getById(rid)


        if(!room) {
            return res.status(404).json({status: "Error", msg: `Sala ${rid} no se encontro`})
        }

        await roomController.deleteOne(rid)

        res.status(201).json({status: "success", message: `La sala ${rid} se elimino correctamente`});
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }
})

router.post('/agregarJugador', async(req, res) => {
    try {
        const {user_id, room_id} = req.body;
       

        const user = await userController.getById(user_id);

        if(!user){
         return res.status(404).json({status: 'Error', msg: `No se encontro el user con el id: ${user_id}`})
        }

        const room = await roomController.getById(room_id);

        if(!room){
         return res.status(404).json({status: 'Error', msg: `No se encontro el room con el id: ${room_id}`})
        }
        const currentPlayers = await roomController.getCurrentPlayers(room_id);
        if(currentPlayers >= 2){
            return res.status(400).json({status: 'Error', msg: `La sala ya esta llena`})
        }
        const userExists = await roomController.userExist(user_id,room_id);
        if(userExists){
            return res.status(400).json({status: 'Error', msg: `El usuario ya esta en la sala`})
        }

        const userAdd = await roomController.addUser(user, room_id) 
        
        res.status(200).json({status:'success', payload: userAdd});


    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
})

export default router