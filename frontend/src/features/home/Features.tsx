import React from 'react';
import { 
  Zap, 
  Layout, 
  FileText, 
  ExternalLink, 
  Rocket, 
  Palette
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap size={24} className="text-indigo-600" />,
      title: "Instant Course Generator",
      description: "From idea to full outline in under 60 seconds.",
      timeSaved: "8+ hours"
    },
    {
      icon: <Layout size={24} className="text-indigo-600" />,
      title: "Smart Module Structuring",
      description: "Logical progression built in, no planning needed.",
      timeSaved: "5+ hours"
    },
    {
      icon: <FileText size={24} className="text-indigo-600" />,
      title: "Lesson Copy Pre-Written",
      description: "Each lesson comes with key points and summaries.",
      timeSaved: "12+ hours"
    },
    {
      icon: <ExternalLink size={24} className="text-indigo-600" />,
      title: "PDF + Notion + Gumroad Ready",
      description: "One-click export to your platform of choice.",
      timeSaved: "4+ hours"
    },
    {
      icon: <Rocket size={24} className="text-indigo-600" />,
      title: "Built-in Launch Templates",
      description: "Sales pages, emails, and promo content included.",
      timeSaved: "6+ hours"
    },
    {
      icon: <Palette size={24} className="text-indigo-600" />,
      title: "No Design or LMS Setup Needed",
      description: "Clean templates ready for your branding.",
      timeSaved: "10+ hours"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Smart Enough to Feel Like a Team. Simple Enough to Use Solo.
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md hover:bg-indigo-50/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-700 mb-3">{feature.description}</p>
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Time Saved: {feature.timeSaved}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;