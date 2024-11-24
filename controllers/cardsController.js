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
  const { column_id, title, description, position } = req.body;
  try {
    const card = await db("cards")
      .insert({ column_id, title, description, position })
      .returning("*");
    console.log(card);
    res.status(200).json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteCard = async () => {};

const editCard = async () => {};

export default { getCards, addCard, deleteCard, editCard };
