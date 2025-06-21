'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const ETicket = () => {
  const router = useRouter();

  const generateBarcodeLines = () => {
    const lines = [];
    const totalLines = 40;
    const minLineWidth = 2;
    const maxLineWidth = 8;

    for (let i = 0; i < totalLines; i++) {
      const lineWidth = Math.random() * (maxLineWidth - minLineWidth) + minLineWidth;
      lines.push(
        <div
          key={i}
          className="bg-black"
          style={{ 
            width: `${lineWidth}px`, 
            height: '100%',
            marginRight: i < totalLines - 1 ? '2px' : '0'
          }}
        />
      );
    }
    return lines;
  };

  return (
    <div className="flex-1 bg-[#1E1E1E] min-h-screen p-5">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Your E-Ticket</h1>
      </div>

      {/* Ticket Container */}
      <div className="bg-[#2C2C2C] rounded-2xl overflow-hidden shadow-lg">
        {/* Ticket Header */}
        <div className="bg-[#00A3FF] p-4 text-center">
          <span className="text-white text-4xl font-bold">17</span>
        </div>

        {/* Ticket Content */}
        <div className="p-5">
          <h2 className="text-white text-2xl font-bold mb-1">Vinayagar S</h2>
          <p className="text-[#888] text-base mb-5">III year CSE</p>
          
          <div className="mb-5">
            <p className="text-white text-base mb-1">
              From: Seelanayakkanpatti Bus Pass
            </p>
            <p className="text-white text-base">
              To: JKKN College of Engineering
            </p>
          </div>
          
          <p className="text-[#00A3FF] text-lg font-bold mb-2">
            26/06/2024 - 07:30 AM
          </p>
          <p className="text-[#888] text-sm">Ticket ID: 12DF45J</p>
        </div>

        {/* Barcode Container */}
        <div className="bg-white p-4 text-center rounded-b-2xl">
          <div className="flex justify-center items-end h-20 w-full">
            {generateBarcodeLines()}
          </div>
        </div>
      </div>

      {/* Home Button */}
      <button
        onClick={() => router.push('/')}
        className="bg-[#00A3FF] py-4 rounded-full text-white text-lg font-bold w-full mt-8 hover:bg-[#0088CC] transition-colors"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ETicket; 