import HeroSection from './HeroSection';
import FeatureHighlights from './FeatureHighlights';
import SamplePoems from './SamplePoems';
import Testimonials from './Testimonials';
import About from '../About/About';
import Whisper from '../Whisper/Whisper';

const LandingPage = () => {
  return (
    <div className="bg-gray-900">
      <HeroSection />
      <About/>
      <FeatureHighlights />
      <SamplePoems />
      <Testimonials />
      <Whisper />
    </div>
  );
};

export default LandingPage;