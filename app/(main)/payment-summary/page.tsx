'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, CreditCard, Calendar, School, User } from 'lucide-react';

// Dummy data for demonstration
const feeDetails = {
  name: 'Vinayagar S',
  year: 'III Year',
  department: 'Mechanical Engineering',
  academicYear: '2024-2025',
  routeNo: '15',
  stoppingName: 'Seelanaickanpatti',
  totalYearlyFee: '₹4,500',
};

const selectedTerms = ['Term 1'];
const totalAmount = 1500;
const paymentMethod = 'term';

const ProgressBar = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center p-4">
    <div className="flex items-center space-x-2">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step <= currentStep 
              ? 'bg-[#4a90e2] text-white' 
              : 'bg-[#2C2C2C] text-[#888]'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-12 h-1 mx-2 ${
              step < currentStep ? 'bg-[#4a90e2]' : 'bg-[#2C2C2C]'
            }`} />
          )}
        </div>
      ))}
    </div>
  </div>
);

// Summary Item Component
const SummaryItem = ({ 
  label, 
  value, 
  icon: Icon 
}: { 
  label: string; 
  value: string; 
  icon: any; 
}) => (
  <div className="flex flex-row items-center mb-4">
    <div className="w-10 h-10 rounded-full bg-[rgba(74,144,226,0.1)] flex items-center justify-center mr-3">
      <Icon className="text-[#4a90e2] w-6 h-6" />
    </div>
    <div className="flex-1">
      <p className="text-[#888] text-sm">{label}</p>
      <p className="text-white text-base font-bold">{value}</p>
    </div>
  </div>
);

const PaymentSummaryScreen = () => {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleProceedToPay = () => {
    router.push('/payment-method');
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1E262F] to-[#16171B] min-h-screen">
      {/* Header */}
      <div className="flex items-center p-5">
        <button
          onClick={() => router.back()}
          className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Payment Summary</h1>
      </div>

      <ProgressBar currentStep={2} />

      <div className="flex-1 p-5 overflow-y-auto">
        {/* Summary Card */}
        <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-4 mb-5">
          <h2 className="text-white text-lg font-bold mb-5">Summary of Payment</h2>
          
          <SummaryItem
            icon={CreditCard}
            label="Fee paid for"
            value="JKKN Transport"
          />
          <SummaryItem
            icon={Calendar}
            label="Fee Category"
            value={`${feeDetails.year} - ${
              paymentMethod === 'term'
                ? 'Full Year'
                : selectedTerms.join(', ')
            }`}
          />
          <SummaryItem
            icon={Calendar}
            label="Payment date"
            value={new Date().toLocaleDateString()}
          />
          <SummaryItem icon={User} label="Name" value={feeDetails.name} />
          <SummaryItem icon={School} label="Year" value={feeDetails.year} />
          <SummaryItem
            icon={School}
            label="Department"
            value={feeDetails.department}
          />
          
          <div className="h-px bg-[rgba(255,255,255,0.1)] my-4" />
          
          <SummaryItem
            icon={CreditCard}
            label="Fee"
            value={`₹${totalAmount}`}
          />
          <SummaryItem icon={CreditCard} label="Tax" value="₹0.00" />
          <SummaryItem icon={CreditCard} label="Fee Balance" value="₹0.00" />
        </div>

        {/* Total Amount Container */}
        <div className="flex flex-row justify-between items-center bg-[rgba(74,144,226,0.1)] rounded-2xl p-4 mb-5">
          <span className="text-white text-lg font-bold">Total Amount</span>
          <span className="text-[#4a90e2] text-2xl font-bold">
            ₹{totalAmount.toFixed(2)}
          </span>
        </div>

        {/* Agreement Container */}
        <button
          onClick={() => setIsAgreed(!isAgreed)}
          className="flex flex-row items-start w-full mb-5"
        >
          <div className={`w-6 h-6 rounded border-2 mr-3 flex items-center justify-center mt-0.5 ${
            isAgreed 
              ? 'bg-[#4a90e2] border-[#4a90e2]' 
              : 'border-[#4a90e2]'
          }`}>
            {isAgreed && <Check className="text-white w-4 h-4" />}
          </div>
          <p className="text-[#888] text-sm flex-1 text-left">
            By clicking this, I agree to pay the amount mentioned in the above
            summary and understand that it cannot be refunded.
          </p>
        </button>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-[rgba(255,255,255,0.1)]">
        <button
          onClick={handleProceedToPay}
          disabled={!isAgreed}
          className={`w-full py-4 rounded-lg text-white text-base font-bold transition-colors ${
            isAgreed 
              ? 'bg-[#4a90e2] hover:bg-[#357abd]' 
              : 'bg-[#888] cursor-not-allowed'
          }`}
        >
          Proceed to Pay ₹{totalAmount.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default PaymentSummaryScreen; 