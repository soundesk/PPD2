import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { ArrowLeft, ArrowRight, Flower2, AlertCircle } from 'lucide-react';

interface QuizProps {
  onComplete: (score: number, demographics: DemographicsData) => void;
  onBack: () => void;
}

interface DemographicsData {
  age: number;
  country: string;
  delivery_type: 'vaginal' | 'c-section' | '';
  education_level: string;
  income_level: string;
  partner_support: number;
  family_support: number;
  support_total: number;
  recent_birth: boolean | null;
}

const API_URL = import.meta.env.VITE_API_URL; // <-- use .env variable

const questions = [
  {
    id: 1,
    question: "I have been able to laugh and see the funny side of things",
    options: [
      { text: "As much as I always could", value: 0 },
      { text: "Not quite so much now", value: 1 },
      { text: "Definitely not so much now", value: 2 },
      { text: "Not at all", value: 3 }
    ]
  },
  {
    id: 2,
    question: "I have looked forward with enjoyment to things",
    options: [
      { text: "As much as I ever did", value: 0 },
      { text: "Rather less than I used to", value: 1 },
      { text: "Definitely less than I used to", value: 2 },
      { text: "Hardly at all", value: 3 }
    ]
  },
  {
    id: 3,
    question: "I have blamed myself unnecessarily when things went wrong",
    options: [
      { text: "No, never", value: 0 },
      { text: "Not very often", value: 1 },
      { text: "Yes, some of the time", value: 2 },
      { text: "Yes, most of the time", value: 3 }
    ]
  },
  {
    id: 4,
    question: "I have been anxious or worried for no good reason",
    options: [
      { text: "No, not at all", value: 0 },
      { text: "Hardly ever", value: 1 },
      { text: "Yes, sometimes", value: 2 },
      { text: "Yes, very often", value: 3 }
    ]
  },
  {
    id: 5,
    question: "I have felt scared or panicky for no good reason",
    options: [
      { text: "No, not at all", value: 0 },
      { text: "No, not much", value: 1 },
      { text: "Yes, sometimes", value: 2 },
      { text: "Yes, quite a lot", value: 3 }
    ]
  },
  {
    id: 6,
    question: "Things have been getting on top of me",
    options: [
      { text: "No, I have been coping as well as ever", value: 0 },
      { text: "No, most of the time I have coped quite well", value: 1 },
      { text: "Yes, sometimes I haven't been coping as well as usual", value: 2 },
      { text: "Yes, most of the time I haven't been able to cope", value: 3 }
    ]
  },
  {
    id: 7,
    question: "I have been so unhappy that I have had difficulty sleeping",
    options: [
      { text: "No, not at all", value: 0 },
      { text: "Not very often", value: 1 },
      { text: "Yes, sometimes", value: 2 },
      { text: "Yes, most of the time", value: 3 }
    ]
  },
  {
    id: 8,
    question: "I have felt sad or miserable",
    options: [
      { text: "No, not at all", value: 0 },
      { text: "Not very often", value: 1 },
      { text: "Yes, quite often", value: 2 },
      { text: "Yes, most of the time", value: 3 }
    ]
  },
  {
    id: 9,
    question: "I have been so unhappy that I have been crying",
    options: [
      { text: "No, never", value: 0 },
      { text: "Only occasionally", value: 1 },
      { text: "Yes, quite often", value: 2 },
      { text: "Yes, most of the time", value: 3 }
    ]
  },
  {
    id: 10,
    question: "The thought of harming myself has occurred to me ⚠️",
    options: [
      { text: "Never", value: 0 },
      { text: "Hardly ever", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Yes, quite often", value: 3 }
    ]
  }
];

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "France", 
  "Germany", "Spain", "Italy", "Netherlands", "Morocco", "Algeria",
  "Tunisia", "Egypt", "Saudi Arabia", "UAE", "Other"
];

const educationLevels = [
  "High School or Less",
  "Some College",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate or Higher"
];

export function Quiz({ onComplete, onBack }: QuizProps) {
  const [step, setStep] = useState<'demographics' | 'quiz'>('demographics');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  
  const [demographics, setDemographics] = useState<DemographicsData>({
    age: 0,
    country: '',
    delivery_type: '',
    education_level: '',
    income_level: '',
    partner_support: 5,
    family_support: 5,
    support_total: 10,
    recent_birth: null
  });

  const [ageError, setAgeError] = useState('');

  const totalSteps = 11; // 1 demographics + 10 questions
  const currentStepNumber = step === 'demographics' ? 1 : currentQuestion + 2;
  const progress = (currentStepNumber / totalSteps) * 100;

  const updateDemographics = (field: keyof DemographicsData, value: any) => {
    const updated = { ...demographics, [field]: value };
    setDemographics(updated);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 51) {
      setAgeError('Age cannot exceed 51 years');
    } else {
      setAgeError('');
      updateDemographics('age', value);
    }
  };

  const isDemographicsValid = () => {
    return demographics.age > 0 && 
           demographics.age <= 51 &&
           demographics.country !== '' &&
           demographics.delivery_type !== '' &&
           demographics.education_level !== '' &&
           demographics.income_level !== '' &&
           demographics.recent_birth !== null;
  };

  const startQuiz = () => {
    if (isDemographicsValid()) {
      setStep('quiz');
      setDirection(1);
    }
  };

  const handleAnswer = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
  if (selectedAnswer !== null) {
    const updatedAnswers = { ...answers, [currentQuestion]: selectedAnswer };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(updatedAnswers[currentQuestion + 1] ?? null);
    } else {
  const score = Object.values(updatedAnswers).reduce(
    (sum, val) => sum + val,
    0
  );

 const formattedAnswers = Object.entries(updatedAnswers).map(
  ([questionIndex, answerValue]) => ({
    question_id: Number(questionIndex) + 1,
    answer_value: answerValue
  })
);

fetch(`${API_URL}/assessments/`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: 1, // TEMP value, see below
    answers: formattedAnswers
  }),
})
  .then(res => res.json())
  .then(data => {
    console.log('Backend response:', data);
    onComplete(data, demographics);

  })
  .catch(err => console.error(err));

}
  }
   }



  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    } else {
      // Go back to demographics
      setStep('demographics');
      setDirection(-1);
    }
  };

  const currentQ = step === 'quiz' ? questions[currentQuestion] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 opacity-10"
      >
        <Flower2 className="w-64 h-64 text-purple-300" />
      </motion.div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-purple-700 hover:text-purple-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-purple-700">
                {step === 'demographics' ? 'Step 1: Your Information' : `Question ${currentQuestion + 1} of ${questions.length}`}
              </span>
              <span className="text-purple-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          {step === 'demographics' ? (
            <motion.div
              key="demographics"
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-sm border-pink-200/50 shadow-xl">
                <div className="mb-6">
                  <h3 className="text-purple-900 mb-2">Personal Information</h3>
                  <p className="text-purple-600 text-sm">Please fill in your details to begin the assessment</p>
                </div>

                <div className="space-y-6">
                  {/* Age */}
                  <div>
                    <Label htmlFor="age" className="text-purple-900 mb-2 block">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      min="1"
                      max="51"
                      value={demographics.age || ''}
                      onChange={handleAgeChange}
                      className="border-pink-200 focus:border-purple-400"
                      placeholder="Enter your age"
                    />
                    {ageError && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {ageError}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <Label htmlFor="country" className="text-purple-900 mb-2 block">Country</Label>
                    <Select value={demographics.country} onValueChange={(value) => updateDemographics('country', value)}>
                      <SelectTrigger className="border-pink-200 focus:border-purple-400">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Delivery Type */}
                  <div>
                    <Label className="text-purple-900 mb-3 block">Delivery Type</Label>
                    <RadioGroup 
                      value={demographics.delivery_type} 
                      onValueChange={(value) => updateDemographics('delivery_type', value)}
                      className="flex gap-4"
                    >
                      <Label
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all flex-1 ${
                          demographics.delivery_type === 'vaginal'
                            ? 'border-purple-400 bg-purple-50'
                            : 'border-pink-200 bg-white hover:border-purple-300'
                        }`}
                      >
                        <RadioGroupItem value="vaginal" id="vaginal" />
                        <span className="text-purple-900">Vaginal</span>
                      </Label>
                      <Label
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all flex-1 ${
                          demographics.delivery_type === 'c-section'
                            ? 'border-purple-400 bg-purple-50'
                            : 'border-pink-200 bg-white hover:border-purple-300'
                        }`}
                      >
                        <RadioGroupItem value="c-section" id="c-section" />
                        <span className="text-purple-900">C-Section</span>
                      </Label>
                    </RadioGroup>
                  </div>

                  {/* Education Level */}
                  <div>
                    <Label htmlFor="education" className="text-purple-900 mb-2 block">Education Level</Label>
                    <Select value={demographics.education_level} onValueChange={(value) => updateDemographics('education_level', value)}>
                      <SelectTrigger className="border-pink-200 focus:border-purple-400">
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Income Level */}
                  <div>
                    <Label htmlFor="income" className="text-purple-900 mb-2 block">Income Level</Label>
                    <Select value={demographics.income_level} onValueChange={(value) => updateDemographics('income_level', value)}>
                      <SelectTrigger className="border-pink-200 focus:border-purple-400">
                        <SelectValue placeholder="Select your income level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Partner Support */}
                  <div>
                    <Label className="text-purple-900 mb-2 block">
                      Partner Support Level: {demographics.partner_support}/10
                    </Label>
                    <Slider
                      value={[demographics.partner_support]}
                      onValueChange={(value) => updateDemographics('partner_support', value[0])}
                      max={10}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-purple-600 mt-1">
                      <span>No Support</span>
                      <span>Full Support</span>
                    </div>
                  </div>

                  {/* Family Support */}
                  <div>
                    <Label className="text-purple-900 mb-2 block">
                      Family Support Level: {demographics.family_support}/10
                    </Label>
                    <Slider
                      value={[demographics.family_support]}
                      onValueChange={(value) => updateDemographics('family_support', value[0])}
                      max={10}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-purple-600 mt-1">
                      <span>No Support</span>
                      <span>Full Support</span>
                    </div>
                  </div>

                  {/* Recent Birth */}
                  <div>
                    <Label className="text-purple-900 mb-3 block">Did you give birth recently? (within 12 months)</Label>
                    <RadioGroup 
                      value={demographics.recent_birth === null ? '' : demographics.recent_birth.toString()} 
                      onValueChange={(value) => updateDemographics('recent_birth', value === 'true')}
                      className="flex gap-4"
                    >
                      <Label
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all flex-1 ${
                          demographics.recent_birth === true
                            ? 'border-purple-400 bg-purple-50'
                            : 'border-pink-200 bg-white hover:border-purple-300'
                        }`}
                      >
                        <RadioGroupItem value="true" id="recent-yes" />
                        <span className="text-purple-900">Yes</span>
                      </Label>
                      <Label
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all flex-1 ${
                          demographics.recent_birth === false
                            ? 'border-purple-400 bg-purple-50'
                            : 'border-pink-200 bg-white hover:border-purple-300'
                        }`}
                      >
                        <RadioGroupItem value="false" id="recent-no" />
                        <span className="text-purple-900">No</span>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    onClick={startQuiz}
                    disabled={!isDemographicsValid()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Start Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-sm border-pink-200/50 shadow-xl">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white">
                      {currentQuestion + 1}
                    </div>
                    <h3 className="text-purple-900 flex-1">{currentQ?.question}</h3>
                  </div>
                </div>

                <RadioGroup
                   value={selectedAnswer === null ? '' : selectedAnswer.toString()}
                   onValueChange={(value) => handleAnswer(Number(value))}
                >

                  <div className="space-y-4">
                    {currentQ?.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Label
                          htmlFor={`option-${index}`}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedAnswer === option.value
                              ? 'border-purple-400 bg-purple-50'
                              : 'border-pink-200 bg-white hover:border-purple-300 hover:bg-purple-25'
                          }`}
                        >
                          <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                          <span className="text-purple-900">{option.text}</span>
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex justify-between mt-8 gap-4">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
