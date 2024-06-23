import { Router } from "express";
import usersRouters from "../routes/users.routes.js"
import roomsRouters from "../routes/rooms.routes.js"


// import { isLogin } from "../middleware/isLogin.middleware.js";

const router = Router();

router.use("/users", usersRouters);
router.use("/rooms", roomsRouters);


router.get('/', (req, res) => {
    res.send("Bienvenido")
  });

export default router;