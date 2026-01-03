import { useState } from 'react';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Profile } from './components/Profile';
import { HealthcareProvider } from './components/HealthcareProvider';
import { SupportGroups } from './components/SupportGroups';

type DepressionLevel =
  | 'minimal'
  | 'low'
  | 'mild'
  | 'moderate'
  | 'higher_risk';

interface BackendResult {
  total_epds_score: number;
  depression_level: DepressionLevel;
  recommendation_title: string;
  recommendation_message: string;
  emergency_advice?: string;
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'profile' | 'quiz' | 'results' | 'healthcare' | 'support'
  >('home');

  const [assessmentResult, setAssessmentResult] = useState<BackendResult | null>(null);
  const [demographics, setDemographics] = useState<DemographicsData | null>(null);

  const handleStartQuiz = () => {
    setCurrentPage('quiz');
    setAssessmentResult(null);
    setDemographics(null);
  };

  const handleQuizComplete = (
    backendResult: BackendResult,
    demographicsData: DemographicsData
  ) => {
    setAssessmentResult(backendResult);
    setDemographics(demographicsData);
    setCurrentPage('results');
  };

  const handleReset = () => {
    setCurrentPage('home');
    setAssessmentResult(null);
    setDemographics(null);
  };

  const handleNavigateToHealthcare = () => {
    setCurrentPage('healthcare');
  };

  const handleNavigateToSupport = () => {
    setCurrentPage('support');
  };

  const handleBackToResults = () => {
    setCurrentPage('results');
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'home' && (
        <>
          <Hero onStartQuiz={handleStartQuiz} />
          <InfoSection onStartQuiz={handleStartQuiz} />
        </>
      )}

      {currentPage === 'profile' && <Profile />}

      {currentPage === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} onBack={handleReset} />
      )}

        {currentPage === 'results' &&
          assessmentResult?.depression_level && (
            <Results
              result={assessmentResult}
              onReset={handleReset}
              onNavigateToHealthcare={handleNavigateToHealthcare}
              onNavigateToSupportGroups={handleNavigateToSupport}
            />
        )}


      {currentPage === 'healthcare' && (
        <HealthcareProvider onBack={handleBackToResults} />
      )}

      {currentPage === 'support' && (
        <SupportGroups onBack={handleBackToResults} />
      )}
    </div>
  );
}
