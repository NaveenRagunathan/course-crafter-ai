import { ArrowRight, CheckCircle, RefreshCcw, UserX, Zap } from 'lucide-react';
import { useState } from 'react';

export default function ProblemSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const problems = [
    {
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      title: "The Overwhelm",
      description: "You've got knowledge that could change lives — but every time you sit down to \"just start,\" you end up staring at a blank doc for 3 hours.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <RefreshCcw className="w-8 h-8 text-blue-500" />,
      title: "The Perfection Spiral",
      description: "You research for hours, collect inspiration, but somehow, nothing you make feels \"enough.\" So you tweak. Tweak again. Then stop.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <UserX className="w-8 h-8 text-pink-500" />,
      title: "The Ghost Students",
      description: "You finally launch. But they don't engage. No one finishes the course. You blame yourself, again.",
      color: "from-pink-500 to-purple-400"
    }
  ];

  return (
    <section className="pt-16 pb-24 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7357F6] to-[#3EC6FF] mb-4">
            Let's Be Honest...
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            This Isn't Just About Making a Course.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Problem Cards - Interactive Tabs */}
          <div className="flex flex-col md:flex-row gap-4 mb-16 justify-center">
            {problems.map((problem, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative px-8 py-4 rounded-xl shadow-lg transition-all duration-300 text-left ${
                  activeIndex === index 
                    ? `bg-gradient-to-r ${problem.color} text-white transform scale-105` 
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {problem.icon}
                  <h3 className="text-xl font-bold">{problem.title}</h3>
                </div>
                {activeIndex === index && (
                  <p className="text-white text-sm md:text-base mt-2">{problem.description}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Static Solution Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="bg-indigo-100 text-indigo-700 inline-flex items-center px-6 py-2 rounded-full font-medium mb-6">
                <CheckCircle className="w-5 h-5 mr-2" />
                The Solution
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transform Your Knowledge Into<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  A High-Value Course
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                CourseCraft AI doesn't just help you "make a course." It gives you the 
                brainpower of a proven instructional designer, marketer, and motivator — in one click.
              </p>
              <button 
                className="group bg-gradient-to-r from-[#7357F6] to-[#3EC6FF] hover:from-[#6349d4] hover:to-[#35b1e6] text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 inline-flex items-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Build My First Module Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}