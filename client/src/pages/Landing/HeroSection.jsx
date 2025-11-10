import { Link } from "react-router-dom";
import Button from "../../components/Button";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-indigo-900 to-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none hidden sm:block">
        <p className="absolute top-[15%] left-3/4 -translate-x-1/2 text-gray-300/60 font-serif italic text-xl md:text-2xl tracking-wide drop-shadow-sm animate-float whitespace-nowrap">
          "Stars whisper secrets in the night…"
        </p>

        <p className="absolute top-[10%] left-[15%] text-gray-300/55 font-serif italic text-lg md:text-xl tracking-wide drop-shadow-sm animate-float [animation-duration:13s]">
          "The dusk hums softly with forgotten poems."
        </p>

        <p
          className="absolute top-[60%] right-[2%] text-gray-300/55 font-serif italic text-lg md:text-xl tracking-wide drop-shadow-sm animate-float [animation-duration:15s]"
          style={{ transform: "rotate(-3deg)" }}
        >
          "Every breath of the indigo hums with untold verses."
        </p>

        <p className="absolute bottom-[10%] left-[35%] -translate-x-1/2 text-gray-300/60 font-serif italic text-lg md:text-xl tracking-wide drop-shadow-sm animate-float [animation-duration:12s]">
          "Winds carry verses only the stars can hear."
        </p>

        <p className="absolute bottom-[12%] right-[10%] text-gray-300/60 font-serif italic text-lg md:text-xl tracking-wide drop-shadow-sm animate-float [animation-duration:16s]">
          "Moonlight weaves dreams in silence…"
        </p>

        <p className="absolute top-[65%] left-[3%] text-gray-300/55 font-serif italic text-lg md:text-xl tracking-wide drop-shadow-sm animate-float [animation-duration:14s]">
          "In quiet hearts, galaxies awaken."
        </p>
      </div>

      <div className="text-center z-10 px-4">
        <span className="text-sm font-semibold text-gray-400 mb-2 block">
          Write. Be heard. Belong.
        </span>

        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
          Where Every Word Feels Like Home
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Share your poetry, connect with dreamers, and explore a cosmos of
          words.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="primary" size="lg" as={Link} to="/signup">
            Join the Verse
          </Button>
          <Button variant="secondary" size="lg" as={Link} to="/login">
            Resume Your Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
