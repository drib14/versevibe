import express from "express";
import { getUserProfile, updateUser, updateUserAvatar, getUserPoems, getUserLikedPoems } from "../controllers/userController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();
import upload from "../middlewares/upload.js";



router.get("/:id", authMiddleware, getUserProfile);

router.put("/:id", authMiddleware, updateUser);

router.put("/:id/avatar", authMiddleware, upload.single("avatar"), updateUserAvatar);

router.get("/:id/poems", authMiddleware, getUserPoems);

router.get("/:id/liked", authMiddleware, getUserLikedPoems);

export default router;
