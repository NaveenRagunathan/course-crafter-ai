import { AnimatePresence, motion } from 'framer-motion';
import { BookOpenCheck, LogIn, Menu, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Route Get Started to login/auth page, Dashboard to dashboard
  const handleGetStarted = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };
  const handleDashboard = () => {
    setIsMenuOpen(false);
    navigate('/dashboard');
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-gray-100/20 shadow-sm' 
          : 'py-5 bg-[#FAFAFA]/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 rounded-lg bg-gradient-to-br from-[#7357F6] to-[#3EC6FF] shadow-lg"
          >
            <BookOpenCheck size={20} className="text-white" />
          </motion.div>
          <span className="text-xl font-bold text-gray-800">
            CourseCraft AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-[#7357F6] transition-colors font-medium"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <button 
              onClick={handleDashboard}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7357F6] to-[#3EC6FF] text-white font-medium hover:opacity-90 transition-opacity"
            >
              <User size={18} />
              <span>Dashboard</span>
            </button>
          ) : (
            <button 
              onClick={handleGetStarted}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7357F6] to-[#3EC6FF] text-white font-medium hover:opacity-90 transition-opacity"
            >
              <LogIn size={18} />
              <span>Get Started</span>
            </button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl overflow-hidden"
          >
            <nav className="flex flex-col py-2">
              <Link 
                to="/" 
                className="px-6 py-3 hover:bg-gray-50 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Home</span>
              </Link>
              {isAuthenticated ? (
                <button 
                  onClick={handleDashboard}
                  className="flex items-center space-x-2 px-6 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </button>
              ) : (
                <button 
                  onClick={handleGetStarted}
                  className="flex items-center space-x-2 px-6 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <LogIn size={18} />
                  <span>Get Started</span>
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;