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

interface BackendResult {
  total_epds_score: number;
  depression_level: 'low' | 'mild' | 'moderate' | 'higher_risk';
  recommendation_title: string;
  recommendation_message: string;
  emergency_advice?: string;
}

interface ResultsProps {
  result: BackendResult;
  onReset: () => void;
  demographics: DemographicsData | null;
  onNavigateToHealthcare: () => void;
  onNavigateToSupportGroups: () => void;
}

/* 🔹 UI mapping ONLY (no logic) */
const levelUI = {
  low: {
    color: 'from-green-400 to-emerald-400',
    bgColor: 'from-green-50 to-emerald-50',
  },
  mild: {
    color: 'from-yellow-400 to-orange-400',
    bgColor: 'from-yellow-50 to-orange-50',
  },
  moderate: {
    color: 'from-orange-400 to-rose-400',
    bgColor: 'from-orange-50 to-rose-50',
  },
  higher_risk: {
    color: 'from-rose-400 to-pink-500',
    bgColor: 'from-rose-50 to-pink-50',
  },
};

export function Results({
  result,
  onReset,
  demographics,
  onNavigateToHealthcare,
  onNavigateToSupportGroups,
}: ResultsProps) {
  const ui = levelUI[result.depression_level];

  const resources = [
    {
      icon: Phone,
      title: 'Crisis Support',
      desc: 'National Suicide Prevention Lifeline: 988',
      urgent: true,
      action: null,
    },
    {
      icon: Users,
      title: 'Postpartum Support International',
      desc: 'Call or text: 1-800-944-4773',
      urgent: false,
      action: null,
    },
    {
      icon: Heart,
      title: 'Healthcare Provider',
      desc: 'Find and book appointments with mental health professionals',
      urgent: false,
      action: onNavigateToHealthcare,
    },
    {
      icon: FileText,
      title: 'Support Groups',
      desc: 'Join our community of mothers experiencing similar challenges',
      urgent: false,
      action: onNavigateToSupportGroups,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className={`p-8 bg-gradient-to-br ${ui.bgColor} border-2 border-white/50 shadow-2xl mb-8`}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-block mb-4"
              >
                <div
                  className={`w-32 h-32 rounded-full bg-gradient-to-br ${ui.color} flex items-center justify-center text-white mx-auto shadow-lg`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-1">
                      {result.total_epds_score}
                    </div>
                    <div className="text-sm">/ 30</div>
                  </div>
                </div>
              </motion.div>

              <h2 className="text-purple-900 mb-4">
                {result.recommendation_title}
              </h2>

              <p className="text-purple-800 text-lg mb-6">
                {result.recommendation_message}
              </p>

              <Alert className="bg-white/60 border-purple-300">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <AlertDescription className="text-purple-900">
                  This result is based on your responses and an automated risk
                  assessment.
                </AlertDescription>
              </Alert>
            </div>
          </Card>

          {/* 🚨 Emergency advice ONLY if backend sends it */}
          {result.emergency_advice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Alert className="bg-rose-100 border-rose-400">
                <Phone className="h-5 w-5 text-rose-700" />
                <AlertDescription className="text-rose-900">
                  <strong>Important:</strong> {result.emergency_advice}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-purple-900 mb-6 text-center">
              Support & Resources
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card
                    className={`p-6 ${
                      resource.urgent
                        ? 'bg-rose-50 border-rose-300'
                        : 'bg-white/80'
                    } backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${
                      resource.action ? 'cursor-pointer' : ''
                    }`}
                    onClick={resource.action ?? undefined}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 ${
                          resource.urgent
                            ? 'bg-rose-200'
                            : 'bg-purple-100'
                        } rounded-xl`}
                      >
                        <resource.icon
                          className={`w-6 h-6 ${
                            resource.urgent
                              ? 'text-rose-700'
                              : 'text-purple-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-900 mb-1">
                          {resource.title}
                        </h4>
                        <p className="text-purple-700 text-sm">
                          {resource.desc}
                        </p>
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
                <strong>Remember:</strong> This screening tool is not a diagnosis.
                Only a qualified healthcare professional can diagnose postpartum
                depression.
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
