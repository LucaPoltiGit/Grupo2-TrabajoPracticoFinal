import { Router } from "express";
import userController from "../controller/userController.js";
import { generateToken } from "../utils/jwt.js";

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

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await userController.getByEmail(email)
console.log(user)
        if(!user) {
            return res.status(404).json({status: "Error", msg: `Usuario con el email ${email} no se encontro`})
        }

        const comparePassword = await user.validatePassword(password)

        if(!comparePassword) {
            return res.status(404).json({status: "Error", msg: `El usuario o contraseña es incorrecto`})
        }

        const payload = {
            id: user.id,
            name: user.name
        }

        const token = generateToken(payload)

        res.cookie("token", token)

        res.status(200).json({status: "success", message: "Usuario logueado correctamente"});
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }
})

router.put("/:uid", async (req, res) => {
    try {
        const {id} = req.params
        const {name, email} = req.body

        const user = await userController.getById(id)

        if(!user) {
            return res.status(404).json({status: "Error", msg: `Usuario con el id ${id} no se encontro`})
        }

        const userModificado = await userController.update(name, email, id)

        res.status(200).json({status: "success", message: `El usuario con el id ${id}, fue modificado correctamente`, payload: userModificado});

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }
})

router.put("/agregarPuntaje/:uid", async (req, res) => {
    try {
        const {id} = req.params
        const {points} = req.body

        const user = await userController.getById(id)

        if(!user) {
            return res.status(404).json({status: "Error", msg: `Usuario con el id ${id} no se encontro`})
        }

        const puntajeFinal = await userController.modifyPoints(id,points)

        res.status(200).json({status: "success", message: `El usuario con el id ${id}, tiene: ${points} puntos`});

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