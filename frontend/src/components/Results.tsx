import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Heart, Phone, Users, FileText, Home, Sparkles } from 'lucide-react';

interface BackendResult {
  total_epds_score: number;
  depression_level: 'low' | 'mild' | 'moderate' | 'higher_risk';
  recommendation_title: string;
  recommendation_message: string;
  emergency_advice?: string;
}

interface ResultsProps {
  result: BackendResult | null;
  onReset: () => void;
  onNavigateToHealthcare: () => void;
  onNavigateToSupportGroups: () => void;
}

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
  onNavigateToHealthcare,
  onNavigateToSupportGroups,
}: ResultsProps) {
  if (!result) return null; // 🔴 prevents blank / crash

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
      desc: 'Find mental health professionals',
      urgent: false,
      action: onNavigateToHealthcare,
    },
    {
      icon: FileText,
      title: 'Support Groups',
      desc: 'Join postpartum support communities',
      urgent: false,
      action: onNavigateToSupportGroups,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className={`p-8 bg-gradient-to-br ${ui.bgColor} shadow-2xl mb-8`}>
            <div className="text-center">
              <div
                className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${ui.color} flex flex-col justify-center items-center text-white shadow-lg`}
              >
                <div className="text-4xl">{result.total_epds_score}</div>
                <div className="text-sm">/ 30</div>
              </div>

              <h2 className="text-purple-900 mt-6 mb-2 text-2xl font-semibold">
                {result.recommendation_title}
              </h2>

              <p className="text-purple-800 text-lg mb-6">
                {result.recommendation_message}
              </p>

              {result.emergency_advice && (
                <Alert className="bg-white/70 border-purple-300">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <AlertDescription className="text-purple-900">
                    {result.emergency_advice}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Card>

          <h3 className="text-purple-900 mb-6 text-center text-xl">
            Support & Resources
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {resources.map((r, i) => (
              <Card
                key={i}
                className="p-6 bg-white/80 hover:shadow-lg transition cursor-pointer"
                onClick={r.action ?? undefined}
              >
                <div className="flex gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <r.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-purple-900 font-medium">{r.title}</h4>
                    <p className="text-purple-700 text-sm">{r.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={onReset}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
