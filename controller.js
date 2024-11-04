import jwt from "jsonwebtoken";
import { db } from "./db.js";

const secret = "temp_secret";

const login = (req, res) => {
  const { email, password: userPassword } = req.body;
  db("users")
    .where("email", email)
    .first()
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User does not exist" });
      const { id, password, name } = user;
      if (userPassword !== password)
        return res.status(500).json({ error: "Incorrect Password" });
      const token = jwt.sign({ id, name }, secret, {
        expiresIn: "1h",
      });
      res.status(200).json({
        id,
        name,
        token,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};

export default { login };
