import express from "express";
import controller from "../controller.js";

const router = express.Router();

router.post("/login", controller.login);

router.get("/columns/:board_id", controller.getColumns);

export default router;
