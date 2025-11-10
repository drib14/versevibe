import PoemCard from "../../components/PoemCard";

const LikedPoemsGrid = ({ likedPoems }) => {
  return (
    <div className="p-6 bg-gray-900">
      {likedPoems.length === 0 ? (
        <p className="text-gray-400 text-center">No liked poems yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedPoems.map((poem) => (
            <PoemCard key={poem._id} poem={poem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedPoemsGrid;
