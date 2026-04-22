import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});