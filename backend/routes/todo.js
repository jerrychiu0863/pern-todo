import { Router } from "express";
import pool from "../config/db.js";
import { protect } from "../middleware/auth.js";

const todoRouter = Router();

todoRouter.use(protect);

// Get all todos
todoRouter.get("/all", async (req, res) => {
  const { id } = req.user;
  try {
    const result = await pool.query(
      "SELECT * FROM todo WHERE created_by = $1 ORDER BY created_at",
      [id],
    );
    if (result.rows !== 0) {
      return res.json(result.rows);
    }
    return res.status(400).json({ msg: "Failed to fetch todos!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Database Error");
  }
});

// Create a todo
todoRouter.post("/", async (req, res) => {
  const { id } = req.user;
  try {
    const { description, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description, completed, created_by) VALUES($1,$2,$3) RETURNING *",
      [description, completed || false, id],
    );
    // console.log(newTodo.rows[0]);
    res.json(newTodo.rows[0]);
    // res.json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Database Error");
  }
});

// Update todo
// todoRouter.patch("/update", async (req, res) => {
//   try {
//     const { todo_id, description, completed } = req.body;
//     const updatedTodo = await pool.query(
//       "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
//       [description, completed, todo_id],
//     );

//     res.json(updatedTodo.rows[0]);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Database Error");
//   }
// });
todoRouter.put("/:id", async (req, res) => {
  const { id: todoId } = req.params;
  const { id: userId } = req.user;
  const { description, completed } = req.body;
  try {
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 AND created_by = $4 RETURNING *",
      [description, completed, todoId, userId],
    );

    if (updatedTodo.rows.length === 0) {
      return res.status(404).json({ msg: "Todo not found!" });
    }

    res.json(updatedTodo.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Database Error");
  }
});

// Delete todo
todoRouter.delete("/:id", async (req, res) => {
  const { id: todoId } = req.params;
  const { id: userId } = req.user;
  try {
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 AND created_by = $2",
      [todoId, userId],
    );

    res.json({ msg: "Todo has been deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Database Error");
  }
});

export default todoRouter;
