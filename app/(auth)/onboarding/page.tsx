'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, QrCode, MapPin, CreditCard, ArrowRight, Check } from 'lucide-react';

const onboardData = [
  {
    icon: QrCode,
    title: 'Quick & Easy Check-in',
    subtitle: 'Your Commute, Your Way',
    description: 'Scan QR codes for instant attendance and seamless ticketing experience. No more waiting in lines.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: MapPin,
    title: 'Real-time Tracking',
    subtitle: 'Navigate Your Journey',
    description: 'Track your bus live, get real-time updates, and arrive on time, every time with our smart tracking system.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: CreditCard,
    title: 'Smart Payments',
    subtitle: 'Stay on Track',
    description: 'Simplify payments and stay on top of due dates with personalized notifications and automated reminders.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50'
  },
];

const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentPage < onboardData.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const currentData = onboardData[currentPage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Travent
          </h1>
        </div>
        
        {currentPage < onboardData.length - 1 && (
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="max-w-md mx-auto w-full">
          {/* Icon and Animation */}
          <motion.div
            key={currentPage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12 flex justify-center"
          >
            <div className={`w-32 h-32 ${currentData.bgColor} rounded-3xl flex items-center justify-center relative`}>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className={`w-20 h-20 bg-gradient-to-br ${currentData.color} rounded-2xl flex items-center justify-center shadow-lg`}
              >
                <currentData.icon className="w-10 h-10 text-white" />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-green-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {currentData.title}
              </h2>
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                {currentData.subtitle}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {currentData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${currentData.color} shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2`}
          >
            <span>
              {currentPage === onboardData.length - 1 ? 'Get Started' : 'Continue'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 pb-8">
        {onboardData.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentPage === idx 
                ? 'bg-blue-500 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentPage + 1) / onboardData.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default Onboarding; 