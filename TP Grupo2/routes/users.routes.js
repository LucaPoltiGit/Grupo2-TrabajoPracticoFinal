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


router.put("/:uid", async (req, res) => {
    try {
        const {uid} = req.params
        
        const {name, email} = req.body

        const user = await userController.getById(uid)

        if(!user) {
            return res.status(404).json({status: "Error", msg: `Usuario con el id ${uid} no se encontro`})
        }

        const userModificado = await userController.update(name, email, uid)

        const userUpdated = await userController.getById(uid)

        res.status(200).json({status: "success", message: `El usuario con el id ${uid}, fue modificado correctamente`, payload: userUpdated});

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }
})

router.put("/agregarPuntaje/:uid", async (req, res) => {
    try {
        const {uid} = req.params
        const {points} = req.body

        const user = await userController.getById(uid)

        if(!user) {
            return res.status(404).json({status: "Error", msg: `Usuario con el id ${uid} no se encontro`})
        }

        const puntajeFinal = await userController.modifyPoints(uid,points)

        const puntaje = await userController.getById(uid)

        res.status(200).json({status: "success", message: `El usuario con el id ${uid}, tiene: ${puntaje.points} puntos`});

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