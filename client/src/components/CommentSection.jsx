import { useState, useEffect } from 'react';
import { getCommentsForPoem } from '../api/api';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentSection = ({ poemId }) => {
  const [comments, setComments] = useState([]);

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

  const handleNewComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const renderComments = (parentId = null) => {
    return comments
      .filter((comment) => comment.parentComment === parentId)
      .map((comment) => (
        <div key={comment._id} className="ml-4">
          <Comment comment={comment} onReply={handleNewComment} />
          {renderComments(comment._id)}
        </div>
      ));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-serif text-white mb-6">Comments</h2>
      <div className="mb-6">
        <CommentForm poemId={poemId} onSubmit={handleNewComment} />
      </div>
      <div className="space-y-6">{renderComments()}</div>
    </div>
  );
};

export default CommentSection;
