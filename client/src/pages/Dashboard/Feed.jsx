import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PoemCard from '../../components/PoemCard';
import Loader from '../../components/Loader';
import { getAllPoems } from '../../api/api';

const Feed = () => {
  const [allPoems, setAllPoems] = useState([]);
  const [displayedPoems, setDisplayedPoems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const poemsPerPage = 10;

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const poems = await getAllPoems();
        setAllPoems(poems);
        setDisplayedPoems(poems.slice(0, poemsPerPage));
        setHasMore(poems.length > poemsPerPage);
        setLoading(false);
      } catch (error) {
        
        setLoading(false);
        setHasMore(false);
      }
    };
    fetchPoems();
  }, []);

  const loadMorePoems = () => {
    const nextPage = page + 1;
    const newPoems = allPoems.slice(0, nextPage * poemsPerPage);
    setDisplayedPoems(newPoems);
    setPage(nextPage);
    setHasMore(newPoems.length < allPoems.length);
  };

  return (
    <div className="p-6 bg-gray-900">
      <InfiniteScroll
        dataLength={displayedPoems.length}
        next={loadMorePoems}
        hasMore={hasMore}
        loader={<Loader className="mx-auto mt-6" />}
        endMessage={<p className="text-center text-gray-400 mt-6">No more poems to show</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPoems.map((poem) => (
            <PoemCard key={poem._id} poem={poem} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Feed;