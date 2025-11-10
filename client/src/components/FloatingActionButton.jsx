import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const FloatingActionButton = () => {
  return (
    <Link
      to="/write"
      className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
    >
      <Plus className="w-6 h-6" />
    </Link>
  );
};

export default FloatingActionButton;