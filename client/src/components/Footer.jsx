import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Github, Linkedin, X } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollLink = (e, sectionId) => {
    e.preventDefault();
    if (isLanding) {
      scrollToSection(sectionId);
    } else {
      navigate('/').then(() => {
        setTimeout(() => scrollToSection(sectionId), 100);
      });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
          <Link
            to="/"
            onClick={(e) => isLanding && handleScrollLink(e, 'hero')}
            className="text-gray-300 hover:text-indigo-400 transition cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="text-gray-300 hover:text-indigo-400 transition cursor-pointer"
          >
            Explore
          </Link>
          <button
            onClick={(e) => handleScrollLink(e, 'about')}
            className="text-gray-300 hover:text-indigo-400 transition cursor-pointer"
          >
            About
          </button>
          
        </div>

        <div className="flex space-x-4 mb-4 md:mb-0">
          {[
            { href: 'https://github.com/theEquinoxDev/VerseSpace', Icon: Github },
            { href: 'https://x.com/theEquinoxDev', Icon: X },
            { href: 'https://www.linkedin.com/in/theequinoxdev/', Icon: Linkedin },
          ].map(({ href, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-indigo-400 transition"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

       
        <p className="text-gray-400">
          © VerseSpace 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;