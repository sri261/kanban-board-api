import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { validationResult } from "express-validator";

const generateAccessTokenAndRefreshToken = async ({ id, name }) => {
  const access_token = jwt.sign({ id, name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  const refresh_token = jwt.sign(
    { id, name },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  await db("users").where("id", id).update({ refresh_token });

  return { access_token, refresh_token };
};

const login = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty())
    return res.status(400).json(validationErrors);

  const { email, password: userPassword } = req.body;
  try {
    const user = await db("users").where("email", email).first();
    if (!user) return res.status(404).json({ error: "User does not exist" });
    const { id, password, name } = user;
    if (userPassword !== password)
      return res.status(500).json({ error: "Incorrect Password" });

    const { access_token, refresh_token } =
      await generateAccessTokenAndRefreshToken({
        id,
        name,
      });

    res.status(200).json({
      id,
      name,
      access_token,
      refresh_token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const refresh = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty())
    return res.status(400).json(validationErrors);

  const { refresh_token: incoming_refresh_token } = req.body;

  try {
    const { name, id, refresh_token } = await db("users")
      .where("refresh_token", incoming_refresh_token)
      .first();

    if (incoming_refresh_token !== refresh_token) {
      return res.status(401).json({ error: "Forbidden" });
    }

    const { access_token, refresh_token: new_refresh_token } =
      await generateAccessTokenAndRefreshToken({
        id,
        name,
      });

    res
      .status(200)
      .json({ id, name, access_token, refresh_token: new_refresh_token });
  } catch (error) {
    res.status(401).json(error);
  }
};

export default { login, refresh };
