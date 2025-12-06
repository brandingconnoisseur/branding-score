import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, Mail, ExternalLink, ArrowRight, BarChart3, TrendingUp, AlertCircle, MessageSquare } from 'lucide-react';
import { BrandingChatPanel } from './BrandingChatPanel';
import { BrandingContext } from './brandingAiConfig';
type AnswerValue = 0 | 1 | 2 | 3 | 4;
type Question = {
  id: string;
  category: 'Identity' | 'Clarity' | 'Messaging' | 'Ownership' | 'Presence';
  question: string;
  options: {
    label: string;
    value: AnswerValue;
  }[];
};
type Answers = Record<string, AnswerValue>;
type CategoryScore = {
  category: string;
  score: number;
  maxScore: number;
};
type ScoreTier = 'At Risk' | 'Developing' | 'Growing' | 'Established';
const questions: Question[] = [
// Identity (5 questions)
{
  id: 'identity-1',
  category: 'Identity',
  question: 'How would you describe your brand\'s visual identity?',
  options: [{
    label: 'I don\'t have a logo or visual identity',
    value: 0
  }, {
    label: 'I have a basic logo only',
    value: 1
  }, {
    label: 'I have a logo and some brand colors',
    value: 2
  }, {
    label: 'I have a cohesive visual identity system',
    value: 3
  }, {
    label: 'I have a complete, professional brand identity with guidelines',
    value: 4
  }]
}, {
  id: 'identity-2',
  category: 'Identity',
  question: 'How consistent is your visual identity across all platforms?',
  options: [{
    label: 'Not consistent at all',
    value: 0
  }, {
    label: 'Slightly consistent',
    value: 1
  }, {
    label: 'Somewhat consistent',
    value: 2
  }, {
    label: 'Very consistent',
    value: 3
  }, {
    label: 'Fully consistent everywhere',
    value: 4
  }]
}, {
  id: 'identity-3',
  category: 'Identity',
  question: 'Do you have documented brand guidelines?',
  options: [{
    label: 'No guidelines at all',
    value: 0
  }, {
    label: 'Informal notes only',
    value: 1
  }, {
    label: 'Basic guidelines document',
    value: 2
  }, {
    label: 'Comprehensive guidelines',
    value: 3
  }, {
    label: 'Professional brand book used by my team',
    value: 4
  }]
}, {
  id: 'identity-4',
  category: 'Identity',
  question: 'How unique is your visual identity compared to competitors?',
  options: [{
    label: 'Very generic or similar to others',
    value: 0
  }, {
    label: 'Slightly differentiated',
    value: 1
  }, {
    label: 'Somewhat unique',
    value: 2
  }, {
    label: 'Very distinctive',
    value: 3
  }, {
    label: 'Completely unique and memorable',
    value: 4
  }]
}, {
  id: 'identity-5',
  category: 'Identity',
  question: 'How professional does your brand look and feel?',
  options: [{
    label: 'Amateur or DIY',
    value: 0
  }, {
    label: 'Below average',
    value: 1
  }, {
    label: 'Average quality',
    value: 2
  }, {
    label: 'Professional',
    value: 3
  }, {
    label: 'Premium and world-class',
    value: 4
  }]
},
// Clarity (4 questions)
{
  id: 'clarity-1',
  category: 'Clarity',
  question: 'How clearly can you explain what your brand does in one sentence?',
  options: [{
    label: 'I struggle to explain it clearly',
    value: 0
  }, {
    label: 'It takes multiple sentences',
    value: 1
  }, {
    label: 'I can explain it, but it\'s not concise',
    value: 2
  }, {
    label: 'I have a clear one-sentence explanation',
    value: 3
  }, {
    label: 'I have a crystal-clear, compelling one-liner',
    value: 4
  }]
}, {
  id: 'clarity-2',
  category: 'Clarity',
  question: 'How well-defined is your target audience?',
  options: [{
    label: 'I target everyone / not sure',
    value: 0
  }, {
    label: 'Broad demographic only',
    value: 1
  }, {
    label: 'General audience profile',
    value: 2
  }, {
    label: 'Specific target personas',
    value: 3
  }, {
    label: 'Deeply researched ideal customer profiles',
    value: 4
  }]
}, {
  id: 'clarity-3',
  category: 'Clarity',
  question: 'How well do you understand your competitive positioning?',
  options: [{
    label: 'Not clear at all',
    value: 0
  }, {
    label: 'Slightly aware of competitors',
    value: 1
  }, {
    label: 'Know my competitors but unclear positioning',
    value: 2
  }, {
    label: 'Clear positioning vs competitors',
    value: 3
  }, {
    label: 'Strong, differentiated market position',
    value: 4
  }]
}, {
  id: 'clarity-4',
  category: 'Clarity',
  question: 'How clear is your brand\'s unique value proposition?',
  options: [{
    label: 'Not defined',
    value: 0
  }, {
    label: 'Vague idea',
    value: 1
  }, {
    label: 'Somewhat clear',
    value: 2
  }, {
    label: 'Very clear',
    value: 3
  }, {
    label: 'Razor-sharp and compelling',
    value: 4
  }]
},
// Messaging (4 questions)
{
  id: 'messaging-1',
  category: 'Messaging',
  question: 'How confident are you that your brand messaging converts?',
  options: [{
    label: 'Not confident at all',
    value: 0
  }, {
    label: 'Slightly confident',
    value: 1
  }, {
    label: 'Somewhat confident',
    value: 2
  }, {
    label: 'Very confident',
    value: 3
  }, {
    label: 'Extremely confident with proven results',
    value: 4
  }]
}, {
  id: 'messaging-2',
  category: 'Messaging',
  question: 'How consistent is your brand voice and tone?',
  options: [{
    label: 'Inconsistent or undefined',
    value: 0
  }, {
    label: 'Slightly consistent',
    value: 1
  }, {
    label: 'Somewhat consistent',
    value: 2
  }, {
    label: 'Very consistent',
    value: 3
  }, {
    label: 'Perfectly consistent across all touchpoints',
    value: 4
  }]
}, {
  id: 'messaging-3',
  category: 'Messaging',
  question: 'Do you have key messaging pillars or themes?',
  options: [{
    label: 'No defined messaging',
    value: 0
  }, {
    label: 'Ad-hoc messaging',
    value: 1
  }, {
    label: 'Some recurring themes',
    value: 2
  }, {
    label: 'Defined messaging pillars',
    value: 3
  }, {
    label: 'Strategic messaging framework used consistently',
    value: 4
  }]
}, {
  id: 'messaging-4',
  category: 'Messaging',
  question: 'How well does your messaging resonate with your target audience?',
  options: [{
    label: 'Doesn\'t resonate',
    value: 0
  }, {
    label: 'Minimal resonance',
    value: 1
  }, {
    label: 'Some resonance',
    value: 2
  }, {
    label: 'Strong resonance',
    value: 3
  }, {
    label: 'Deep emotional connection with audience',
    value: 4
  }]
},
// Ownership (4 questions)
{
  id: 'ownership-1',
  category: 'Ownership',
  question: 'Do you own your primary domain name?',
  options: [{
    label: 'No domain or using free subdomain',
    value: 0
  }, {
    label: 'Own domain but not ideal',
    value: 1
  }, {
    label: 'Own good domain',
    value: 2
  }, {
    label: 'Own ideal domain',
    value: 3
  }, {
    label: 'Own ideal domain plus key variations',
    value: 4
  }]
}, {
  id: 'ownership-2',
  category: 'Ownership',
  question: 'Do you own your social media handles across platforms?',
  options: [{
    label: 'Don\'t own any consistent handles',
    value: 0
  }, {
    label: 'Own handles on 1-2 platforms',
    value: 1
  }, {
    label: 'Own handles on 3-4 platforms',
    value: 2
  }, {
    label: 'Own consistent handles on all major platforms',
    value: 3
  }, {
    label: 'Own all handles plus secured alternatives',
    value: 4
  }]
}, {
  id: 'ownership-3',
  category: 'Ownership',
  question: 'Have you trademarked your brand name or logo?',
  options: [{
    label: 'No trademark protection',
    value: 0
  }, {
    label: 'Considering it',
    value: 1
  }, {
    label: 'Application in progress',
    value: 2
  }, {
    label: 'Registered in one country',
    value: 3
  }, {
    label: 'Registered in multiple territories',
    value: 4
  }]
}, {
  id: 'ownership-4',
  category: 'Ownership',
  question: 'Do you own all your brand assets (logo files, fonts, images)?',
  options: [{
    label: 'Don\'t own key assets',
    value: 0
  }, {
    label: 'Own some assets',
    value: 1
  }, {
    label: 'Own most assets',
    value: 2
  }, {
    label: 'Own all assets',
    value: 3
  }, {
    label: 'Own all assets with proper licensing and documentation',
    value: 4
  }]
},
// Presence (3 questions)
{
  id: 'presence-1',
  category: 'Presence',
  question: 'How active and consistent is your brand presence online?',
  options: [{
    label: 'Inactive or sporadic',
    value: 0
  }, {
    label: 'Occasional posts',
    value: 1
  }, {
    label: 'Regular but inconsistent',
    value: 2
  }, {
    label: 'Consistent presence',
    value: 3
  }, {
    label: 'Highly active with strategic content calendar',
    value: 4
  }]
}, {
  id: 'presence-2',
  category: 'Presence',
  question: 'How well-optimized is your online presence for discovery?',
  options: [{
    label: 'Not optimized at all',
    value: 0
  }, {
    label: 'Basic setup only',
    value: 1
  }, {
    label: 'Some optimization',
    value: 2
  }, {
    label: 'Well-optimized',
    value: 3
  }, {
    label: 'Fully optimized with ongoing SEO/strategy',
    value: 4
  }]
}, {
  id: 'presence-3',
  category: 'Presence',
  question: 'How engaged is your audience with your brand?',
  options: [{
    label: 'No engagement',
    value: 0
  }, {
    label: 'Minimal engagement',
    value: 1
  }, {
    label: 'Some engagement',
    value: 2
  }, {
    label: 'Good engagement',
    value: 3
  }, {
    label: 'Highly engaged community',
    value: 4
  }]
}];
const calculateScores = (answers: Answers): {
  categoryScores: CategoryScore[];
  totalScore: number;
  tier: ScoreTier;
} => {
  const categories = ['Identity', 'Clarity', 'Messaging', 'Ownership', 'Presence'];
  const categoryScores: CategoryScore[] = [];
  let totalScore = 0;
  categories.forEach(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const categoryTotal = categoryQuestions.reduce((sum, q) => {
      const answer = answers[q.id] ?? 0;
      return sum + answer;
    }, 0);
    const maxScore = categoryQuestions.length * 4;
    const normalizedScore = Math.round(categoryTotal / maxScore * 20);
    categoryScores.push({
      category,
      score: normalizedScore,
      maxScore: 20
    });
    totalScore += normalizedScore;
  });
  let tier: ScoreTier = 'At Risk';
  if (totalScore >= 80) tier = 'Established';else if (totalScore >= 60) tier = 'Growing';else if (totalScore >= 40) tier = 'Developing';
  return {
    categoryScores,
    totalScore,
    tier
  };
};
const getTierColor = (tier: ScoreTier): string => {
  switch (tier) {
    case 'At Risk':
      return 'text-red-600';
    case 'Developing':
      return 'text-orange-600';
    case 'Growing':
      return 'text-blue-600';
    case 'Established':
      return 'text-green-600';
  }
};
const getTierBgColor = (tier: ScoreTier): string => {
  switch (tier) {
    case 'At Risk':
      return 'bg-red-50';
    case 'Developing':
      return 'bg-orange-50';
    case 'Growing':
      return 'bg-blue-50';
    case 'Established':
      return 'bg-green-50';
  }
};
const getTierDescription = (tier: ScoreTier): string => {
  switch (tier) {
    case 'At Risk':
      return 'Your brand foundation needs urgent attention. There are significant gaps in your brand strategy, identity, and execution. Without immediate action, you risk losing credibility and market position. Focus on establishing the fundamentals: clear positioning, consistent visual identity, and basic brand ownership.';
    case 'Developing':
      return 'Your brand shows good intent but lacks consistent execution. You have some foundational elements in place, but they\'re not yet working together cohesively. Your messaging may be unclear, your visual identity inconsistent, or your market position undefined. Focus on refining your core brand elements and creating consistency across all touchpoints.';
    case 'Growing':
      return 'Your brand is on solid ground with room to refine and optimize. You have most core elements in place and are executing with reasonable consistency. Your audience understands who you are and what you offer. Now it\'s time to elevate: sharpen your positioning, deepen audience engagement, and ensure every touchpoint reflects premium quality.';
    case 'Established':
      return 'Your brand demonstrates strength, clarity, and professional execution across all dimensions. You have a well-defined identity, clear positioning, consistent messaging, proper ownership, and strong presence. Continue to optimize, stay ahead of market trends, and deepen your audience relationships to maintain your competitive advantage.';
  }
};

// @component: BrandingScore
export const BrandingScore = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'questionnaire' | 'results'>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length * 100;
  const handleAnswer = (value: AnswerValue) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value
    };
    setAnswers(newAnswers);
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setCurrentStep('results');
      }, 300);
    }
  };
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    console.log('Report data:', {
      email,
      answers,
      scores: calculateScores(answers)
    });
    setEmailSubmitted(true);
  };
  const {
    categoryScores,
    totalScore,
    tier
  } = currentStep === 'results' ? calculateScores(answers) : {
    categoryScores: [],
    totalScore: 0,
    tier: 'At Risk' as ScoreTier
  };

  // Prepare branding context for AI chat
  const brandingContext: BrandingContext = {
    totalScore,
    tier,
    identityScore: categoryScores.find(c => c.category === 'Identity')?.score ?? 0,
    clarityScore: categoryScores.find(c => c.category === 'Clarity')?.score ?? 0,
    messagingScore: categoryScores.find(c => c.category === 'Messaging')?.score ?? 0,
    ownershipScore: categoryScores.find(c => c.category === 'Ownership')?.score ?? 0,
    presenceScore: categoryScores.find(c => c.category === 'Presence')?.score ?? 0
  };

  // @return
  return <div className="min-h-screen bg-neutral-50">
      <AnimatePresence mode="wait">
        {currentStep === 'landing' && <motion.div key="landing" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-3xl w-full">
              <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.1
          }} className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-900 text-white mb-6" style={{
              background: "#aa0000"
            }}>
                  <img className="w-10 h-10" src="https://storage.googleapis.com/storage.magicpath.ai/user/347885226866925568/assets/fc093feb-df18-44ff-bb6d-f16acb6ba3a0.png" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4 tracking-tight" style={{
              color: "#aa0000"
            }}>
                  Branding Score™
                </h1>
                <p className="text-xl text-neutral-600 mb-8">
                  A quick diagnostic that reveals how strong your brand really is across identity, clarity, messaging, ownership, and presence.
                </p>
              </motion.div>

              <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-12 mb-8">
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">5–7 minute questionnaire</h3>
                      <p className="text-neutral-600 text-sm">Answer strategic questions about your brand across five core categories</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Instant score out of 100</h3>
                      <p className="text-neutral-600 text-sm">See your total Branding Score™ and category breakdown immediately</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Actionable recommendations</h3>
                      <p className="text-neutral-600 text-sm">Get tailored insights on your strengths, weaknesses, and next steps</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => setCurrentStep('questionnaire')} className="w-full bg-neutral-900 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group">
                  Start the Diagnostic
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.p initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.3
          }} className="text-center text-sm text-neutral-500">
                Trusted by founders and brand strategists worldwide
              </motion.p>
            </div>
          </motion.div>}

        {currentStep === 'questionnaire' && <motion.div key="questionnaire" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="min-h-screen flex flex-col">
            <div className="bg-white border-b border-neutral-200 px-4 py-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-neutral-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-neutral-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                  <motion.div className="h-full bg-neutral-900" initial={{
                width: 0
              }} animate={{
                width: `${progress}%`
              }} transition={{
                duration: 0.3
              }} />
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-4 py-12">
              <div className="max-w-2xl w-full">
                <AnimatePresence mode="wait">
                  <motion.div key={currentQuestion.id} initial={{
                x: 20,
                opacity: 0
              }} animate={{
                x: 0,
                opacity: 1
              }} exit={{
                x: -20,
                opacity: 0
              }} transition={{
                duration: 0.3
              }}>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium mb-6">
                        {currentQuestion.category}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-10">{currentQuestion.question}</h2>

                    <div className="space-y-3">
                      {currentQuestion.options.map(option => <motion.button key={option.value} onClick={() => handleAnswer(option.value)} className={`w-full text-left p-5 rounded-xl border-2 transition-all hover:border-neutral-900 hover:bg-neutral-50 ${answers[currentQuestion.id] === option.value ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 bg-white'}`} whileHover={{
                    scale: 1.01
                  }} whileTap={{
                    scale: 0.99
                  }}>
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-900 font-medium">{option.label}</span>
                            {answers[currentQuestion.id] === option.value && <CheckCircle2 className="w-5 h-5 text-neutral-900 flex-shrink-0" />}
                          </div>
                        </motion.button>)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>}

        {currentStep === 'results' && <motion.div key="results" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="min-h-screen px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.1
          }} className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">Your Branding Score™</h1>
                <p className="text-neutral-600">Here's how your brand measures up across all dimensions</p>
              </motion.div>

              <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className={`${getTierBgColor(tier)} rounded-2xl p-8 md:p-12 mb-8 border-2 ${tier === 'At Risk' ? 'border-red-200' : tier === 'Developing' ? 'border-orange-200' : tier === 'Growing' ? 'border-blue-200' : 'border-green-200'}`}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white shadow-lg mb-6">
                    <span className="text-6xl font-bold text-neutral-900">{totalScore}</span>
                  </div>
                  <h2 className={`text-3xl font-bold ${getTierColor(tier)} mb-2`}>{tier}</h2>
                  <p className="text-neutral-600 text-lg">Out of 100 possible points</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-neutral-900 mb-4">Category Breakdown</h3>
                  <div className="space-y-4">
                    {categoryScores.map((cat, index) => <div key={cat.category}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-neutral-700">{cat.category}</span>
                          <span className="text-sm font-semibold text-neutral-900">
                            {cat.score}/{cat.maxScore}
                          </span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                          <motion.div className="h-full bg-neutral-900" initial={{
                      width: 0
                    }} animate={{
                      width: `${cat.score / cat.maxScore * 100}%`
                    }} transition={{
                      duration: 0.8,
                      delay: 0.3 + index * 0.1
                    }} />
                        </div>
                      </div>)}
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.3
          }} className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-10 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${getTierBgColor(tier)}`}>
                    {tier === 'At Risk' && <AlertCircle className={`w-6 h-6 ${getTierColor(tier)}`} />}
                    {tier === 'Developing' && <TrendingUp className={`w-6 h-6 ${getTierColor(tier)}`} />}
                    {tier === 'Growing' && <TrendingUp className={`w-6 h-6 ${getTierColor(tier)}`} />}
                    {tier === 'Established' && <CheckCircle2 className={`w-6 h-6 ${getTierColor(tier)}`} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">What This Means</h3>
                    <p className="text-neutral-700 leading-relaxed">{getTierDescription(tier)}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.4
          }} className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-10 mb-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Get Your Full Report</h3>
                <p className="text-neutral-600 mb-6">
                  Enter your email to receive a detailed breakdown of your results with personalized recommendations.
                </p>

                {!emailSubmitted ? <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 transition-colors" />
                    <button type="submit" className="bg-neutral-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                      <Mail className="w-5 h-5" />
                      Email Me This Report
                    </button>
                  </form> : <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 font-medium">
                      Report sent! (In this demo, we're simulating email delivery. Check the console for the data.)
                    </p>
                  </div>}

                <p className="text-xs text-neutral-500 mt-4">
                  Note: In production, this would connect to your email service provider to deliver the report.
                </p>
              </motion.div>

              <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.45
          }} className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 md:p-10 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Chat with Branding Connoisseur AI</h3>
                      <p className="text-neutral-200 leading-relaxed">
                        Prefer to talk it through? Chat with Branding Connoisseur AI – an assistant trained to help you interpret your Branding Score™ and plan your next steps. It's an AI, not a human, but it thinks like a branding strategist and creative director.
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setIsChatOpen(true)} className="bg-white text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors flex items-center gap-2 mt-6">
                    <MessageSquare className="w-5 h-5" />
                    Open Branding Chat
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.5
          }} className="grid md:grid-cols-2 gap-6">
                <div className="bg-neutral-900 text-white rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <h3 className="text-2xl font-bold mb-3 relative z-10">Advanced Report</h3>
                  <p className="text-neutral-300 mb-6 relative z-10">
                    Unlock deeper insights with competitor analysis, growth roadmap, and strategic recommendations.
                  </p>
                  <a href="https://checkout.example.com/advanced-report" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors relative z-10">
                    Upgrade Now
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

                <div className="bg-white border-2 border-neutral-900 rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-900/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3 relative z-10">1:1 Brand Review</h3>
                  <p className="text-neutral-600 mb-6 relative z-10">
                    Book a personal consultation to review your score and create a custom action plan.
                  </p>
                  <a href="https://calendly.com/example/branding-score-call" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors relative z-10">
                    Book a Call
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.6
          }} className="text-center mt-12">
                <button onClick={() => {
              setCurrentStep('landing');
              setCurrentQuestionIndex(0);
              setAnswers({});
              setEmail('');
              setEmailSubmitted(false);
              setIsChatOpen(false);
            }} className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors">
                  Start Over
                </button>
              </motion.div>
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* AI Chat Panel */}
      <BrandingChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} brandingContext={brandingContext} />
    </div>;
};