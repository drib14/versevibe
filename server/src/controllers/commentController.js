import Comment from '../models/Comment.js';
import Poem from '../models/Poem.js';

export const createComment = async (req, res) => {
  try {
    const { content, poemId, parentCommentId } = req.body;
    const author = req.user.id;

    const newComment = new Comment({
      content,
      author,
      poem: poemId,
      parentComment: parentCommentId,
    });

    await newComment.save();

    await Poem.findByIdAndUpdate(poemId, {
      $push: { comments: newComment._id },
      $inc: { commentCount: 1 },
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

export const getCommentsForPoem = async (req, res) => {
  try {
    const { poemId } = req.params;
    const comments = await Comment.find({ poem: poemId }).populate('author', 'name profilePic');
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
