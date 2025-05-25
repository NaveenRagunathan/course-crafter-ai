import { ListTree, MessageSquare, Upload } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare size={32} className="text-white" />,
      title: "Tell us your topic",
      description: "\"What do you want to teach?\" → You type: \"How to Build a LinkedIn Brand\"",
      preview: (
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="font-mono text-sm text-white/90">
            How to Build a LinkedIn Brand<span className="animate-blink">|</span>
          </div>
        </div>
      )
    },
    {
      icon: <ListTree size={32} className="text-white" />,
      title: "AI generates your full outline",
      description: "Instant modules, lesson titles, summaries, all auto-structured for clarity + flow.",
      preview: (
        <div className="mt-4 space-y-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Module 1: Profile Optimization</h4>
            <ul className="text-sm text-white/80 list-disc pl-4 space-y-1">
              <li>Professional Photo Setup</li>
              <li>Headline That Converts</li>
              <li>About Section Strategy</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: <Upload size={32} className="text-white" />,
      title: "Export + Launch",
      description: "Publish on Notion, sell on Gumroad, or turn into a free lead magnet.",
      preview: (
        <div className="mt-4 flex gap-4 justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
            Notion
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
            Gumroad
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
            PDF
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          Here's How CourseCraft AI Works
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative pb-24 last:pb-0">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-white/50 to-white/10" />
              )}
              
              <div className="flex gap-8">
                {/* Icon circle */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-white/80 mb-4">{step.description}</p>
                  {step.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;