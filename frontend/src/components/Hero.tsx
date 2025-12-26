import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Heart, Flower2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroProps {
  onStartQuiz: () => void;
}

export function Hero({ onStartQuiz }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1755190897799-bd281798d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBiYWJ5JTIwdGVuZGVyfGVufDF8fHx8MTc2NDAxNTc0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Mother with newborn baby'
    },
    {
      image: 'https://images.unsplash.com/photo-1761891951466-6ce6b8680df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMG1vdGhlciUyMHBlYWNlZnVsfGVufDF8fHx8MTc2NDAxNTc0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Mother holding infant'
    },
    {
      image: 'https://images.unsplash.com/photo-1560305850-d90e0af2ff18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb20lMjBpbmZhbnQlMjBib25kaW5nfGVufDF8fHx8MTc2NDAxNTc0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Mother and baby'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-rose-100">
      {/* Floating flowers animation - global */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-0 pointer-events-none"
          initial={{ y: -100, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), opacity: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            opacity: [0, 0.4, 0.4, 0],
            rotate: 360
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          <Flower2 className="w-6 h-6 text-pink-300/50" />
        </motion.div>
      ))}

      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-pink-50 via-purple-50 to-rose-50 py-4 px-4 border-b border-purple-200/30 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-purple-900 font-extrabold">
            Try Our Quiz to Check on You!
          </h2>
        </div>
        {/* Decorative animated elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-2 left-10 opacity-40"
        >
          <Flower2 className="w-6 h-6 text-pink-400" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-2 right-10 opacity-40"
        >
          <Flower2 className="w-6 h-6 text-purple-400" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/2 left-1/4 opacity-30"
        >
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="absolute top-1/2 right-1/4 opacity-30"
        >
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
        </motion.div>
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-3 right-1/3 opacity-25"
        >
          <Flower2 className="w-5 h-5 text-purple-300" />
        </motion.div>
      </motion.div>

      {/* Section 1: Image Carousel */}
      <div className="relative py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto px-4"
        >
          {/* Carousel container */}
          <div className="relative aspect-[16/7] overflow-hidden shadow-2xl rounded-2xl">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  scale: currentSlide === index ? 1 : 1.1
                }}
                transition={{ duration: 0.7 }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
              </motion.div>
            ))}

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-purple-900" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-purple-900" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section 3: Split Section - Image Left, "You Are Not Alone" Right */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1378&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Supportive note"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
              </div>
              {/* Decorative blob */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Right: You Are Not Alone */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <Heart className="w-20 h-20 text-pink-400 fill-pink-400" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0"
                  >
                    <Heart className="w-20 h-20 text-pink-300/40" />
                  </motion.div>
                </div>
              </motion.div>

              <h1 className="text-purple-900 mb-6">
                You Are Not Alone
              </h1>

              <p className="text-purple-700 mb-8 text-lg">
                Postpartum depression affects 1 in 7 women. Understanding your feelings is the first step 
                toward healing and finding support.
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={onStartQuiz}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Take the Self-Assessment
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}