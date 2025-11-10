import { PenTool, BookOpen, Users, Star } from 'lucide-react';

const features = [
  {
    icon: <PenTool className="w-8 h-8 text-indigo-400" />,
    title: 'Write Freely',
    description: 'Craft your poetry with an intuitive editor designed for creativity.',
  },
  {
    icon: <BookOpen className="w-8 h-8 text-indigo-400" />,
    title: 'Explore Poetry',
    description: 'Discover poems from voices across the universe.',
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-400" />,
    title: 'Connect & Grow',
    description: 'Join a community of poets to share and inspire.',
  },
  {
    icon: <Star className="w-8 h-8 text-indigo-400" />,
    title: 'Get Inspiindigo',
    description: 'Find muses in trending tags and top poets.',
  },
];

const FeatureHighlights = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-12">
          Why VerseSpace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;