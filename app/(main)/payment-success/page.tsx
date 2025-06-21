'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Receipt } from 'lucide-react';

// Dummy data
const totalAmount = 1500;
const paymentMethod = 'card';

const PaymentSuccessScreen = () => {
  const router = useRouter();

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1E262F] to-[#16171B] min-h-screen flex flex-col items-center justify-center p-5">
      {/* Success Animation */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-[#4CAF50] flex items-center justify-center animate-pulse">
          <CheckCircle className="text-white w-12 h-12" />
        </div>
        {/* Confetti effect with CSS */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      </div>

      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        Congratulations!
      </h1>
      
      <p className="text-[#ccc] text-lg text-center mb-8 max-w-sm">
        You have successfully made your payment.
      </p>
      
      <div className="flex flex-row items-center mb-8">
        <span className="text-[#ccc] text-lg mr-2">Amount Paid:</span>
        <span className="text-[#4a90e2] text-2xl font-bold">₹{totalAmount}</span>
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => router.push('/payments')}
          className="w-full bg-[#2C3E50] py-4 rounded-lg text-white text-base font-bold hover:bg-[#34495E] transition-colors"
        >
          Go to Payment Menu
        </button>
        
        <button
          onClick={() => router.push('/e-receipt')}
          className="w-full bg-[#4a90e2] py-4 rounded-lg text-white text-base font-bold hover:bg-[#357abd] transition-colors flex items-center justify-center"
        >
          <Receipt className="w-5 h-5 mr-2" />
          View E-Receipt
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessScreen; 