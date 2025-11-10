import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { isValidEmail } from '../../utils/helpers';
import toast from 'react-hot-toast';

const Signup = () => {
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await signup(formData);
      toast.success('Signed up successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
    
      <div className="md:w-1/2 bg-linear-to-br from-indigo-900 to-gray-800 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Your words deserve a home.</h2>
          <p className="text-gray-300">Join VerseSpace to share your poetry with the universe.</p>
        </div>
      </div>

     
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-serif text-white mb-6 text-center">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              error={errors.name}
              autocomplete="name"
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              autocomplete="email"
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              autocomplete="new-password"
            />
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              Sign Up
            </Button>
          </form>
          <p className="text-gray-300 text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Login here
            </Link>
          </p>
          <p className="text-gray-400 text-center text-sm mt-2">Your words are safe with us.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;