import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const protect = async (req, res, next) => {
  try {
    // console.log(req.cookies.token);
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Not authorized!" });
    }

    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const user = await pool.query("SELECT id, email FROM users WHERE id = $1", [
      decoded.id,
    ]);
    console.log(user.rows[0]);
    req.json(user.rows[0]);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json("Database error" + err);
  }
};
