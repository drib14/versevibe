import { useState, useEffect, useRef } from 'react';
import { getCommentsForPoem } from '../api/api';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { toast } from 'react-hot-toast';

const CommentSection = ({ poemId, totalCommentsCount, onCommentIconClick, onCommentAdded }) => {
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const commentInputRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentsForPoem(poemId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchComments();
  }, [poemId]);

  useEffect(() => {
    if (onCommentIconClick) {
      commentInputRef.current?.focus();
    }
  }, [onCommentIconClick]);

  const handleNewComment = (response) => {
    const { newComment, updatedPoem } = response;
    if (newComment.parentComment) {
      setComments(
        comments.map((c) =>
          c._id === newComment.parentComment ? { ...c, replies: [...(c.replies || []), newComment] } : c
        )
      );
    } else {
      setComments([...comments, newComment]);
    }
    toast.success('Comment posted successfully!');
    onCommentAdded(updatedPoem);
  };

  const renderComments = (commentList) => {
    return commentList.map((comment) => (
      <div key={comment._id} className="relative pl-8">
        <div className="absolute top-0 left-4 w-px bg-gray-600 h-full"></div>
        <Comment comment={comment} onReply={handleNewComment} />
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">{renderComments(comment.replies)}</div>
        )}
      </div>
    ));
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-serif text-white mb-6" onClick={() => commentInputRef.current?.focus()}>
        Comments ({totalCommentsCount})
      </h2>
      <div className="mb-6">
        <CommentForm poemId={poemId} onSubmit={handleNewComment} ref={commentInputRef} />
      </div>
      <div className="space-y-6">{renderComments(displayedComments)}</div>
      {comments.length > 3 && !showAllComments && (
        <button
          onClick={() => setShowAllComments(true)}
          className="text-gray-400 hover:text-white mt-4"
        >
          View all comments
        </button>
      )}
    </div>
  );
};

export default CommentSection;
