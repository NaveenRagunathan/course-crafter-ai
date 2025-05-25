import { motion } from 'framer-motion';
import { Check, Zap, Leaf, Sparkles } from 'lucide-react';

interface PricingJourneyProps {
  activeIndex: number;
  onPlanSelect: (index: number) => void;
}

export const PricingJourney = ({ activeIndex, onPlanSelect }: PricingJourneyProps) => {
  const milestones = [
    { 
      title: 'Starter', 
      icon: <Leaf className="w-6 h-6" />,
      description: 'Begin your journey',
      color: 'from-green-100 to-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    { 
      title: 'Creator', 
      icon: <Zap className="w-6 h-6" />,
      description: 'Grow your audience',
      color: 'from-blue-100 to-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    { 
      title: 'Pro', 
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Master your craft',
      color: 'from-purple-100 to-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="relative py-12 px-4">
      {/* Journey path */}
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 -translate-y-1/2" />
      
      <div className="relative flex justify-between max-w-5xl mx-auto">
        {milestones.map((milestone, index) => {
          const isActive = activeIndex === index;
          const isCompleted = index < activeIndex;
          
          return (
            <motion.div 
              key={index}
              className={`relative flex flex-col items-center w-1/3 px-4 group cursor-pointer`}
              onClick={() => onPlanSelect(index)}
              initial={{ y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Milestone dot */}
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300
                ${isActive 
                  ? `${milestone.iconBg} ${milestone.border} border-2 scale-110` 
                  : isCompleted 
                    ? `${milestone.iconBg} ${milestone.border} border-2`
                    : 'bg-white border-2 border-gray-200'}`}
              >
                <div className={`${isActive || isCompleted ? milestone.iconColor : 'text-gray-400'}`}>
                  {milestone.icon}
                </div>
                
                {/* Progress indicator */}
                {isCompleted && (
                  <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              {/* Milestone info */}
              <h3 className={`text-lg font-semibold mb-1 ${isActive || isCompleted ? milestone.text : 'text-gray-500'}`}>
                {milestone.title}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {milestone.description}
              </p>
              
              {/* Connector */}
              {index < milestones.length - 1 && (
                <div className={`absolute left-3/4 top-8 w-1/2 h-1 ${isCompleted ? 'bg-gradient-to-r from-blue-200 to-purple-200' : 'bg-gray-100'} hidden md:block`} />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingJourney;
