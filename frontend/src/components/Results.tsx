import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Heart, Phone, Users, FileText, Home, Sparkles } from 'lucide-react';

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

interface ResultsProps {
  score: number;
  mlResult: string; // ✅ AJOUT
  onReset: () => void;
  demographics: DemographicsData | null;
  onNavigateToHealthcare: () => void;
  onNavigateToSupportGroups: () => void;
}


export function Results({ score,mlResult, onReset, demographics, onNavigateToHealthcare, onNavigateToSupportGroups }: ResultsProps) {
  const getResultInfo = (score: number) => {
    if (score <= 9) {
      return {
        level: 'Low Risk',
        color: 'from-green-400 to-emerald-400',
        bgColor: 'from-green-50 to-emerald-50',
        message: 'Your responses suggest you may not be experiencing postpartum depression at this time.',
        recommendation: 'Continue monitoring your emotional well-being and maintain open communication with your healthcare provider during regular check-ups.'
      };
    } else if (score <= 12) {
      return {
        level: 'Moderate Risk',
        color: 'from-yellow-400 to-orange-400',
        bgColor: 'from-yellow-50 to-orange-50',
        message: 'Your responses suggest you may be experiencing some symptoms that warrant attention.',
        recommendation: 'We recommend discussing these feelings with your healthcare provider. They can help determine if you would benefit from additional support or treatment.'
      };
    } else {
      return {
        level: 'Higher Risk',
        color: 'from-rose-400 to-pink-500',
        bgColor: 'from-rose-50 to-pink-50',
        message: 'Your responses suggest you may be experiencing significant symptoms of postpartum depression.',
        recommendation: 'We strongly encourage you to reach out to a healthcare provider as soon as possible. Postpartum depression is treatable, and you deserve support.'
      };
    }
  };

  const result = getResultInfo(score);

  const resources = [
    {
      icon: Phone,
      title: 'Crisis Support',
      desc: 'National Suicide Prevention Lifeline: 988',
      urgent: true,
      action: null
    },
    {
      icon: Users,
      title: 'Postpartum Support International',
      desc: 'Call or text: 1-800-944-4773',
      urgent: false,
      action: null
    },
    {
      icon: Heart,
      title: 'Healthcare Provider',
      desc: 'Find and book appointments with mental health professionals',
      urgent: false,
      action: onNavigateToHealthcare
    },
    {
      icon: FileText,
      title: 'Support Groups',
      desc: 'Join our community of mothers experiencing similar challenges',
      urgent: false,
      action: onNavigateToSupportGroups
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={`p-8 bg-gradient-to-br ${result.bgColor} border-2 border-white/50 shadow-2xl mb-8`}>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-4"
              >
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center text-white mx-auto shadow-lg`}>
                   <div className="text-center">
                     <div className="text-4xl mb-1">{score}</div>
                       <div className="text-sm">/ 30</div>
                         <div className="mt-4 text-purple-900 text-center text-lg font-semibold">
                              {mlResult}
                           </div>
                      </div>
                  </div>

              </motion.div>
              
              <h2 className="text-purple-900 mb-4">{result.level}</h2>
              <p className="text-purple-800 text-lg mb-6">{result.message}</p>
              <Alert className="bg-white/60 border-purple-300">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <AlertDescription className="text-purple-900">
                  {result.recommendation}
                </AlertDescription>
              </Alert>
            </div>
          </Card>

          {score >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Alert className="bg-rose-100 border-rose-400">
                <Phone className="h-5 w-5 text-rose-700" />
                <AlertDescription className="text-rose-900">
                  <strong>Important:</strong> If you're having thoughts of harming yourself or your baby, 
                  please call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room immediately.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-purple-900 mb-6 text-center">Support & Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card 
                    className={`p-6 ${resource.urgent ? 'bg-rose-50 border-rose-300' : 'bg-white/80'} backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${resource.action ? 'cursor-pointer' : ''}`}
                    onClick={resource.action ? resource.action : undefined}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${resource.urgent ? 'bg-rose-200' : 'bg-purple-100'} rounded-xl`}>
                        <resource.icon className={`w-6 h-6 ${resource.urgent ? 'text-rose-700' : 'text-purple-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-900 mb-1">{resource.title}</h4>
                        <p className="text-purple-700 text-sm">{resource.desc}</p>
                        {resource.action && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              resource.action?.();
                            }}
                            className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            size="sm"
                          >
                            Learn More
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200 mb-6">
              <p className="text-purple-800 mb-4">
                <strong>Remember:</strong> This screening tool is not a diagnosis. Only a qualified healthcare 
                professional can diagnose postpartum depression. If you're concerned about your symptoms, 
                please reach out to your doctor or mental health professional.
              </p>
            </Card>
            
            <Button
              onClick={onReset}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 