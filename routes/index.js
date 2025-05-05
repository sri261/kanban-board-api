import express from "express";
import controller from "../controllers/controller.js";
import cardsController from "../controllers/cardsController.js";
import authController from "../controllers/authController.js";
import boardsController from "../controllers/boardsController.js";
import { checkSchema } from "express-validator";
import { validationSchemas } from "../utils/validationSchemas.js";

const router = express.Router();

router.post(
  "/login",
  checkSchema(validationSchemas.authValidationSchemas.loginValidationSchema),
  authController.login
);
router.post(
  "/signup",
  checkSchema(validationSchemas.authValidationSchemas.signupValidation),
  authController.signup
);
router.post(
  "/refresh",
  checkSchema(validationSchemas.authValidationSchemas.refreshTokenValidation),
  authController.refresh
);

router.get("/columns/:board_id", controller.getColumns);
router.post(
  "/columns/:board_id",
  checkSchema(validationSchemas.columnValidationSchemas.addColumn),
  controller.addColumns
);
router.delete("/columns/:column_id", controller.deleteColumn);
router.put("/columns/:column_id", controller.editColumn);

router.get("/cards/:column_id", cardsController.getCards);
router.post(
  "/card",
  checkSchema(validationSchemas.cardValidationSchemas.addCard),
  cardsController.addCard
);
router.delete("/card/:card_id", cardsController.deleteCard);
router.put("/card/:card_id", cardsController.editCard);

router.get("/boards", boardsController.getBoards);

router.post(
  "/board",
  checkSchema(
    validationSchemas.boardValidationSchemas.addBoardValidationSchema
  ),
  boardsController.addBoard
);
router.delete("/board/:board_id", boardsController.deleteBoard);
router.put("/board/:board_id", boardsController.editBoard);

router.get("/board/:board_id", boardsController.getBoard);

export default router;
