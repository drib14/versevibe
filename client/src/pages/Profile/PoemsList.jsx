import PoemCard from "../../components/PoemCard";

const PoemsList = ({ poems }) => {
  return (
    <div className="p-6 bg-gray-900">
      {poems.length === 0 ? (
        <p className="text-gray-400 text-center">No poems yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem) => (
            <PoemCard key={poem._id} poem={poem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PoemsList;
