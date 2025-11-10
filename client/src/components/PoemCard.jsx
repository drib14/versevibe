import { Link, useNavigate } from 'react-router-dom';
import { Heart, Pencil } from 'lucide-react'; 
import { formatDate, truncateText, formatTags } from '../utils/helpers';
import useUserStore from '../store/userStore';
import { toggleLikePoem } from '../api/api';
import { useState } from 'react';
import toast from 'react-hot-toast'; 

const PoemCard = ({ poem }) => {
  const { user, isAuthenticated } = useUserStore();
  const [likes, setLikes] = useState(poem.likes.length);
  const [isLiked, setIsLiked] = useState(user ? poem.likes.includes(user.id) : false);
  const navigate = useNavigate(); 

  const isOwnPoem = isAuthenticated && user && poem.author._id === user.id; 

  const handleLike = async () => {
    try {
      const response = await toggleLikePoem(poem._id);
      setLikes(response.likes);
      setIsLiked(!isLiked);
    } catch (error) {
      
      toast.error('Failed to like poem');
    }
  };

  const handleEdit = () => {
    navigate(`/write?edit=${poem._id}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <Link to={isAuthenticated ? `/poem/${poem._id}` : `/login`} className="flex-1">
          <h3 className="text-xl font-serif text-white mb-2">{poem.title}</h3>
        </Link>
        {isOwnPoem && (
          <button
            onClick={handleEdit}
            className="text-indigo-400 hover:text-indigo-300 transition ml-2"
            title="Edit poem"
          >
            <Pencil className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-gray-300 font-serif leading-relaxed mb-4">{truncateText(poem.content, 100)}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={poem.author.profilePic || '/assets/avatars/default.png'}
            alt={poem.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-gray-300 text-sm">{poem.author.name}</p>
            <p className="text-gray-400 text-xs">{formatDate(poem.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLike}
            className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
            disabled={!user}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="ml-1 text-sm">{likes}</span>
          </button>
        </div>
      </div>
      <p className="text-indigo-400 text-sm mt-2">{formatTags(poem.tags)}</p>
    </div>
  );
};

export default PoemCard;