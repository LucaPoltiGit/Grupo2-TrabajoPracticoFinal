import { validateToken } from "../utils/tokens.js";

export const validateLogin = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Error, token incorrecto");
    const { payload } = validateToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};
