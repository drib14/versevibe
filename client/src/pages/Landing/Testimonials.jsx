import Avatar from '../../components/Avatar';

const testimonials = [
  { name: 'Luna Star', avatar: '/assets/avatars/default.png', quote: 'VerseSpace has given my poetry a home where it truly shines.' },
  { name: 'Cosmo Poet', avatar: '/assets/avatars/default.png', quote: 'A beautiful platform to connect with other poets and find inspiration.' },
  { name: 'Stellar Muse', avatar: '/assets/avatars/default.png', quote: 'Writing here feels like crafting stars in a cosmic indigo.' },
  { name: 'Nova Verse', avatar: '/assets/avatars/default.png', quote: 'The community here is so supportive and vibrant!' },
  { name: 'Astral Dreamer', avatar: '/assets/avatars/default.png', quote: 'Every poem I read sparks a new idea for my own work.' },
  { name: 'Celestial Bard', avatar: '/assets/avatars/default.png', quote: 'VerseSpace is my creative sanctuary for sharing poetry.' },
];


const Testimonials = () => {
  const slides = [...testimonials, ...testimonials];

  return (
    <section className="py-16 bg-gray-900 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-12">
          What Our Poets Say
        </h2>

        <div className="slider relative w-full overflow-hidden">
          <div className="slide-track flex gap-10">
            {slides.map((t, i) => (
              <div
                key={i}
                className="slide shrink-0 w-80 bg-gray-800 rounded-lg p-6 shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <Avatar src={t.avatar} alt={t.name} size="lg" className="mx-auto mb-4" />
                <p className="text-gray-300 italic mb-4 line-clamp-3">{t.quote}</p>
                <p className="text-indigo-400 font-semibold">{t.name}</p>
              </div>
            ))}
          </div>

          <div className="slider-fade left-fade"></div>
          <div className="slider-fade right-fade"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
