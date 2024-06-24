import { Router } from "express";
import userController from "../controller/userController.js";
import { generateToken } from "../utils/jwt.js";

const router = Router();


router.post("/register", async (req, res) => {
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
      const { email, password } = req.body;
      const user = await userController.getByEmail(email);
      
      if (!user) {
        return res.status(404).json({ status: "Error", msg: `Usuario con el email ${email} no se encontró` });
      }
  
      const comparePassword = await user.validatePassword(password);
  
      if (!comparePassword) {
        return res.status(404).json({ status: "Error", msg: "El usuario o contraseña es incorrecto" });
      }
  
      const payload = {
          id: user.id,
          name: user.name 
        };
      const token = generateToken(payload);
  
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ status: "success", message: "Usuario logueado correctamente" });
    } catch (error) {
      console.error('Error in login route:', error.message);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  });

  router.post("/logout", (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ status: "success", message: "Sesión cerrada exitosamente" });
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  });
  

export default router