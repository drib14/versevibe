import { useNavigate, useSearchParams } from 'react-router-dom'; 
import { ArrowLeft } from 'lucide-react';
import PoemEditor from './PoemEditor';
import useUserStore from '../../store/userStore';
import { createPoem, updatePoem, getPoemById } from '../../api/api'; 
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react'; 

const WritePoem = () => {
  const navigate = useNavigate();
  const { user, loading } = useUserStore();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const [initialData, setInitialData] = useState({ title: '', content: '', tags: [] }); 

  const handleSave = (formData) => {
    toast.success('Draft saved locally!');
   
  };

  const handlePublish = async (formData) => {
    try {
      if (editId) {
        await updatePoem(editId, formData);
        toast.success('Poem updated successfully!');
      } else {
        await createPoem(formData);
        toast.success('Poem published successfully!');
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to save poem');
    }
  };

  useEffect(() => {
    if (editId && user) {
      const loadPoem = async () => {
        try {
          const poem = await getPoemById(editId);
          if (poem.author._id !== user.id) {
            toast.error("You can only edit your own poems");
            navigate('/dashboard');
            return;
          }
          setInitialData({
            title: poem.title,
            content: poem.content,
            tags: poem.tags,
          });
        } catch (error) {
          toast.error('Failed to load poem');
          navigate('/dashboard');
        }
      };
      loadPoem();
    }
  }, [editId, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-300 hover:text-indigo-400 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <h2 className="text-2xl font-serif text-white ml-4">
            {editId ? 'Edit Poem' : 'Write Poem'}
          </h2>
        </div>
        <PoemEditor
          onSave={handleSave}
          onPublish={handlePublish}
          initialData={initialData} 
          loading={loading}
        />
      </div>
    </div>
  );
};

export default WritePoem;