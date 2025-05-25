import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "Is the course content really usable?",
      answer: "Absolutely. CourseCraft doesn't just generate random content. It creates structured, logical curriculum based on best teaching practices. Each module builds on the previous one, creating a cohesive learning journey for your students. You can always customize and add your personal touch, but the heavy lifting is done for you."
    },
    {
      question: "Can I edit the outline after it's generated?",
      answer: "Yes! While the AI-generated outline gives you a strong foundation, you have full editing capabilities. Add modules, remove sections, reorder lessons, or modify any text to match your personal teaching style and expertise. Think of the generation as a first draft that saves you hours of planning."
    },
    {
      question: "What platforms does it export to?",
      answer: "Currently, CourseCraft exports to Notion (as a fully structured workspace), PDF (beautifully formatted for distribution), and provides direct integration with Gumroad for selling. We're constantly adding new export options based on creator feedback."
    },
    {
      question: "Will it work for any niche?",
      answer: "CourseCraft has been tested across dozens of niches from social media marketing to pottery, fitness to finance, writing to web development. The AI is trained to understand learning principles across all subjects. If you have very specialized technical content, you may need to refine some outputs, but the structure will always be solid."
    },
    {
      question: "Do I need to be a course expert?",
      answer: "Not at all! That's the whole point of CourseCraft. We've studied hundreds of successful courses to build best practices into the AI. It handles the pedagogy, structure, and flow so even first-time course creators can build professional-quality content. You just bring your knowledge on the topic."
    }
  ];
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Still Wondering?
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-6 border-b border-gray-200 pb-6 last:border-b-0"
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl font-medium">{faq.question}</h3>
                <ChevronDown 
                  size={24} 
                  className={`text-gray-700 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div 
                className={`mt-4 text-gray-700 overflow-hidden transition-all duration-300 ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;