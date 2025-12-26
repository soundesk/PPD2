import { useState } from 'react';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Profile } from './components/Profile';
import { HealthcareProvider } from './components/HealthcareProvider';
import { SupportGroups } from './components/SupportGroups';

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
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'quiz' | 'results' | 'healthcare' | 'support'>('home');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [demographics, setDemographics] = useState<DemographicsData | null>(null);

  const handleStartQuiz = () => {
    setCurrentPage('quiz');
    setQuizScore(null);
    setDemographics(null);
  };

  const handleQuizComplete = (score: number, demographicsData: DemographicsData) => {
    setQuizScore(score);
    setDemographics(demographicsData);
    setCurrentPage('results');
  };

  const handleReset = () => {
    setCurrentPage('home');
    setQuizScore(null);
    setDemographics(null);
  };

  const handleNavigate = (page: 'home' | 'profile') => {
    setCurrentPage(page);
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
      
      {currentPage === 'profile' && (
        <Profile />
      )}
      
      {currentPage === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} onBack={handleReset} />
      )}
      
      {currentPage === 'results' && quizScore !== null && (
        <Results 
          score={quizScore} 
          onReset={handleReset} 
          demographics={demographics} 
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