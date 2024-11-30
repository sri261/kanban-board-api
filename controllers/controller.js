import { db } from "../db.js";

const getColumns = (req, res) => {
  const { board_id } = req.params;
  db("columns")
    .where("board_id", board_id)
    .then((cols) => {
      res.status(200).json(cols);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const addColumns = async (req, res) => {
  try {
    const { title, position } = req.body;
    const { board_id } = req.params;
    const col = await db("columns")
      .insert({ title, position, board_id })
      .returning("*");
    res.status(200).json(col[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const { column_id } = req.params;
    await db("columns").where("id", column_id).del();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const editColumn = async (req, res) => {
  try {
    const { column_id } = req.params;
    const body = req.body;
    const col = await db("columns")
      .where("id", column_id)
      .update({ ...body })
      .returning("*");
    res.status(200).json(col[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default { getColumns, addColumns, deleteColumn, editColumn };
