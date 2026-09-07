import { Router } from "express";
import pool from "../config/db.js";

const orderRouter = Router();

orderRouter.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, 
    title, 
    to_char(order_date, 'YYYY-MM-DD') AS date, 
    to_char(start_at, 'YYYY-MM-DD"T"HH24:MI:SS') AS start,
    to_char(end_at, 'YYYY-MM-DD"T"HH24:MI:SS') AS end 
    FROM orders`,
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});

orderRouter.post("/", async (req, res) => {
  const { title, order_date, start_at, end_at } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO orders(title, order_date, start_at, end_at) VALUES($1, $2, $3, $4) 
      RETURNING id, 
      title, 
      to_char(order_date, 'YYYY-MM-DD') AS date, 
      to_char(start_at, 'YYYY-MM-DD"T"HH24:MI:SS') AS start,
      to_char(end_at, 'YYYY-MM-DD"T"HH24:MI:SS') AS end `,
      [title, order_date, start_at, end_at],
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});

export default orderRouter;
