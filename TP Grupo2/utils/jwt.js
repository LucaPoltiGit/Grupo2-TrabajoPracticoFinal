import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

export const generateToken = (payload) => {

  return jwt.sign({ payload }, SECRET, { expiresIn: "6h" });
};

export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};
