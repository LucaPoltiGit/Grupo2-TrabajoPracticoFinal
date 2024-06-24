import { Router } from "express";
import usersRouters from "../routes/users.routes.js"
import roomsRouters from "../routes/rooms.routes.js"
import authRouters from "../routes/auth.routes.js"
import { validateLogin } from "../middlewares/validateLogin.js";

const router = Router();

router.use("/auth", authRouters);
router.use("/users",validateLogin, usersRouters);
router.use("/rooms", roomsRouters);


router.get('/', (req, res) => {
    res.send("Bienvenido")
  });

export default router;