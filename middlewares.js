import jwt from "jsonwebtoken";
import { secret } from "./controller.js";

const checkTokenValidity = (req, res, next) => {
  if (req.path === "/api/login") {
    next();
  } else {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const isValid = jwt.verify(token, secret);
        if (isValid) next();
      } catch (error) {
        res.status(401).json(error);
      }
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  }
};

export default { checkTokenValidity };
