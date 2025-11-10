import { Link, useNavigate } from "react-router-dom";
import { formatDate, truncateText } from "../utils/helpers";
import useUserStore from "../store/userStore";
import { toggleLikePoem } from "../api/api";
import { useState } from "react";
import toast from "react-hot-toast";
import Avatar from "./Avatar";
import HeartIcon from "./icons/HeartIcon";
import { MessageCircle } from "lucide-react";

const PoemCard = ({ poem }) => {
  const { user, isAuthenticated } = useUserStore();
  const [likes, setLikes] = useState(poem.likes.length);
  const [isLiked, setIsLiked] = useState(
    user ? poem.likes.includes(user.id) : false
  );
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

  // const handleComment = () => {
  //   navigate(`/poem/${poem._id}`);
  // };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar src={poem.author.profilePic} alt={poem.author.name} />
          <div>
            <p className="text-white font-semibold">{poem.author.name}</p>
            <p className="text-gray-400 text-xs">
              {formatDate(poem.createdAt)}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-serif text-white mb-2">{poem.title}</h3>
          <p className="text-gray-300 whitespace-pre-wrap">
            {truncateText(poem.content, 150)}
          </p>
        </div>
      </div>

      <div className="px-4 py-2 bg-gray-900 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <HeartIcon isLiked={isLiked} onClick={handleLike} disabled={!user} />
            <span className="text-gray-400 text-sm">{likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            {/* <CommentIcon onClick={handleComment} />
            <span className="text-gray-400 text-sm">{poem.comments.length}</span> */}
          </div>
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
  );
};

export default PoemCard;
