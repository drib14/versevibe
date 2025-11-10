import { useState, useEffect} from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import useUserStore from "../../store/userStore";
import { fileToBase64 } from "../../utils/helpers";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProfileHeader = ({
  userData,
  isOwnProfile,
  onAvatarUpdate,
  poemsCount,
  likesCount,
}) => {
  const { updateUserAvatar, loading } = useUserStore();
  const [avatarPreview, setAvatarPreview] = useState(
    userData?.profilePic || ""
  );

  useEffect(() => {
  setAvatarPreview(userData?.profilePic || '');
}, [userData?.profilePic]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setAvatarPreview(base64);
        if (isOwnProfile) {
          const updatedUser = await updateUserAvatar(userData._id, file);
          setAvatarPreview(updatedUser.profilePic);

       onAvatarUpdate(updatedUser.profilePic);
          toast.success("Avatar updated successfully!");
        }
      } catch (error) {
        toast.error(error.message || "Failed to update avatar");
      }
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <div className="relative inline-block">
        <Avatar
          src={avatarPreview}
          alt={userData?.name}
          size="xl"
          className="mb-4"
        />
        {isOwnProfile && (
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-4 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-700"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={loading}
            />
          </label>
        )}
      </div>
      <h2 className="text-2xl font-serif text-white mb-2">{userData?.name}</h2>
      <p className="text-gray-300 mb-4">{userData?.bio || "No bio yet"}</p>
      <div className="flex justify-center space-x-4">
        <div>
          <span className="text-indigo-400 font-semibold">{poemsCount}</span>
          <span className="text-gray-300"> Poems</span>
        </div>
        <div>
          <span className="text-indigo-400 font-semibold">{likesCount}</span>
          <span className="text-gray-300"> Liked</span>
        </div>
      </div>
      {isOwnProfile && (
        <Button
          as={Link}
          to="/settings"
          variant="outline"
          size="md"
          className="mt-4"
        >
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;
