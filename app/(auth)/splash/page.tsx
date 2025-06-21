'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, MapPin, Clock, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SplashScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const fullTitle = 'Travent';
  const fullSubtitle = 'Transportation Management System';

  useEffect(() => {
    // Reveal title letter by letter
    const revealTitleLetterByLetter = () => {
      fullTitle.split('').forEach((letter, index) => {
        setTimeout(() => setTitle((prev) => prev + letter), index * 80);
      });
      
      // Start subtitle after title is complete
      setTimeout(() => {
        fullSubtitle.split('').forEach((letter, index) => {
          setTimeout(() => setSubtitle((prev) => prev + letter), index * 30);
        });
      }, fullTitle.length * 80 + 500);
      
      // Navigate to onboarding after animation
      setTimeout(
        () => router.replace('/onboarding'),
        fullTitle.length * 80 + fullSubtitle.length * 30 + 2000
      );
    };

    revealTitleLetterByLetter();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 3, ease: "linear", repeat: Infinity },
                scale: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }
              }}
              className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Bus className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
            >
              <MapPin className="w-3 h-3 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 1 }}
              className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center"
            >
              <Clock className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <AnimatePresence>
          <motion.h1
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
          >
            {title}
          </motion.h1>
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence>
          <motion.p
            key={subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-600 font-medium"
          >
            {subtitle}
          </motion.p>
        </AnimatePresence>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 text-gray-500">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Student & Staff Management</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-500">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">Real-time Tracking</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-500">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">Smart Scheduling</span>
          </div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mt-8"
        >
          <div className="flex space-x-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen; 