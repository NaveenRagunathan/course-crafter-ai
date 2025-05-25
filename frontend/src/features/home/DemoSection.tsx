import { PlayCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const DemoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="demo" className="py-20 bg-gray-900 text-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Watch CourseCraft in Action.
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            This isn't magic. But it feels like it.
            A 45-second flow: from idea → course outline → export-ready in one click.
          </p>
        </div>
        
        <div 
          className={`max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Video placeholder */}
          <div className="aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <PlayCircle size={80} className="text-white opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
            
            {/* Video callouts/annotations */}
            <div className="absolute top-1/4 left-1/4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              Typed: How to Build a LinkedIn Brand
            </div>
            <div className="absolute top-1/2 right-1/4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              Generated: 5 modules, 15 lessons
            </div>
            <div className="absolute bottom-1/4 left-1/3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              Exported to Notion
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;