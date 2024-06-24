import { validateToken } from "../utils/jwt.js";

export const validateLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: "Error", msg: "Token no proporcionado" });
    }
    
    const decoded = validateToken(token);
    req.user = decoded.payload;

    next();
  } catch (error) {
    console.error('Error in validateLogin middleware:', error.message);
    res.status(401).json({ status: "Error", msg: "Error de autenticación o el token es inválido" });
  }
};