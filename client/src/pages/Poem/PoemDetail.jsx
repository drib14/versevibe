import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import PoemCard from '../../components/PoemCard';
import Avatar from '../../components/Avatar';
import Loader from '../../components/Loader';
import { getPoemById, toggleLikePoem, getAllPoems } from '../../api/api';
import { formatDate, formatTags } from '../../utils/helpers';
import useUserStore from '../../store/userStore';
import toast from 'react-hot-toast';

const PoemDetail = () => {
  const { id } = useParams();
  const { user } = useUserStore();
  const [poem, setPoem] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [suggestedPoems, setSuggestedPoems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const poemData = await getPoemById(id);
        setPoem(poemData);
        setLikes(poemData.likes.length);
        setIsLiked(user ? poemData.likes.includes(user.id) : false);

       
        const allPoems = await getAllPoems();
        const filteredPoems = allPoems
          .filter((p) => p._id !== id && p.tags.some((tag) => poemData.tags.includes(tag)))
          .slice(0, 3);
        setSuggestedPoems(filteredPoems);
        setLoading(false);
      } catch (error) {
        toast.error(error.message || 'Failed to load poem');
        setLoading(false);
      }
    };
    fetchPoem();
  }, [id, user]);

  const handleLike = async () => {
    try {
      const response = await toggleLikePoem(id);
      setLikes(response.likes);
      setIsLiked(!isLiked);
    } catch (error) {
      toast.error(error.message || 'Failed to toggle like');
    }
  };

  if (loading) return <Loader className="mx-auto mt-12" />;
  if (!poem) return <p className="text-gray-400 text-center mt-12">Poem not found</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-serif text-white mb-4">{poem.title}</h1>
          <div className="flex items-center mb-4">
            <Avatar src={poem.author.profilePic} alt={poem.author.name} size="md" className="mr-3" />
            <div>
              <Link to={`/profile/${poem.author._id}`} className="text-indigo-400 hover:underline">
                {poem.author.name}
              </Link>
              <p className="text-gray-400 text-sm">{formatDate(poem.createdAt)}</p>
            </div>
          </div>
          <p className="text-gray-300 font-serif leading-relaxed mb-6 whitespace-pre-wrap">{poem.content}</p>
          <p className="text-indigo-400 text-sm mb-4">{formatTags(poem.tags)}</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
              disabled={!user}
            >
              <Heart className={`w-5 h-5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            {/* <button className="flex items-center text-gray-400 hover:text-indigo-400">
              <MessageCircle className="w-5 h-5 mr-1" />
              <span>0</span> 
            </button> */  } 
             {/* Comments feature will add later.  */}
          </div>
        </div>
        {suggestedPoems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-serif text-white mb-6">More Like This</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedPoems.map((suggested) => (
                <PoemCard key={suggested._id} poem={suggested} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemDetail;