import Poem from "../models/Poem.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const createPoem = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const author = req.user.id;

    const newPoem = new Poem({
      title,
      content,
      author,
      likes: [],
      tags: tags || [],
    });

    await newPoem.save();

    await User.findByIdAndUpdate(author, {
      $push: { poems: newPoem._id },
    });

    res.status(201).json({
      message: "Poem created successfully",
      poem: newPoem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating poem",
      error: error.message,
    });
  }
};

export const getAllPoems = async (req, res) => {
  try {
    const poems = await Poem.find()
      .populate("author", "name profilePic")
      .sort({ createdAt: -1 });
    res.status(200).json(poems);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching poems",
      error: error.message,
    });
  }
};

export const getPoemById = async (req, res) => {
  const { id } = req.params;
  try {
    const poem = await Poem.findById(id).populate("author", "name profilePic");
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    res.status(200).json(poem);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching poem",
      error: error.message,
    });
  }
};

export const updatePoem = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;

  try {
    const updatedPoem = await Poem.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true }
    ).populate("author", "name email profilePic");

    if (!updatedPoem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    res.status(200).json(updatedPoem);
  } catch (error) {
    res.status(500).json({
      message: "Error updating poem",
      error: error.message,
    });
  };
};

export const deletePoem = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedPoem = await Poem.findByIdAndDelete(id);
        if(!deletedPoem){
            return res.status(404).json({message: "Poem not found"});
        }
        res.status(200).json({message: "Poem deleted successfully"});
    } catch (error) {
        res.status(500).json({
            message: "Error deleting poem",
            error: error.message,
        });
    }
};

export const toggleLikePoem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid poem ID" });
    }
    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const likeIndex = poem.likes.indexOf(userId);
    if (likeIndex === -1) {
      poem.likes.push(userId);
      user.likedPoems.push(id);
    } else {
      poem.likes.splice(likeIndex, 1);
      user.likedPoems = user.likedPoems.filter((poemId) => poemId.toString() !== id);
    }
    await poem.save();
    await user.save();
    res.status(200).json({ message: "Poem like toggled", likes: poem.likes.length });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Error toggling like", error: error.message });
  }
};