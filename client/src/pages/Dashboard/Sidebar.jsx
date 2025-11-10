import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool, BookOpen, Heart, User, Tag } from 'lucide-react';
import useUserStore from '../../store/userStore';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const { user, isAuthenticated, fetchUserPoems, fetchUserLikedPoems } = useUserStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: <BookOpen className="w-5 h-5" />, label: 'Feed' },
    { path: '/write', icon: <PenTool className="w-5 h-5" />, label: 'Write' },
    { path: isAuthenticated && user?.id ? `/profile/${user.id}` : '#', icon: <User className="w-5 h-5" />, label: 'My Poems' },
    { path: '/explore', icon: <Tag className="w-5 h-5" />, label: 'Explore' },
    { path: isAuthenticated && user?.id ? '/liked' : '#', icon: <Heart className="w-5 h-5" />, label: 'Liked' },
  ];

  const handleLinkClick = (path) => {
    if (!isAuthenticated && (path.includes('liked') || path.includes('profile'))) {
      toast.error('Please log in to access this section');
      return;
    }
    if (path.includes('liked') && user?.id) fetchUserLikedPoems(user.id);
    if (path.includes('profile') && user?.id) fetchUserPoems(user.id);
  };

  return (
    <div className={`bg-gray-800 h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        <h2 className={`font-bold text-white ${isCollapsed ? 'hidden' : ''}`}>
          VerseSpace
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-300 hover:text-white"
        >
          <svg className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-indigo-600 text-white' : ''
            } ${isCollapsed ? 'justify-center' : ''}`}
            onClick={() => handleLinkClick(item.path)}
          >
            <span className={`${isCollapsed ? 'mr-0' : 'mr-3'}`}>
              {item.icon}
            </span>
            <span className={`${isCollapsed ? 'hidden' : ''}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;