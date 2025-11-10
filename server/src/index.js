import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import poemRoutes from "./routes/poemRoutes.js";

dotenv.config()
const app = express();

app.use(express.json());
app.use(cors({ origin: 'https://versespace.vercel.app' }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/poems", poemRoutes);

app.get("/", (req, res) => {
  res.send("VerseSpace backend is live");
});


app.get("/api/test", (req, res) => {
  res.json({ message: "VerseSpace backend is running successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
