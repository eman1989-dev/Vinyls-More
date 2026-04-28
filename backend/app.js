import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";
import dotenv from "dotenv";
import carrito from "./routes/carritoRoute.js";
import orden from "./routes/ordenRoute.js";
import review from "./routes/reviewRoute.js";
import segunda from "./routes/segundaRoute.js";
import user from "./routes/usuarioRoute.js";
import product from "./routes/productoRoute.js";

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json());

//Rutas
app.use("/api/carrito", carrito);
app.use("/api/orden", orden);
app.use("/api/review", review);
app.use("/api/segunda", segunda);
app.use("/api/user", user);
app.use("/api/product", product);


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});