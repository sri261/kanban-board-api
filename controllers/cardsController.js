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

export default { getCards };
