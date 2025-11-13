import { Link, useNavigate } from "react-router-dom";
import { formatDate, truncateText, formatTags, formatLastActive } from "../utils/helpers";
import useUserStore from "../store/userStore";
import { toggleLikePoem } from "../api/api";
import { useState } from "react";
import toast from "react-hot-toast";
import Avatar from "./Avatar";
import HeartIcon from "./icons/HeartIcon";
import CommentIcon from "./icons/CommentIcon";
import { MessageCircle } from "lucide-react";
import LikersModal from "./LikersModal";
import CommentSection from "./CommentSection";

const PoemCard = ({ poem: initialPoem }) => {
  const { user, isAuthenticated } = useUserStore();
  const [poem, setPoem] = useState(initialPoem);
  const [likes, setLikes] = useState(poem.likes);
  const [isLiked, setIsLiked] = useState(
    user ? poem.likes.some((like) => like._id === user.id) : false
  );
  const [isLikersModalOpen, setIsLikersModalOpen] = useState(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const navigate = useNavigate();

  const isOwnPoem = isAuthenticated && user && poem.author._id === user.id;

  const handleLike = async () => {
    try {
      const response = await toggleLikePoem(poem._id);
      setLikes(response.likes);
      setIsLiked(!isLiked);
    } catch (error) {
      toast.error("Failed to like poem");
    }
  };

  const handleCommentAdded = (updatedPoem) => {
    setPoem(updatedPoem);
  };

  const handleCommentIconClick = () => {
    setIsCommentSectionOpen(!isCommentSectionOpen);
  };

  const renderLikers = () => {
    if (likes.length === 0) {
      return null;
    }

    const likerNames = likes.map((liker) => liker.name);
    if (likes.length === 1) {
      return (
        <span
          className="text-gray-400 text-sm cursor-pointer hover:underline"
          onClick={() => setIsLikersModalOpen(true)}
        >
          {likerNames[0]}
        </span>
      );
    }

    const otherLikersCount = likes.length - 1;
    return (
      <span
        className="text-gray-400 text-sm cursor-pointer hover:underline"
        onClick={() => setIsLikersModalOpen(true)}
      >
        {likerNames[0]} and {otherLikersCount} others
      </span>
    );
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar src={poem.author.profilePic} alt={poem.author.name} />
            <div>
              <p className="text-white font-semibold">{poem.author.name}</p>
              <div className="flex items-center space-x-2">
                <p className="text-gray-400 text-xs">
                  {formatDate(poem.createdAt)}
                </p>
                <div className={`w-2 h-2 rounded-full ${formatLastActive(poem.author.lastActive) === 'Active now' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                <p className="text-gray-400 text-xs">
                  {formatLastActive(poem.author.lastActive)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif text-white mb-2">{poem.title}</h3>
            <p className="text-gray-300 whitespace-pre-wrap">
              {truncateText(poem.content, 150)}
            </p>
            <p className="text-indigo-400 text-sm mt-2">
              {poem.tags.map(tag => (
                <Link key={tag} to={`/explore?tag=${tag}`} className="hover:underline">
                  #{tag}
                </Link>
              )).reduce((prev, curr) => [prev, ' ', curr])}
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-gray-900">
          <div className="flex items-center justify-between mb-2">
            {renderLikers()}
            <span
              className="text-gray-400 text-sm cursor-pointer hover:underline"
              onClick={handleCommentIconClick}
            >
              {poem.totalCommentsCount} comments
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <HeartIcon isLiked={isLiked} onClick={handleLike} disabled={!user} />
              <CommentIcon onClick={handleCommentIconClick} />
            </div>
            {isOwnPoem && (
              <button
                onClick={() => navigate(`/write?edit=${poem._id}`)}
                className="text-indigo-400 hover:text-indigo-300 transition"
                title="Edit poem"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        {isCommentSectionOpen && (
          <div className="p-4">
            <CommentSection
              poemId={poem._id}
              totalCommentsCount={poem.totalCommentsCount}
              onCommentAdded={handleCommentAdded}
              onCommentIconClick={isCommentSectionOpen}
            />
          </div>
        )}
      </div>
      <LikersModal
        isOpen={isLikersModalOpen}
        onClose={() => setIsLikersModalOpen(false)}
        likers={likes}
      />
    </>
  );
};

export default PoemCard;
