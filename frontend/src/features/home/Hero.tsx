import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [courseIdea, setCourseIdea] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const placeholders = [
    'AI-powered course on digital marketing',
    'Masterclass in web development',
    'Beginner\'s guide to photography'
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isTyping) {
        if (placeholderIndex < placeholders[0].length) {
          setPlaceholder(prev => prev + placeholders[0].charAt(placeholderIndex));
          setPlaceholderIndex(prev => prev + 1);
        } else {
          setTimeout(() => {
            setIsTyping(false);
            setPlaceholder('');
            setPlaceholderIndex(0);
          }, 2000);
        }
      } else {
        setPlaceholder('');
        setPlaceholderIndex(0);
        setIsTyping(true);
      }
    }, isTyping ? 50 : 1000);

    return () => clearTimeout(timeout);
  }, [placeholderIndex, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiResult(null);
    setError(null);
    if (!courseIdea.trim()) {
      setError('Please enter a course idea.');
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore
      const response = await window.puter.ai.chat(
        `Generate a detailed course outline and content for: ${courseIdea}. Structure it with clear sections, learning objectives, and key points.`,
        { model: 'gpt-4.1' }
      );
      setAiResult(response);
    } catch (err: any) {
      setError('Failed to generate course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7357F6]/5 to-[#3EC6FF]/5" />
        
        {/* Floating UI Elements */}
        <motion.div 
          className="absolute top-1/4 left-[10%] w-48 h-32 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl p-4"
          initial={{ y: 0, rotate: -5 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-2 w-8 bg-[#7357F6]/30 rounded-full mb-2"></div>
          <div className="h-2 w-16 bg-[#3EC6FF]/30 rounded-full mb-2"></div>
          <div className="h-2 w-12 bg-[#7357F6]/30 rounded-full"></div>
        </motion.div>

        <motion.div 
          className="absolute top-1/3 right-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-[#7357F6] to-[#3EC6FF] flex items-center justify-center shadow-lg"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Zap className="w-6 h-6 text-white" fill="currentColor" />
        </motion.div>

        {/* Sparkles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD76D] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px 2px #FFD76D',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-5xl mx-auto text-center z-10 px-4">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight"
            initial={{ letterSpacing: '0.5rem', opacity: 0 }}
            animate={{ letterSpacing: '0.1rem', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-[#7357F6] to-[#3EC6FF] bg-clip-text text-transparent">
              Create & Launch Your Courses In Minutes
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Turn your knowledge into a beautiful, engaging online course with our AI-powered platform.
            <span className="inline-flex items-center ml-2 text-[#3EC6FF]">
              <Sparkles className="w-5 h-5 ml-1" />
            </span>
          </motion.p>
        </motion.div>

        {/* Course idea form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative flex items-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 focus-within:ring-2 focus-within:ring-[#7357F6]/30 focus-within:border-transparent transition-all duration-300 p-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={courseIdea}
                  onChange={(e) => setCourseIdea(e.target.value)}
                  className="w-full px-6 py-5 text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0 rounded-2xl text-lg placeholder-gray-400 pr-8"
                  placeholder={placeholder || 'What would you like to teach?'}
                  disabled={loading}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {isTyping && (
                    <div className="w-2 h-5 bg-[#7357F6] rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
              <motion.button
                type="button"
                whileHover={{ 
                  scale: 1.02,
                  background: 'linear-gradient(135deg, #8A7AFF, #5BC5FF)'
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-[#7357F6] to-[#3EC6FF] text-white px-8 py-5 h-full rounded-xl font-semibold text-lg flex-shrink-0 flex items-center justify-center gap-3 relative overflow-hidden group"
                disabled={loading}
                onClick={() => navigate('/signup')}
              >
                <span className="relative z-10 flex items-center">
                  {loading ? 'Generating...' : 'Get Started'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_10%,transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 2 }}
                />
              </motion.button>
            </div>
            {error && <div className="text-red-500 mt-3 text-sm">{error}</div>}
          </form>
          {aiResult && (
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-left max-w-2xl mx-auto whitespace-pre-line">
              <h3 className="text-xl font-bold mb-2 text-[#7357F6]">AI-Generated Course Outline</h3>
              <div>{aiResult}</div>
            </div>
          )}
          <motion.p 
            className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs">✓</span>
            No credit card required · Get started in seconds
          </motion.p>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3.5 rounded-xl border border-white/30 shadow-lg">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7357F6] to-[#3EC6FF] border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-sm"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: 'easeInOut' 
                  }}
                >
                  {i === 5 ? '+' : i}
                </motion.div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-700">Trusted by <span className="font-bold text-[#7357F6]">100+</span> instructors</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-xs text-gray-500">4.9/5 from 25+ reviews</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;