import express from "express";
import authRoutes from "./routes/auth.js";
import middlewares from "./middlewares.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = 3000;

app.use(express.json());

app.use(middlewares.checkTokenValidity);

app.use(
  cors({
    origin: process.env.ORIGIN_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
