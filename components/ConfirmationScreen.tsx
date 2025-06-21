'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfirmationScreenProps {
  date: string;
  onGoHome: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ date, onGoHome }) => {
  return (
    <div className="flex-1 bg-gradient-to-b from-[#1E262F] to-[#16171B] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <CheckCircle size={64} className="text-[#12B76A] mx-auto mb-4" />
        <h2 className="text-white text-2xl font-bold mb-2">Trip Scheduled!</h2>
        <p className="text-gray-400 mb-6">Your trip has been scheduled for {date}</p>
        <button
          onClick={onGoHome}
          className="bg-[#FCD34D] text-[#1E293B] px-6 py-3 rounded-lg font-semibold hover:bg-[#F59E0B] transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen; 