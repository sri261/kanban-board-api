import jwt from "jsonwebtoken";

const publicRoutes = ["/api/login", "/api/refresh", "/api/signup"];

const checkTokenValidity = (req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    next();
  } else {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const isValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
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
