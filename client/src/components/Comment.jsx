import { useState } from 'react';
import { formatDate } from '../utils/helpers';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import { toggleLikeComment } from '../api/api';
import useUserStore from '../store/userStore';
import HeartIcon from './icons/HeartIcon';
import toast from 'react-hot-toast';

const renderContent = (content, mentions) => {
  const mentionRegex = /@(\w+)/g;
  const parts = content.split(mentionRegex);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const mention = mentions.find((m) => m.username === part);
      if (mention) {
        return (
          <Link key={index} to={`/profile/${mention._id}`} className="text-indigo-400 hover:underline">
            @{part}
          </Link>
        );
      }
      return `@${part}`;
    }
    return part;
  });
};

const Comment = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { user } = useUserStore();
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(
    user ? comment.likes.some((like) => like._id === user.id) : false
  );
  const [isLikersModalOpen, setIsLikersModalOpen] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const handleLike = async () => {
    try {
      const response = await toggleLikeComment(comment._id);
      setLikes(response.likes);
      setIsLiked(!isLiked);
    } catch (error) {
      toast.error('Failed to like comment');
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <Avatar src={comment.author.profilePic} alt={comment.author.name} size="sm" />
      <div className="flex-1">
        <div className="bg-gray-700 rounded-xl px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold text-sm">{comment.author.name}</p>
            <p className="text-gray-400 text-xs">{formatDate(comment.createdAt)}</p>
          </div>
          <p className="text-gray-300 text-sm mt-1">{renderContent(comment.content, comment.mentions)}</p>
        </div>
        <div className="flex items-center space-x-3 mt-1 pl-2">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-gray-400 hover:text-indigo-400 text-xs font-semibold"
          >
            Reply
          </button>
          <div className="flex items-center space-x-1">
            <HeartIcon isLiked={isLiked} onClick={handleLike} disabled={!user} size="xs" />
            <span
              className="text-gray-400 text-xs cursor-pointer hover:underline"
              onClick={() => setIsLikersModalOpen(true)}
            >
              {likes.length}
            </span>
          </div>
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
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {showAllReplies
              ? comment.replies.map((reply) => (
                  <Comment key={reply._id} comment={reply} onReply={onReply} />
                ))
              : comment.replies.slice(0, 1).map((reply) => (
                  <Comment key={reply._id} comment={reply} onReply={onReply} />
                ))}
            {comment.replies.length > 1 && !showAllReplies && (
              <button
                onClick={() => setShowAllReplies(true)}
                className="text-gray-400 hover:text-white text-xs mt-2"
              >
                View all {comment.replies.length} replies
              </button>
            )}
          </div>
        )}
      </div>
      <LikersModal
        isOpen={isLikersModalOpen}
        onClose={() => setIsLikersModalOpen(false)}
        likers={likes}
      />
    </div>
  );
};

export default Comment;
