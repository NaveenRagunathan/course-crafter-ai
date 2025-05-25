import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "I had the content in my head. CourseCraft made it real.",
      author: "Sarah J.",
      role: "Social Media Strategist",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      quote: "The best $59 I spent this year. Made $700 in 3 days from my first drop.",
      author: "Mark T.",
      role: "Fitness Coach",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      quote: "From idea to Gumroad in 1 hour. No joke.",
      author: "Leila K.",
      role: "UX Designer",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      quote: "I launched my first paid course in a single afternoon.",
      author: "David R.",
      role: "Marketing Consultant",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  const next = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-70" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            "{testimonials[0].quote}"
          </h2>
          
          <div className="relative">
            {/* Carousel controls */}
            <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
              <button 
                onClick={prev}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>
            </div>
            
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <button 
                onClick={next}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={24} className="text-gray-700" />
              </button>
            </div>
            
            {/* Testimonial cards */}
            <div className="flex overflow-hidden">
              <div 
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="min-w-full p-4"
                  >
                    <div className="bg-white rounded-xl shadow-lg p-8">
                      <p className="text-xl mb-6 text-gray-700 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold">{testimonial.author}</p>
                          <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;