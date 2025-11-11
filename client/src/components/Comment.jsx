import { useState } from 'react';
import { formatDate } from '../utils/helpers';
import Avatar from './Avatar';
import CommentForm from './CommentForm';

const Comment = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="flex items-start space-x-3">
      <Avatar src={comment.author.profilePic} alt={comment.author.name} size="sm" />
      <div className="flex-1">
        <div className="bg-gray-700 rounded-xl px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold text-sm">{comment.author.name}</p>
            <p className="text-gray-400 text-xs">{formatDate(comment.createdAt)}</p>
          </div>
          <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
        </div>
        <div className="flex items-center space-x-3 mt-1 pl-2">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-gray-400 hover:text-indigo-400 text-xs font-semibold"
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
