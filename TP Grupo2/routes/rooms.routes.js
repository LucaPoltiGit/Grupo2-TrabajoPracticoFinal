import { Router } from "express";
import roomController from "../controller/roomController.js";

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
            return res.status(404).json({status: "Error", msg: `Usuario ${uid} no se encontro`})
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

        res.status(201).json({status: "success", payload: newroom});
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
            return res.status(404).json({status: "Error", msg: `Usuario ${rid} no se encontro`})
        }

        await roomController.deleteOne(room.id)

        res.status(201).json({status: "success", message: `El usuario ${rid}, se elimino correctamente`});
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }
})


export default router