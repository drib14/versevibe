import { useState } from 'react';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { isValidEmail } from '../../utils/helpers';
import toast from 'react-hot-toast';

const Whisper = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Please tell us who you are';
    if (!formData.email) newErrors.email = 'We need your email to reply';
    else if (!isValidEmail(formData.email)) newErrors.email = 'This doesn’t look like a valid email';
    if (!formData.message) newErrors.message = 'Please share a verse or thought';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Placeholder for sending message to backend or email
    toast.success('Your verse has been received! We’ll read it with care.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id='whisper'>

    <div className="bg-gray-900 p-6">
      <div className="container mx-auto max-w-md">
        <h1 className="text-3xl md:text-4xl font-serif text-white text-center mb-8">
          Leave a Verse
        </h1>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your pen name or true self..."
              error={errors.name}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Where shall our reply find you?"
              error={errors.email}
            />
            <InputField
              label="Your Verse"
              isTextarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Pour your thoughts, musings, or a short poem..."
              error={errors.message}
            />
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Send Your Words
            </Button>
          </form>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Whisper;
