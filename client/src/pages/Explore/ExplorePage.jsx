import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PoemCard from "../../components/PoemCard";
import Loader from "../../components/Loader";
import InputField from "../../components/InputField";
import { getAllPoems } from "../../api/api";

const ExplorePage = () => {
  const [allPoems, setAllPoems] = useState([]);
  const [filteredPoems, setfilteredPoems] = useState([]);
  const [displayedPoems, setDisplayedPoems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const poemsPerPage = 10;

  const trendingTags = ["love", "nature", "hope", "dreams", "cosmos"];

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const poems = await getAllPoems();
        setAllPoems(poems);
        setfilteredPoems(poems);
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

  useEffect(() => {
    let filteindigo = allPoems;
    if (searchQuery) {
      filteindigo = filteindigo.filter(
        (poem) =>
          poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          poem.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          poem.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }
    if (selectedTag) {
      filteindigo = filteindigo.filter((poem) => poem.tags.includes(selectedTag));
    }
    setfilteredPoems(filteindigo);
    setDisplayedPoems(filteindigo.slice(0, page * poemsPerPage));
    setHasMore(filteindigo.length > page * poemsPerPage);
  }, [searchQuery, selectedTag, allPoems, page]);

  const loadMorePoems = () => {
    const nextPage = page + 1;
    const newPoems = filteredPoems.slice(0, nextPage * poemsPerPage);
    setDisplayedPoems(newPoems);
    setPage(nextPage);
    setHasMore(newPoems.length < filteredPoems.length);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <div className="w-64 bg-gray-800 p-4">
        <h3 className="text-lg font-serif text-white mb-4">Trending Tags</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTag === tag
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-indigo-600"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="sticky top-0 bg-gray-900 py-4 z-10">
          <InputField
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by author, poem, or tag..."
            className="max-w-lg mx-auto"
          />
        </div>
        <InfiniteScroll
          dataLength={displayedPoems.length}
          next={loadMorePoems}
          hasMore={hasMore}
          loader={<Loader className="mx-auto mt-6" />}
          endMessage={
            <p className="text-center text-gray-400 mt-6">
              No more poems to show
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPoems.length === 0 && !loading ? (
              <p className="text-gray-400 text-center col-span-full">
                No poems found.
              </p>
            ) : (
              displayedPoems.map((poem) => (
                <PoemCard key={poem._id} poem={poem} />
              ))
            )}
          </div>
        </InfiniteScroll>
        {loading && displayedPoems.length === 0 && (
          <Loader className="mx-auto mt-6" />
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
