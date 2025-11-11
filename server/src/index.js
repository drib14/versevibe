import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import poemRoutes from "./routes/poemRoutes.js";
import { updateLastActive } from "./middlewares/updateLastActive.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

dotenv.config()
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, updateLastActive, userRoutes);
app.use("/api/poems", authMiddleware, updateLastActive, poemRoutes);

app.get("/", (req, res) => {
  res.send("VerseVibe backend is live");
});


app.get("/api/test", (req, res) => {
  res.json({ message: "VerseVibe backend is running successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
