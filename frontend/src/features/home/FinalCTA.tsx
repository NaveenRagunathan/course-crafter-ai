import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">
          Your Audience is Waiting. Launch Today.
        </h2>
        
        <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
          CourseCraft turns your knowledge into a product. Try it now, free.
        </p>
        
        <Link 
          to="/login"
          className="inline-block bg-white text-indigo-700 text-lg font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-pulse"
        >
          Launch My First Course →
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;