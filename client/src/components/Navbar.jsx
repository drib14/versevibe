import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { LogOut, User, Settings, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

       
        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          className="text-2xl font-bold text-indigo-400"
        >
          VerseSpace
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-indigo-400 cursor-pointer">
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-indigo-400 cursor-pointer"
                >
                  <img
                    src={user?.profilePic || '/assets/avatars/default.png'}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user?.name}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2">
                    <Link
                      to={`/profile/${user?.id}`}
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            !isAuthPage && (
              <>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-indigo-400 font-medium  transition-colors cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-indigo-400 cursor-pointer"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('whisper')}
                  className="text-gray-300 hover:text-indigo-400 cursor-pointer"
                >
                  Whisper
                </button>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 border border-gray-700 rounded-full hover:bg-gray-800 transition"
                >
                  Login
                </Link>
              </>
            )
          )}
        </div>

       
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-indigo-400"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

    
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to={`/profile/${user?.id}`}
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md cursor-pointer"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              !isAuthPage && (
                <>
                  <button
                    onClick={() => scrollToSection('hero')}
                    className="block w-full text-left px-4 py-2 text-indigo-400 font-medium hover:bg-gray-800 rounded-md"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection('whisper')}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                  >
                    Whisper
                  </button>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-300 border border-gray-700 rounded-md hover:bg-gray-800 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;