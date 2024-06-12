import { Router } from "express";
import usersRouters from "../routes/users.routes.js"
// import { isLogin } from "../middleware/isLogin.middleware.js";

const router = Router();

router.use("/users", usersRouters);

export default router;
