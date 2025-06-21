'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, CreditCard, Calendar, MapPin, School, User } from 'lucide-react';

// Sample Fee Details
const feeDetails = {
  name: 'Vinayagar S',
  year: 'III Year',
  department: 'Mechanical Engineering',
  academicYear: '2024-2025',
  routeNo: '15',
  stoppingName: 'Seelanaickanpatti',
  totalYearlyFee: '₹4,500',
};

// Terms Array
const terms = [
  { id: 'Term 1', amount: 1500 },
  { id: 'Term 2', amount: 1500 },
  { id: 'Term 3', amount: 1500 },
];

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

const FeeDetailItem = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: any; 
  label: string; 
  value: string; 
}) => (
  <div className="flex flex-row items-center mb-5">
    <Icon className="text-[#4a90e2] w-6 h-6" />
    <div className="ml-4">
      <p className="text-[#888] text-sm">{label}</p>
      <p className="text-white text-base font-bold">{value}</p>
    </div>
  </div>
);

const PaymentDetailsScreen = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'yearly' | 'term'>('term');
  const [selectedTerms, setSelectedTerms] = useState<string[]>(['Term 1']);

  const toggleTerm = (termId: string) => {
    setSelectedTerms((prevSelected) =>
      prevSelected.includes(termId)
        ? prevSelected.filter((id) => id !== termId)
        : [...prevSelected, termId]
    );
  };

  const computeTotalAmount = () =>
    paymentMethod === 'yearly'
      ? parseInt(feeDetails.totalYearlyFee.replace(/[^0-9]/g, ''))
      : terms
          .filter((term) => selectedTerms.includes(term.id))
          .reduce((sum, term) => sum + term.amount, 0);

  const handleContinueToSummary = () => {
    router.push('/payment-summary');
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
        <h1 className="text-2xl font-bold text-white">Payment Details</h1>
      </div>

      <ProgressBar currentStep={1} />

      <div className="flex-1 p-5 overflow-y-auto">
        {/* Fee Details Card */}
        <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-4 mb-5">
          <h2 className="text-white text-lg font-bold mb-5">Fee Details</h2>
          <FeeDetailItem icon={User} label="Name" value={feeDetails.name} />
          <FeeDetailItem
            icon={School}
            label="Year & Department"
            value={`${feeDetails.year}, ${feeDetails.department}`}
          />
          <FeeDetailItem
            icon={Calendar}
            label="Academic Year"
            value={feeDetails.academicYear}
          />
          <FeeDetailItem
            icon={MapPin}
            label="Route & Stop"
            value={`Route ${feeDetails.routeNo}, ${feeDetails.stoppingName}`}
          />
          <FeeDetailItem
            icon={CreditCard}
            label="Total Yearly Fee"
            value={feeDetails.totalYearlyFee}
          />
        </div>

        {/* Payment Method Card */}
        <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-4 mb-5">
          <h2 className="text-white text-lg font-bold mb-5">Choose Payment Method</h2>
          <div className="space-y-4">
            {(['yearly', 'term'] as const).map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex flex-row items-center w-full p-3 rounded-lg transition-colors ${
                  paymentMethod === method 
                    ? 'bg-[rgba(74,144,226,0.2)] border border-[#4a90e2]' 
                    : 'bg-transparent'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  paymentMethod === method 
                    ? 'border-[#4a90e2]' 
                    : 'border-[#888]'
                }`}>
                  {paymentMethod === method && (
                    <div className="w-3 h-3 rounded-full bg-[#4a90e2]" />
                  )}
                </div>
                <span className={`text-base ${
                  paymentMethod === method ? 'text-white' : 'text-[#888]'
                }`}>
                  {method === 'yearly' ? 'Pay Total Amount' : 'Pay by Term'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Term Selection Card */}
        {paymentMethod === 'term' && (
          <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-4 mb-5">
            <h2 className="text-white text-lg font-bold mb-5">Select Term</h2>
            {terms.map((term) => (
              <button
                key={term.id}
                onClick={() => toggleTerm(term.id)}
                className="flex flex-row items-center w-full p-4 rounded-lg bg-[rgba(255,255,255,0.1)] mb-3 hover:bg-[rgba(255,255,255,0.15)] transition-colors"
              >
                <div className={`w-6 h-6 rounded border-2 mr-3 flex items-center justify-center ${
                  selectedTerms.includes(term.id) 
                    ? 'bg-[#4a90e2] border-[#4a90e2]' 
                    : 'border-[#4a90e2]'
                }`}>
                  {selectedTerms.includes(term.id) && (
                    <Check className="text-white w-4 h-4" />
                  )}
                </div>
                <span className="text-white text-base flex-1 text-left">{term.id}</span>
                <span className="text-[#4a90e2] text-base font-bold">₹{term.amount}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-[rgba(255,255,255,0.1)]">
        <button
          onClick={handleContinueToSummary}
          className="w-full bg-[#4a90e2] py-4 rounded-lg text-white text-base font-bold hover:bg-[#357abd] transition-colors"
        >
          Continue to Summary ₹{computeTotalAmount()}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetailsScreen; 