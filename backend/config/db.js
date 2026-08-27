import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log("Connected to database");
});

pool.on("error", (error) => {
  console.log("Database Error: " + error);
});

export default pool;
