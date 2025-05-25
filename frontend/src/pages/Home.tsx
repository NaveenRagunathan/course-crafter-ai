import Hero from '../features/home/Hero';
import ProblemSection from '../features/home/ProblemSection';
import HowItWorks from '../features/home/HowItWorks';
import DemoSection from '../features/home/DemoSection';
import Features from '../features/home/Features';
import Testimonials from '../features/home/Testimonials';
import Pricing from '../features/home/Pricing';
import FinalCTA from '../features/home/FinalCTA';
import FAQ from '../features/home/FAQ';

const Home = () => {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <DemoSection />
      <Features />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <FAQ />
    </main>
  );
};

export default Home;
