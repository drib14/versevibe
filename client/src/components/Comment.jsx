import { useState } from 'react';
import { formatDate, formatLastActive } from '../utils/helpers';
import Avatar from './Avatar';
import CommentForm from './CommentForm';

const Comment = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="flex space-x-3">
      <Avatar src={comment.author.profilePic} alt={comment.author.name} size="sm" />
      <div className="flex-1">
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold">{comment.author.name}</p>
            <p className="text-gray-400 text-xs">{formatDate(comment.createdAt)}</p>
          </div>
          <p className="text-gray-300 mt-1">{comment.content}</p>
        </div>
        <div className="flex items-center space-x-4 mt-1">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-gray-400 hover:text-indigo-400 text-xs"
          >
            Reply
          </button>
        </div>
        {showReplyForm && (
          <div className="mt-2">
            <CommentForm
              poemId={comment.poem}
              parentCommentId={comment._id}
              onSubmit={onReply}
              onCancel={() => setShowReplyForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
