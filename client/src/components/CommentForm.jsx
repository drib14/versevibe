import { useState } from 'react';
import { createComment } from '../api/api';
import Button from './Button';
import toast from 'react-hot-toast';

const CommentForm = ({ poemId, parentCommentId, onSubmit, onCancel }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const newComment = await createComment({
        content,
        poemId,
        parentCommentId,
      });
      onSubmit(newComment);
      setContent('');
    } catch (error) {
      toast.error('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows="3"
      ></textarea>
      <div className="flex justify-end space-x-2 mt-2">
        {onCancel && (
          <Button onClick={onCancel} variant="secondary" size="sm">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" size="sm" loading={loading}>
          Post
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
