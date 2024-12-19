import { validationResult } from "express-validator";
import { db } from "../db.js";
import _ from "lodash";

const getCards = async (req, res) => {
  const { id } = req.user;
  const { column_id } = req.params;
  try {
    const cards = await db("cards")
      .join("columns", "cards.column_id", "columns.id")
      .join("boards", "columns.board_id", "boards.id")
      .where("column_id", column_id)
      .andWhere("boards.user_id", id);
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCard = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty())
    return res.status(400).json(validationErrors);
  const { column_id, title, description, position } = req.body;
  try {
    const card = await db("cards")
      .insert({ column_id, title, description, position })
      .returning("*");
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.user;
  const { card_id } = req.params;
  try {
    const card = await db("cards")
      .join("columns", "cards.column_id", "columns.id")
      .join("boards", "columns.board_id", "boards.id")
      .where("cards.id", card_id)
      .andWhere("boards.user_id", id)
      .del();
    if (!card) return res.status(400).json({ message: "Card does not exist" });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const editCard = async (req, res) => {
  const { card_id } = req.params;
  const body = req.body;

  try {
    const card = await db("cards")
      .where("id", card_id)
      .update({ ...body })
      .returning("*");
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getCards, addCard, deleteCard, editCard };
