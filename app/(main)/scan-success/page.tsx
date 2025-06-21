'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

const ScanSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex-1 bg-[#1E1E1E] min-h-screen flex flex-col justify-center items-center p-5">
      <CheckCircle className="text-[#00A3FF] w-25 h-25" />
      
      <h1 className="text-white text-2xl font-bold text-center mt-8 mb-12">
        Your arrival confirmed successfully!
      </h1>
      
      <button
        onClick={() => router.push('/eticket')}
        className="bg-[#00A3FF] py-4 px-8 rounded-full text-white text-lg font-bold w-4/5 mb-5 hover:bg-[#0088CC] transition-colors"
      >
        View E-Ticket
      </button>
      
      <button
        onClick={() => router.push('/live-tracking')}
        className="bg-transparent border-2 border-[#00A3FF] hover:bg-[#00A3FF] hover:text-white transition-colors py-4 px-8 rounded-full text-[#00A3FF] text-lg font-bold w-4/5"
      >
        Track your bus
      </button>
    </div>
  );
};

export default ScanSuccess; 