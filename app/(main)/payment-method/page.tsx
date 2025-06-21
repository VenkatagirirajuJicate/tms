'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, CreditCard, Smartphone, Building, Globe } from 'lucide-react';

// Dummy total amount
const totalAmount = 1500;

const PaymentOption = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  onPress, 
  isSelected 
}: { 
  icon: any; 
  title: string; 
  subtitle?: string; 
  onPress: () => void; 
  isSelected: boolean; 
}) => (
  <button
    onClick={onPress}
    className={`flex flex-row items-center w-full p-4 rounded-lg mb-3 transition-colors ${
      isSelected 
        ? 'bg-[rgba(74,144,226,0.2)] border border-[#4a90e2]' 
        : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]'
    }`}
  >
    <div className="w-12 h-12 rounded-full bg-[rgba(74,144,226,0.1)] flex items-center justify-center mr-4">
      <Icon className="text-[#4a90e2] w-6 h-6" />
    </div>
    <div className="flex-1 text-left">
      <h3 className="text-white text-base font-bold">{title}</h3>
      {subtitle && <p className="text-[#888] text-sm">{subtitle}</p>}
    </div>
    <ChevronRight className="text-[#888] w-5 h-5" />
  </button>
);

const PaymentMethodScreen = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentOptionPress = (method: string) => {
    setSelectedMethod(method);
  };

  const handleProceedToPayment = () => {
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      router.push('/payment-success');
    }, 2000);
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
        <h1 className="text-2xl font-bold text-white">Payment Menu</h1>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        <h2 className="text-[#888] text-base mb-5 mt-2">Payment Methods</h2>
        
        <PaymentOption
          icon={CreditCard}
          title="Credit & Debit Card"
          subtitle="Visa, Mastercard, Rupay"
          onPress={() => handlePaymentOptionPress('card')}
          isSelected={selectedMethod === 'card'}
        />
        
        <PaymentOption
          icon={Smartphone}
          title="UPI"
          onPress={() => handlePaymentOptionPress('upi')}
          isSelected={selectedMethod === 'upi'}
        />
        
        <PaymentOption
          icon={Smartphone}
          title="Google Pay"
          onPress={() => handlePaymentOptionPress('googlepay')}
          isSelected={selectedMethod === 'googlepay'}
        />
        
        <PaymentOption
          icon={Building}
          title="Net Banking"
          onPress={() => handlePaymentOptionPress('netbanking')}
          isSelected={selectedMethod === 'netbanking'}
        />
        
        <PaymentOption
          icon={Globe}
          title="PayPal"
          onPress={() => handlePaymentOptionPress('paypal')}
          isSelected={selectedMethod === 'paypal'}
        />
        
        <PaymentOption
          icon={CreditCard}
          title="Razorpay"
          onPress={() => handlePaymentOptionPress('razorpay')}
          isSelected={selectedMethod === 'razorpay'}
        />
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex flex-row justify-between items-center mb-5">
          <span className="text-[#888] text-base">Total Amount:</span>
          <span className="text-white text-2xl font-bold">₹{totalAmount}</span>
        </div>
        
        <button
          onClick={handleProceedToPayment}
          disabled={!selectedMethod || isLoading}
          className={`w-full py-4 rounded-lg text-white text-base font-bold transition-colors ${
            !selectedMethod || isLoading
              ? 'bg-[#888] cursor-not-allowed'
              : 'bg-[#4a90e2] hover:bg-[#357abd]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            'Go To Payment Gateway'
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;