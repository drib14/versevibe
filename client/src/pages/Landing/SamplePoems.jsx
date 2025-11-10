import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PoemCard from '../../components/PoemCard';
import Button from '../../components/Button';
import { getAllPoems } from '../../api/api';
import Loader from "../../components/Loader"

const SamplePoems = () => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await getAllPoems();
        setPoems(response.slice(0, 6));               // only 6 will be visible on the landing page if user is not logged in
        setLoading(false);
      } catch (error) {
        
        setLoading(false);
      }
    };
    fetchPoems();
  }, []);

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-12">
          Discover Our Poems
        </h2>
        {loading ? (
          <Loader/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {poems.map((poem) => (
              <PoemCard key={poem._id} poem={poem} />
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Button variant="primary" size="lg" as={Link} to="/signup">
            Join to Write Your Own
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SamplePoems;