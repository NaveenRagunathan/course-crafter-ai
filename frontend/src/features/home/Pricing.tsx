import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock, Leaf, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import PricingJourney from './PricingJourney';
import ValueCalculator from './ValueCalculator';

// Define the feature keys as a type
type FeatureKey = 'courseLimit' | 'notionExport' | 'basicOutline' | 'lessonSummaries' | 
                'unlimitedCourses' | 'pdfExport' | 'advancedStructuring' | 'customBranding' |
                'emailTemplates' | 'gumroadIntegration' | 'whiteLabel' | 'premiumTemplates' |
                'advancedExport' | 'prioritySupport' | 'earlyAccess';

// Feature interface with optional key
interface Feature {
  text: string;
  key?: FeatureKey;
}

// Plan interface
export interface Plan {
  name: string;
  price: string | { monthly: number; annually: number };
  period: string;
  description: string;
  features: Feature[];
  cta: string;
  highlighted: boolean;
  theme: {
    bg: string;
    border: string;
    text: string;
    button: string;
  };
  icon: JSX.Element;
  badge?: string;
}

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [activePlan, setActivePlan] = useState(1); // Default to Creator plan
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [coursesCount, setCoursesCount] = useState(5);
  const [showValueCalculator, setShowValueCalculator] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Plans data with proper typing
  const plans: Plan[] = [
    {
      name: "Starter",
      price: "0",
      period: "",
      description: "Perfect for beginners testing course ideas",
      features: [
        { text: "1 Course", key: "courseLimit" },
        { text: "Notion Export", key: "notionExport" },
        { text: "Basic Outline Generation", key: "basicOutline" },
        { text: "Lesson Summaries", key: "lessonSummaries" }
      ],
      cta: "Start Free",
      highlighted: false,
      theme: {
        bg: "from-green-50 to-white",
        border: "border-green-100",
        text: "text-green-700",
        button: "from-green-500 to-green-600 hover:shadow-green-200"
      },
      icon: <Leaf className="w-5 h-5" />
    },
    {
      name: "Creator",
      price: isAnnual ? "19" : "29",
      period: isAnnual ? "/year" : "/month",
      description: "For creators serious about growing their audience",
      features: [
        { text: "Unlimited Courses", key: "unlimitedCourses" },
        { text: "PDF + Notion Export", key: "pdfExport" },
        { text: "Advanced Module Structuring", key: "advancedStructuring" },
        { text: "Custom Branding", key: "customBranding" },
        { text: "Launch Email Templates", key: "emailTemplates" },
        { text: "Gumroad Integration", key: "gumroadIntegration" }
      ],
      cta: "Upgrade Now",
      highlighted: true,
      badge: "Most Popular",
      theme: {
        bg: "from-blue-50 to-white",
        border: "border-blue-100",
        text: "text-blue-700",
        button: "from-blue-500 to-blue-600 hover:shadow-blue-200"
      },
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: "Pro",
      price: "299",
      period: "",
      description: "For professionals building a course business",
      features: [
        { text: "Everything in Creator", key: 'everythingInCreator' as FeatureKey },
        { text: "White-label Course Materials", key: "whiteLabel" },
        { text: "Premium Templates", key: "premiumTemplates" },
        { text: "Advanced Export Options", key: "advancedExport" },
        { text: "Priority Support", key: "prioritySupport" },
        { text: "Early Access to New Features", key: 'courseLimit' as FeatureKey | undefined }
      ],
      cta: "Get Lifetime Access",
      highlighted: false,
      badge: "One-Time Payment",
      theme: {
        bg: "from-purple-50 to-white",
        border: "border-purple-100",
        text: "text-purple-700",
        button: "from-purple-500 to-purple-600 hover:shadow-purple-200"
      },
      icon: <Sparkles className="w-5 h-5" />
    }
  ];
  
  // Feature details for tooltips with type assertion
  const featureDetails: Record<string, { description: string; timeSaved: string }> = {
    courseLimit: {
      description: "Create and manage up to 1 course",
      timeSaved: "Get started in minutes"
    },
    notionExport: {
      description: "Export your course structure to Notion",
      timeSaved: "Save 1-2 hours per course"
    },
    basicOutline: {
      description: "Generate a basic course outline automatically",
      timeSaved: "Save 3-5 hours per course"
    },
    lessonSummaries: {
      description: "Get AI-generated summaries for each lesson",
      timeSaved: "Save 2-3 hours per course"
    },
    unlimitedCourses: {
      description: "Create and manage unlimited courses",
      timeSaved: "Scale your course business"
    },
    pdfExport: {
      description: "Export courses as beautiful PDFs",
      timeSaved: "Save 2-4 hours per course"
    },
    advancedStructuring: {
      description: "Advanced tools for organizing your course content",
      timeSaved: "Save 5-10 hours per course"
    },
    customBranding: {
      description: "Add your logo and colors to course materials",
      timeSaved: "Professional look with no design skills needed"
    },
    emailTemplates: {
      description: "Ready-to-use email sequences for course launches",
      timeSaved: "Save 5-8 hours per launch"
    },
    gumroadIntegration: {
      description: "Sell your courses directly on Gumroad",
      timeSaved: "Set up in minutes"
    },
    whiteLabel: {
      description: "Remove all CourseCraft branding from your materials",
      timeSaved: "Professional, branded experience"
    },
    premiumTemplates: {
      description: "Access to premium course templates",
      timeSaved: "Save 10+ hours per course"
    },
    advancedExport: {
      description: "Export to multiple formats including SCORM and xAPI",
      timeSaved: "Reach more learners"
    },
    prioritySupport: {
      description: "Get help when you need it with priority support",
      timeSaved: "Minimize downtime"
    },
    earlyAccess: {
      description: "Be the first to try new features",
      timeSaved: "Stay ahead of the curve"
    }
  };



  // Calculate potential savings with proper typing
  const calculateSavings = (planIndex: number): number => {
    const baseHours = 10;
    const multiplier = planIndex === 0 ? 1 : planIndex === 1 ? 3 : 5;
    return baseHours * multiplier * coursesCount * 50; // $50/hour rate
  };

  // Get plans to display based on mobile/desktop view
  const displayPlans = isMobile ? [plans[activePlan]] : plans as Plan[];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Course Creation Journey
          </h2>
          <p className="text-xl text-gray-600">
            Start free, grow at your own pace, and unlock powerful features as your audience grows.
            Save hundreds of hours with our AI-powered course creation tools.
          </p>
        </div>

        {/* Pricing Journey */}
        <div className="mb-16">
          <PricingJourney 
            activeIndex={activePlan} 
            onPlanSelect={setActivePlan}
          />
        </div>

        {/* Plan Toggle */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center bg-white rounded-full p-1 shadow-md border border-gray-200 mb-6">
            <button
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                isAnnual 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual (Save 20%)
            </button>
            <button
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                !isAnnual 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly Billing
            </button>
          </div>
          
          {/* Value Calculator Toggle */}
          <button 
            onClick={() => setShowValueCalculator(!showValueCalculator)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center group"
          >
            {showValueCalculator ? (
              <>
                <span>Hide Savings Calculator</span>
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <span>Show Me How Much I Can Save</span>
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Value Calculator */}
        <AnimatePresence>
          {showValueCalculator && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: '2rem' }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <ValueCalculator 
                onCoursesChange={setCoursesCount} 
                coursesCount={coursesCount}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayPlans.map((plan, index) => {
            const savings = calculateSavings(index);
            const isActive = activePlan === index;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  plan.highlighted 
                    ? 'shadow-2xl transform -translate-y-2 border-2 border-blue-500' 
                    : 'shadow-lg hover:shadow-xl border border-gray-200'
                }`}
              >
                {/* Plan Header */}
                <div className={`bg-gradient-to-r ${plan.theme.bg} ${plan.theme.border} border-b p-6`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-2xl font-bold ${plan.theme.text} flex items-center gap-2`}>
                        {plan.icon}
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mt-1">{plan.description}</p>
                    </div>
                    {plan.badge && (
                      <span className="bg-white text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-6 flex items-baseline">
                    {typeof plan.price === 'string' ? (
                      <>
                        <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                        <span className="ml-2 text-gray-600">one-time</span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-gray-900">
                          ${isAnnual ? plan.price.annually : plan.price.monthly}
                        </span>
                        <span className="ml-2 text-gray-600">
                          {isAnnual ? '/year' : '/month'}
                        </span>
                      </>
                    )}
                  </div>
                  
                  {savings > 0 && (
                    <div className="mt-2 text-sm text-green-600 font-medium">
                      Potential savings: ${savings.toLocaleString()}/year
                    </div>
                  )}
                </div>
                
                {/* Plan Features */}
                <div className="p-6 bg-white">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: { text: string; key?: string }, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-gray-800">{feature.text}</span>
                          {feature.key && (
                            <div className="group relative inline-block ml-1">
                              <button 
                                className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center hover:bg-gray-300 transition-colors"
                                aria-label="More info"
                              >
                                i
                              </button>
                              {feature.key && (
                                <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-64 bg-white shadow-lg rounded-lg p-3 text-sm text-gray-700 z-10 border border-gray-200">
                                  <p className="font-medium">{(featureDetails as any)[feature.key]?.description}</p>
                                  <div className="flex items-center mt-1 text-xs text-gray-500">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span>{(featureDetails as any)[feature.key]?.timeSaved}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="#" 
                    className={`
                      block w-full py-3 px-6 rounded-lg text-center font-medium transition-all
                      ${plan.highlighted 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-200'
                        : `bg-white border-2 ${plan.theme.text} border-current hover:bg-opacity-10 ${plan.theme.text.replace('text-', 'hover:bg-').replace('-700', '-100')}`
                      }
                    `}
                  >
                    {plan.cta}
                  </a>
                  
                  {plan.highlighted && (
                    <div className="mt-4 text-center text-sm text-gray-500">
                      Start your 7-day free trial. No credit card required.
                    </div>
                  )}
                </div>
                
                {/* Active Plan Indicator */}
                {isMobile && isActive && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Current Selection
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && (
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setActivePlan(prev => Math.max(0, prev - 1))}
              disabled={activePlan === 0}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activePlan === 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            <div className="flex items-center">
              {plans.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePlan(i)}
                  className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                    i === activePlan ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to plan ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActivePlan(prev => Math.min(plans.length - 1, prev + 1))}
              disabled={activePlan === plans.length - 1}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activePlan === plans.length - 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
        
        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            {[
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Your subscription will be prorated accordingly."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all paid plans come with a 7-day free trial. No credit card is required to start the trial."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards and PayPal. Annual plans are paid in one upfront payment."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period."
              },
              {
                question: "Do you offer discounts for non-profits or educational institutions?",
                answer: "Yes, we offer special pricing for non-profits and educational institutions. Please contact our sales team for more information."
              }
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={() => {
                    const isOpen = document.getElementById(`faq-${i}`)?.getAttribute('aria-expanded') === 'true';
                    document.getElementById(`faq-${i}`)?.setAttribute('aria-expanded', (!isOpen).toString());
                  }}
                  aria-controls={`faq-${i}`}
                  aria-expanded="false"
                >
                  {faq.question}
                  <svg className="w-5 h-5 text-gray-500 transition-transform transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id={`faq-${i}`} className="hidden px-6 py-4 bg-white text-gray-600" aria-hidden="true">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <a 
              href="#contact" 
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;