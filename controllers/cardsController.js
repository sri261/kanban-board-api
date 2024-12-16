import { validationResult } from "express-validator";
import { db } from "../db.js";

const getCards = async (req, res) => {
  const { column_id } = req.params;
  db("cards")
    .where("column_id", column_id)
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch(() => {
      res.status(500).json({ error: "Internal Server Error" });
    });
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
  const { card_id } = req.params;
  try {
    await db("cards").where("id", card_id).del();
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
