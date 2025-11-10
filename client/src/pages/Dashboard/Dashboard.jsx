import Sidebar from './Sidebar';
import Feed from './Feed';
import FloatingActionButton from '../../components/FloatingActionButton';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1">
        <Feed />
        <FloatingActionButton />
      </div>
    </div>
  );
};

export default Dashboard;