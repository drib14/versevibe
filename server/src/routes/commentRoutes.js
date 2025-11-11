import express from 'express';
import { createComment, getCommentsForPoem, toggleLikeComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/:poemId', getCommentsForPoem);
router.put('/:commentId/like', toggleLikeComment);

export default router;
