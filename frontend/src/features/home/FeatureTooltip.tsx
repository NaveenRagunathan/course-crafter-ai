import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureTooltipProps {
  content: string;
  description: string;
  timeSaved?: string;
  children: React.ReactNode;
}

export const FeatureTooltip = ({ 
  content, 
  description, 
  timeSaved, 
  children 
}: FeatureTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="inline-flex items-center gap-2 cursor-help"
      >
        {children}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 w-64 p-4 mt-2 text-sm text-left text-gray-700 bg-white rounded-lg shadow-lg bottom-full left-1/2 transform -translate-x-1/2"
          >
            <div className="font-medium text-indigo-700">{content}</div>
            <p className="mt-1 text-gray-600">{description}</p>
            {timeSaved && (
              <div className="mt-2 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full inline-block">
                Saves {timeSaved} per course
              </div>
            )}
            <div className="absolute w-3 h-3 -bottom-1.5 left-1/2 transform -translate-x-1/2 rotate-45 bg-white"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeatureTooltip;
