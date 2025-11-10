import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "../../components/Avatar";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/poems/random");
        const formattedTestimonials = response.data.map((poem) => ({
          name: poem.author.name,
          avatar: poem.author.profilePic || "/assets/avatars/default.png",
          quote: poem.content.substring(0, 100) + "...",
        }));
        setTestimonials(formattedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const slides = [...testimonials, ...testimonials];

  if (testimonials.length === 0) {
    return null;
  }

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
                <Avatar
                  src={t.avatar}
                  alt={t.name}
                  size="lg"
                  className="mx-auto mb-4"
                />
                <p className="text-gray-300 italic mb-4 line-clamp-3">
                  {t.quote}
                </p>
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
