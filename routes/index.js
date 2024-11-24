import express from "express";
import controller from "../controllers/controller.js";
import cardsController from "../controllers/cardsController.js";

const router = express.Router();

router.post("/login", controller.login);

router.get("/columns/:board_id", controller.getColumns);
router.post("/columns/:board_id", controller.addColumns);
router.delete("/columns/:column_id", controller.deleteColumn);
router.put("/columns/:column_id", controller.editColumn);

router.get("/cards/:column_id", cardsController.getCards);
router.post("/cards", cardsController.addCard);

export default router;
