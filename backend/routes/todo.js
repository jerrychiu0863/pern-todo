import { Router } from "express";
import pool from "../config/db.js";

const todoRouter = Router();

// Get all todos
todoRouter.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo");

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Database Error");
  }
});

// Create a todo
todoRouter.post("/", async (req, res) => {
  try {
    const { description, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description, completed) VALUES($1,$2) RETURNING *",
      [description, completed || false],
    );
    console.log(newTodo.rows[0]);
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
  try {
    const id = req.params["id"];
    const { description, completed } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
      [description, completed, id],
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
  try {
    const id = req.params["id"];
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 ",
      [id],
    );

    res.json({ msg: "Todo has been deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Database Error");
  }
});

export default todoRouter;
