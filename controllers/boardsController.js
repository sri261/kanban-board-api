import { validationResult } from "express-validator";
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  }

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

const getBoard = async (req, res) => {
  const { board_id } = req.params;
  try {
    const board = await db("boards")
      .select(
        "boards.id as id",
        "boards.title as title",
        "boards.created_at as created_at",
        "boards.updated_at as updated_at",
        db.raw(
          `COALESCE(
          JSON_AGG(
            JSONB_BUILD_OBJECT(
              'id', columns.id,
              'title', columns.title,
              'position', columns.position,
              'cards', COALESCE(
                (SELECT JSON_AGG(
                  JSONB_BUILD_OBJECT(
                    'id', cards.id,
                    'title', cards.title,
                    'description', cards.description,
                    'position', cards.position,
                    'due_date', cards.due_date
                  )
                ) FROM cards WHERE cards.column_id = columns.id), '[]')
            )
          ) FILTER (WHERE columns.id IS NOT NULL), '[]'
        ) AS columns`
        )
      )
      .leftJoin("columns", "boards.id", "columns.board_id")
      .where("boards.id", board_id)
      .groupBy("boards.id");
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getBoards, addBoard, deleteBoard, editBoard, getBoard };
