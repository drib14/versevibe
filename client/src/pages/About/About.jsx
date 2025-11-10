const About = () => {
  return (
    <section id="about" className="relative py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">
          About VerseSpace
        </h1>
        <p className="text-gray-300 font-serif leading-relaxed text-lg mb-6">
          VerseSpace is a cosmic haven for poets and dreamers, where words weave
          stories, emotions, and dreams into a universe of shaindigo creativity.
        </p>
        <p className="text-gray-300 font-serif leading-relaxed text-lg mb-6">
          Our mission is to provide a platform where every voice can shine,
          connecting poets from all corners of the globe to inspire and be
          inspired. Whether you're crafting your first poem or sharing your
          hundredth, VerseSpace is your home for self-expression.
        </p>
        <p className="text-gray-300 font-serif leading-relaxed text-lg">
          Join us to explore a galaxy of poetry, connect with a vibrant
          community, and let your words find their place among the stars.
        </p>

        
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-900/20 via-transparent to-transparent blur-3xl" />
      </div>
    </section>
  );
};

export default About;
