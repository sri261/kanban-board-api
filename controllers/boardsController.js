import { db } from "../db.js";

const getBoards = async (req, res) => {
  const { user_id } = req.params;
  db("boards")
    .where("user_id", user_id)
    .then((boards) => {
      res.status(200).json(boards);
    })
    .catch(() => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const addBoard = async (req, res) => {
  const { user_id, title } = req.body;
  try {
    const board = await db("boards").insert({ user_id, title }).returning("*");
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteBoard = async (req, res) => {
  const { board_id } = req.params;
  try {
    await db("boards").where("id", board_id).del();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const editBoard = async (req, res) => {
  const { board_id } = req.params;
  const body = req.body;

  try {
    const board = await db("boards")
      .where("id", board_id)
      .update({ ...body })
      .returning("*");
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getBoards, addBoard, deleteBoard, editBoard };
