import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import LikedPoemsGrid from "../Profile/LikedPoemsGrid";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

const LikedPage = () => {
  const { user, isAuthenticated, fetchUserLikedPoems, loading } =
    useUserStore();
  const [likedPoems, setLikedPoems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLikedPoems = async () => {
      if (!isAuthenticated) return;
      try {
        const poems = await fetchUserLikedPoems(user.id);
        setLikedPoems(poems);
      } catch (error) {
        toast.error(error.message || "Failed to load liked poems");
      }
    };
    loadLikedPoems();
  }, [user?.id, isAuthenticated, fetchUserLikedPoems]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            size="md"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="cursor-pointer">Back to Dashboard</span>
          </Button>
          <h2 className="text-3xl font-serif text-white text-center flex-1">
            Your Liked Poems
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center mt-16">
            <Loader className="w-12 h-12" />
          </div>
        ) : (
          <LikedPoemsGrid likedPoems={likedPoems} />
        )}
        {!loading && likedPoems.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            You haven't liked any poems yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default LikedPage;
