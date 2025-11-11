import express from "express";
import { getUserProfile, updateUser, updateUserAvatar, getUserPoems, getUserLikedPoems } from "../controllers/userController.js";

const router = express.Router();
import upload from "../middlewares/upload.js";



router.get("/:id", getUserProfile);

router.put("/:id", updateUser);

router.put("/:id/avatar", upload.single("avatar"), updateUserAvatar);

router.get("/:id/poems", getUserPoems);

router.get("/:id/liked", getUserLikedPoems);

export default router;
