import { Router } from "express";
import userController from "../controller/userController.js";

const router = Router();

router.get("/", async (req, res) => {
    try {

        const users = await userController.getAll()

        res.status(201).json({status: "success", payload: users});

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }

})

router.get("/:uid", async (req, res) => {
    try {
        const { uid } = req.params

        const user = await userController.getById(uid)

        if(!user) {
            return res.status(404).json({status: "Error", msg: `Usuario ${uid} no se encontro`})
        }

        res.status(201).json({status: "success", payload: user});

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }

})

router.post("/", async (req, res) => {
    try {
        const userData = req.body;

        const newUser = await userController.create(userData)

        res.status(201).json({status: "success", payload: newUser});
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }
})


router.delete("/:uid", async (req, res)  => {
    try {
        const { uid } = req.params

        const user = await userController.getById(uid)

        if(!user) {
            return res.status(404).json({status: "Error", msg: `Usuario ${uid} no se encontro`})
        }

        await userController.deleteOne(user.id)

        res.status(201).json({status: "success", message: `El usuario ${uid}, se elimino correctamente`});
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }
})
export default router