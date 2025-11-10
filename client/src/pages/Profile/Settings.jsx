import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const Settings = () => {
  const { user, updateUser, loading } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  const [errors, setErrors] = useState({});

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) {
    
      toast.error('User not authenticated. Please log in again.');
      navigate('/login');
      return;
    }
    if (!validateForm()) return;
    try {
      await updateUser(user.id, formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      
      toast.error(error.message || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto max-w-md">
          <button
        onClick={() => navigate('/dashboard')}
        className="text-gray-300 hover:text-indigo-400 flex items-center mb-10 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>
        <h2 className="text-2xl font-serif text-white mb-6">Settings</h2>
        {loading ? (
          <Loader className="mx-auto mt-12" />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <InputField
              label="Bio"
              name="bio"
              type="textarea"
              value={formData.bio}
              onChange={handleInputChange}
              error={errors.bio}
            />
            <div className="flex space-x-4">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/profile/${user?.id || ''}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;