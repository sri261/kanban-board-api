import queries from "./queries.js";
import pool from "./db.js";
import jwt from "jsonwebtoken";

const secret = "temp_secret";

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const login = (req, res) => {
  const { email, password: userPassword } = req.body;

  pool.query(queries.getUser, [email], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.rows.length === 0) {
      return res.status(500).json({ error: "User does not exist" });
    }
    const { id, password, name } = results.rows[0];
    if (userPassword !== password) {
      return res.status(500).json({ error: "Incorrect Password" });
    }
    const token = jwt.sign({ id, name }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      name,
      token,
    });
  });
};

export default { getUsers, login };
