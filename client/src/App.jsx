import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useUserStore from './store/userStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/Landing/LandingPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import WritePoem from './pages/WritePoem/WritePoem';
import ProfilePage from './pages/Profile/ProfilePage';
import ExplorePage from './pages/Explore/ExplorePage';
import PoemDetail from './pages/Poem/PoemDetail';
import About from './pages/About/About';
import Whisper from './pages/Whisper/Whisper';
import LikedPage from './pages/Liked/LikedPage'; 
import { Toaster } from 'react-hot-toast';
import Settings from './pages/Profile/Settings';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useUserStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const { initializeAuth, isAuthenticated } = useUserStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/write"
              element={
                <PrivateRoute>
                  <WritePoem />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/liked"
              element={
                <PrivateRoute>
                  <LikedPage />
                </PrivateRoute>
              }
            />
            <Route
    path="/settings"
    element={<PrivateRoute><Settings /></PrivateRoute>} 
  />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/poem/:id" element={<PoemDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/Whisper" element={<Whisper />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" toastOptions={{ style: { background: '#1f2937', color: '#fff' } }} />
      </div>
    </Router>
  );
}

export default App;