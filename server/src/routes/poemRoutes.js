import express from "express";
import {
  createPoem,
  getAllPoems,
  getPoemById,
  updatePoem,
  deletePoem,
  toggleLikePoem,
  getRandomPoems,
  getTrendingTags,
} from "../controllers/poemController.js";

const router = express.Router();

router.post("/create", createPoem);

router.get("/trending-tags", getTrendingTags);

router.get("/", getAllPoems);

router.get("/random", getRandomPoems);

router.get("/:id", getPoemById);

router.put("/:id", updatePoem);

router.delete("/:id", deletePoem);

router.put("/:id/like", toggleLikePoem);

export default router;
