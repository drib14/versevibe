import { useState, useEffect } from 'react'; 
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { sanitizeInput } from '../../utils/helpers';

const PoemEditor = ({ onSave, onPublish, initialData = { title: '', content: '', tags: [] }, loading }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'content' ? sanitizeInput(value) : value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.content) newErrors.content = 'Poem content is required';
    return newErrors;
  };

  const handleSubmit = (action) => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    action === 'publish' ? onPublish(formData) : onSave(formData);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <InputField
        label="Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter poem title"
        error={errors.title}
        className="mb-6"
      />
      <InputField
        label="Tags"
        tags
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="Add tags and press Enter"
        className="mb-6"
      />
      <InputField
        label="Poem Content"
        isTextarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your poem..."
        className="mb-6 font-serif"
      />
      <div className="fixed bottom-6 left-0 right-0 bg-gray-900 py-4 px-6 flex justify-end space-x-4">
        <Button variant="secondary" onClick={() => handleSubmit('save')} loading={loading}>
          Save Draft
        </Button>
        <Button variant="primary" onClick={() => handleSubmit('publish')} loading={loading}>
          Publish
        </Button>
      </div>
    </div>
  );
};

export default PoemEditor;