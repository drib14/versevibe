import express from "express";
import {
  createPoem,
  getAllPoems,
  getPoemById,
  updatePoem,
  deletePoem,
  toggleLikePoem,
} from "../controllers/poemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createPoem);

router.get("/", getAllPoems);

router.get("/:id", authMiddleware, getPoemById);

router.put("/:id", authMiddleware, updatePoem);

router.delete("/:id", authMiddleware, deletePoem);

router.put("/:id/like", authMiddleware, toggleLikePoem);

export default router;
