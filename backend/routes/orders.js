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
    to_char(end_at, 'YYYY-MM-DD"T"HH24:MI:SS') AS end,
    description 
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
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});

orderRouter.put("/:order_id", async (req, res) => {
  const orderId = req.params["order_id"];
  const { title, order_date, start_at, end_at } = req.body;
  console.log(orderId);
  console.log(req.body);
  try {
    const updatedOrder = await pool.query(
      `UPDATE orders SET title = $1, order_date = $2, start_at = $3,end_at = $4 WHERE id = $5  
      RETURNING 
      id, 
      title, 
      to_char(order_date, 'YYYY-MM-DD') AS date, 
      to_char(start_at, 'YYYY-MM-DD"T"HH24:MI:SS') AS start,
      to_char(end_at, 'YYYY-MM-DD"T"HH24:MI:SS') AS end`,
      [title, order_date, start_at, end_at, orderId],
    );
    res.json(updatedOrder.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});

orderRouter.delete("/:order_id", async (req, res) => {
  const orderId = req.params["order_id"];
  try {
    await pool.query("DELETE FROM orders WHERE id = $1", [orderId]);
    res.json({ message: "Order has been deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});

export default orderRouter;
