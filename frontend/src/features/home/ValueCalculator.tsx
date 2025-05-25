import { motion } from 'framer-motion';

interface ValueCalculatorProps {
  onCoursesChange: (count: number) => void;
  coursesCount: number;
  isAnnual?: boolean;
}

export const ValueCalculator = ({ onCoursesChange, coursesCount, isAnnual = false }: ValueCalculatorProps) => {
  const hoursSavedPerCourse = 10; // Average hours saved per course
  const hourlyRate = 50; // Average hourly rate for course creators
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    onCoursesChange(Math.max(1, Math.min(100, value))); // Clamp between 1 and 100
  };

  const totalHoursSaved = coursesCount * hoursSavedPerCourse;
  const moneyValue = totalHoursSaved * hourlyRate;
  const annualSavings = isAnnual ? Math.round(moneyValue * 0.2) : 0;
  
  return (
    <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Calculate Your Potential Savings
      </h3>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Number of courses you'll create this year:
          </span>
          <span className="text-lg font-semibold text-indigo-600">
            {coursesCount} {coursesCount === 1 ? 'course' : 'courses'}
          </span>
        </div>
        
        <input
          type="range"
          min="1"
          max="50"
          value={coursesCount}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <motion.div 
          className="p-4 bg-green-50 rounded-lg text-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold text-green-600">
            {totalHoursSaved}+ hours
          </div>
          <div className="text-sm text-green-700">
            Time saved with CourseCraft AI
          </div>
        </motion.div>
        
        <motion.div 
          className="p-4 bg-blue-50 rounded-lg text-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold text-blue-600">
            ${moneyValue.toLocaleString()}
          </div>
          <div className="text-sm text-blue-700">
            Potential value (at $30/hour)
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className={`mt-8 p-4 rounded-xl text-center text-sm font-medium ${
          isAnnual 
            ? 'bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 text-indigo-700'
            : 'bg-gray-50 text-gray-600 border border-gray-100'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {isAnnual ? (
          <>
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2">
                Annual Discount
              </span>
              <span>Save 20% (${annualSavings.toLocaleString()} value)</span>
            </div>
            <p className="mt-1 text-xs text-indigo-600">
              That's like getting {Math.floor(annualSavings / hourlyRate / hoursSavedPerCourse)} courses free!
            </p>
          </>
        ) : (
          <p>Switch to annual billing to save 20% on your subscription</p>
        )}
      </motion.div>
    </div>
  );
};

export default ValueCalculator;
