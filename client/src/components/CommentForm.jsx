import { useState, useEffect, useRef, forwardRef } from 'react';
import { createComment, searchUsers } from '../api/api';
import Button from './Button';
import toast from 'react-hot-toast';

const CommentForm = forwardRef(({ poemId, parentCommentId, onSubmit, onCancel }, ref) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const text = e.target.value;
    setContent(text);

    const lastAtIndex = text.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const query = text.substring(lastAtIndex + 1);
      setMentionQuery(query);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (mentionQuery) {
      const fetchUsers = async () => {
        try {
          const users = await searchUsers(mentionQuery);
          setSuggestions(users);
        } catch (error) {
          console.error('Failed to search users:', error);
        }
      };
      fetchUsers();
    } else {
      setSuggestions([]);
    }
  }, [mentionQuery]);

  const handleSuggestionClick = (username) => {
    const lastAtIndex = content.lastIndexOf('@');
    const newContent = `${content.substring(0, lastAtIndex)}@${username} `;
    setContent(newContent);
    setShowSuggestions(false);
  };

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
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-start space-x-3">
        <textarea
          ref={ref}
          value={content}
          onChange={handleChange}
          placeholder="Write a comment..."
          className="w-full bg-gray-700 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="1"
        ></textarea>
        <div className="flex space-x-2">
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
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
          {suggestions.map((user) => (
            <div
              key={user._id}
              onClick={() => handleSuggestionClick(user.name)}
              className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default CommentForm;
