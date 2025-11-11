import Comment from '../models/Comment.js';
import Poem from '../models/Poem.js';
import User from '../models/User.js';

export const createComment = async (req, res) => {
  try {
    const { content, poemId, parentCommentId } = req.body;
    const author = req.user.id;

    // Handle mentions
    const mentions = [];
    const mentionRegex = /@(\w+)/g;
    let match;
    while ((match = mentionRegex.exec(content)) !== null) {
      const username = match[1];
      const user = await User.findOne({ username: username });
      if (user) {
        mentions.push(user._id);
      }
    }

    const newComment = new Comment({
      content,
      author,
      poem: poemId,
      parentComment: parentCommentId,
      mentions,
    });

    await newComment.save();

    // If it's a reply, update the parent comment
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: newComment._id },
      });
    }

    // Update the poem's total comment count
    await Poem.findByIdAndUpdate(poemId, {
      $push: { comments: newComment._id },
      $inc: { totalCommentsCount: 1 },
    });

    const populatedComment = await Comment.findById(newComment._id).populate('author', 'name profilePic');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

export const getCommentsForPoem = async (req, res) => {
  try {
    const { poemId } = req.params;
    const comments = await Comment.find({ poem: poemId, parentComment: null })
      .populate('author', 'name profilePic')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'name profilePic',
        },
      })
      .populate('mentions', 'name _id');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

export const toggleLikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const likeIndex = comment.likes.indexOf(userId);
    if (likeIndex === -1) {
      comment.likes.push(userId);
    } else {
      comment.likes.splice(likeIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment', error: error.message });
  }
};
