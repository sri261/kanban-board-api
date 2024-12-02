import express from "express";
import controller from "../controllers/controller.js";
import cardsController from "../controllers/cardsController.js";
import authController from "../controllers/authController.js";
import boardsController from "../controllers/boardsController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

router.get("/columns/:board_id", controller.getColumns);
router.post("/columns/:board_id", controller.addColumns);
router.delete("/columns/:column_id", controller.deleteColumn);
router.put("/columns/:column_id", controller.editColumn);

router.get("/cards/:column_id", cardsController.getCards);
router.post("/card", cardsController.addCard);
router.delete("/card/:card_id", cardsController.deleteCard);
router.put("/card/:card_id", cardsController.editCard);

router.get("/boards/:user_id", boardsController.getBoards);
router.post("/board", boardsController.addBoard);
router.delete("/board/:board_id", boardsController.deleteBoard);
router.put("/board/:board_id", boardsController.editBoard);

export default router;
