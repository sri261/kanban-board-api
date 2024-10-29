import express from "express";
import controller from "../controller.js";

const router = express.Router();

router.post("/login", controller.login);

export default router;
