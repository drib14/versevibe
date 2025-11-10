import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import Loader from "../../components/Loader";
import LikedPoemsGrid from "./LikedPoemsGrid";
import ProfileHeader from "./ProfileHeader";
import toast from "react-hot-toast";
import { deletePoem } from "../../api/api";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    user,
    fetchUserProfile,
    fetchUserPoems,
    fetchUserLikedPoems,
    loading,
  } = useUserStore();

  const [profile, setProfile] = useState(null);
  const [poems, setPoems] = useState([]);
  const [likedPoems, setLikedPoems] = useState([]);
  const [activeTab, setActiveTab] = useState("poems");

  const isOwnProfile = user?.id === id;

  useEffect(() => {
    const loadProfile = async () => {
      if (!id) {
        navigate("/dashboard");
        return;
      }

      try {
        const [userProfile, userPoems, liked] = await Promise.all([
          fetchUserProfile(id),
          fetchUserPoems(id),
          fetchUserLikedPoems(id),
        ]);

        setProfile(userProfile);
        setPoems(userPoems);
        setLikedPoems(liked);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    loadProfile();
  }, [id, navigate, fetchUserProfile, fetchUserPoems, fetchUserLikedPoems]);

  useEffect(() => {
    if (isOwnProfile && user?.profilePic && profile?.id === user.id) {
      setProfile((prev) => ({ ...prev, profilePic: user.profilePic }));
    }
  }, [user?.profilePic, isOwnProfile, profile?.id, user?.id]);

  const handleDelete = async (poemId) => {
    if (!window.confirm("Are you sure you want to delete this poem?")) return;

    try {
      await deletePoem(poemId);
      setPoems((prev) => prev.filter((p) => p._id !== poemId));
      setProfile((prev) => ({
        ...prev,
        poems: prev.poems.filter((id) => id.toString() !== poemId),
      }));

      toast.success("Poem deleted successfully");
    } catch (error) {
      toast.error("Failed to delete poem");
    }
  };

  if (loading) return <Loader className="mx-auto mt-12" />;

  if (!profile)
    return <p className="text-center text-gray-400 mt-12">User not found</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto max-w-7xl">
        <ProfileHeader
          userData={profile}
          poemsCount={poems.length}
          likesCount={likedPoems.length}
          isOwnProfile={isOwnProfile}
          onAvatarUpdate={(newPic) => {
            setProfile((prev) => ({ ...prev, profilePic: newPic }));
          }}
        />

        <div className="mb-8 flex space-x-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("poems")}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === "poems"
                ? "text-indigo-400 border-indigo-400"
                : "text-gray-400 border-transparent"
            }`}
          >
            Poems ({poems.length})
          </button>
          <button
            onClick={() => setActiveTab("liked")}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === "liked"
                ? "text-indigo-400 border-indigo-400"
                : "text-gray-400 border-transparent"
            }`}
          >
            Liked ({likedPoems.length})
          </button>
        </div>

        {activeTab === "poems" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.length === 0 ? (
              <p className="text-gray-400 text-center col-span-full">
                No poems yet
              </p>
            ) : (
              poems.map((poem) => (
                <div
                  key={poem._id}
                  className="bg-gray-800 p-4 rounded-lg relative"
                >
                  <h3 className="text-lg font-serif text-white">
                    {poem.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {poem.content.slice(0, 100)}...
                  </p>

                  <div className="mt-3 flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/poem/${poem._id}`)}
                      className="text-indigo-400 hover:text-indigo-300 text-sm cursor-pointer"
                    >
                      Read More
                    </button>

                    {isOwnProfile && (
                      <button
                        onClick={() => handleDelete(poem._id)}
                        className="text-indigo-500 hover:text-indigo-400 text-sm cursor-pointer"
                        title="Delete poem"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <LikedPoemsGrid likedPoems={likedPoems} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
