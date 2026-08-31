import { Router } from "express";
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect } from "../../../pern-auth/backend/middleware/auth.js";

const authRouter = Router();
const saltRounds = 10;
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
};

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Email has not been registered" });
    }
    const hashedPassword = result.rows[0].password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
      const user = {
        id: result.rows[0].id,
        email: result.rows[0].email,
      };
      const token = generateToken(user.id, user.email);
      res.cookie("token", token, cookieOptions);
      res.status(201).json(user);
    } else {
      res.status(400).json({ message: "Password is not correct" });
    }
  } catch (err) {
    console.log(err);
    (res.status(500), json("Database error :" + err));
  }
});

// Register
authRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length !== 0) {
      return res.status(400).json({ message: "Email has been registered" });
    }
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const newUser = await pool.query(
        "INSERT INTO users(email, password) VALUES($1, $2) RETURNING id, email",
        [email, hash],
      );
      // const { id, email } = newUser.rows[0];
      const token = generateToken(newUser.rows[0].id, newUser.rows[0].email);
      res.cookie("token", token, cookieOptions);
      res.json(newUser.rows[0]);
    });
  } catch (err) {
    console.log(err);
    (res.status(500), json("Database error :" + err));
  }
});

// me
authRouter.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

export default authRouter;
