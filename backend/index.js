import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import todoRouter from "./routes/todo.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Router
app.use("/todo", todoRouter);

app.get("/:id", (req, res) => {
  console.log(req.params["id"]);
  res.send(req.params["id"]);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}!`);
});
