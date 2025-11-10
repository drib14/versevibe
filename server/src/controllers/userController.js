import User from "../models/User.js";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";


dotenv.config();

export const getUserProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const id = userId === 'me' ? req.user.id : userId;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, bio } = req.body;
  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.trim();
    if (bio !== undefined) updateData.bio = bio.trim() || '';
    if (!updateData.name || !updateData.email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateUserAvatar = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
      transformation: [{ width: 150, height: 150, crop: "fill" }],
    });
    const user = await User.findByIdAndUpdate(userId, { profilePic: result.secure_url }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error updating user avatar:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const getUserPoems = async (req, res) => {   
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).populate("poems");
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user.poems);
    } catch (error) {
        console.error("Error fetching user poems:", error);
        res.status(500).json({ message: "Internal server error" });
    };
};

export const getUserLikedPoems = async (req, res) => {
    const userId = req.params.id;
    try {
       const user = await User.findById(userId).populate("likedPoems");
       if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        } 
        res.json(user.likedPoems);  
    } catch (error) {
        console.error("Error fetching user liked poems:", error);
        res.status(500).json({ message: "Internal server error" });
    };
};

