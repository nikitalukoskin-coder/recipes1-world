import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cuisineRoutes from "./routes/cuisines";
import recipeRoutes from "./routes/recipes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:4000"],
  credentials: true,
}));
app.use(express.json());

// Маршруты
app.use("/api/cuisines", cuisineRoutes);
app.use("/api/recipes", recipeRoutes);

// Тестовый маршрут
app.get("/api/test", (req, res) => {
  res.json({ message: "API работает!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});