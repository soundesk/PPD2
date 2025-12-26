import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { User, Home, Flower2, Heart, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'profile') => void;
  currentPage: 'home' | 'profile' | 'quiz' | 'results';
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  if (currentPage === 'quiz' || currentPage === 'results') {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Gradient background with blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/95 via-pink-50/95 to-rose-50/95 backdrop-blur-lg" />
      
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
      
      {/* Animated sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 left-1/4"
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
        </motion.div>
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-4 right-1/3"
        >
          <Flower2 className="w-5 h-5 text-purple-400" />
        </motion.div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-pink-200/30 rounded-full blur-md group-hover:bg-pink-300/40 transition-all" />
              <div className="relative bg-gradient-to-br from-pink-100 to-purple-100 p-2 rounded-full border border-pink-300/50 backdrop-blur-sm group-hover:border-pink-400/60 transition-all">
                <Heart className="w-6 h-6 text-pink-600 fill-pink-600" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-purple-900 text-xl tracking-wide">
                <span className="font-semibold">PPD</span> Support
              </h1>
              <p className="text-purple-600 text-xs -mt-1">You are not alone</p>
            </div>
          </motion.div>
          
          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                className={`relative overflow-hidden transition-all duration-300 ${
                  currentPage === 'home' 
                    ? 'bg-purple-200/40 text-purple-900 hover:bg-purple-200/50 border border-purple-300/50' 
                    : 'text-purple-700 hover:text-purple-900 hover:bg-purple-100/50'
                }`}
              >
                {currentPage === 'home' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-200/40 border border-purple-300/50 rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                onClick={() => onNavigate('profile')}
                className={`relative overflow-hidden transition-all duration-300 ${
                  currentPage === 'profile' 
                    ? 'bg-purple-200/40 text-purple-900 hover:bg-purple-200/50 border border-purple-300/50' 
                    : 'text-purple-700 hover:text-purple-900 hover:bg-purple-100/50'
                }`}
              >
                {currentPage === 'profile' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-200/40 border border-purple-300/50 rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </span>
              </Button>
            </motion.div>
          </nav>
        </div>
      </div>
      
      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
    </motion.header>
  );
}