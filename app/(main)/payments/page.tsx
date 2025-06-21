'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ArrowRight, ChevronDown, ChevronUp, CreditCard, Calendar, CheckCircle, XCircle } from 'lucide-react';

const PaymentCard = ({ 
  title, 
  subtitle, 
  amount, 
  isActive 
}: { 
  title: string; 
  subtitle: string; 
  amount: string; 
  isActive: boolean; 
}) => (
  <div className={`card-hover ${isActive ? 'ring-2 ring-primary-500' : ''}`}>
    <div className="card-content">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        <div className={`p-2 rounded-lg ${isActive ? 'bg-primary-50' : 'bg-gray-50'}`}>
          <CreditCard className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
        </div>
      </div>
      {amount && (
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{amount}</p>
          <p className="text-sm text-gray-500">Amount Due</p>
        </div>
      )}
    </div>
  </div>
);

const PaymentHistoryItem = ({ 
  term, 
  date, 
  amount, 
  paymentId, 
  status 
}: { 
  term: string; 
  date: string; 
  amount: string; 
  paymentId: string; 
  status: 'success' | 'failed'; 
}) => (
  <div className="card-hover">
    <div className="card-content">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{term}</h4>
            {status === 'success' ? (
              <CheckCircle className="w-4 h-4 text-success-500" />
            ) : (
              <XCircle className="w-4 h-4 text-error-500" />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">{date}</p>
          <p className="text-xs text-gray-500">Payment ID: {paymentId}</p>
        </div>
        <div className="text-right">
          <p className={`font-semibold text-lg ${
            status === 'failed' ? 'text-error-600' : 'text-success-600'
          }`}>
            {amount}
          </p>
          <span className={`badge ${
            status === 'failed' ? 'badge-error' : 'badge-success'
          }`}>
            {status === 'failed' ? 'Failed' : 'Success'}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const YearSection = ({ 
  year, 
  payments, 
  isExpanded, 
  onToggle 
}: { 
  year: string; 
  payments: any[]; 
  isExpanded: boolean; 
  onToggle: () => void; 
}) => (
  <div className="mb-4">
    <button
      onClick={onToggle}
      className="w-full card-hover text-left"
    >
      <div className="card-content">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-gray-900">{year}</span>
            <span className="badge-info">{payments.length} payments</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
    </button>
    {isExpanded && (
      <div className="mt-3 space-y-3">
        {payments.map((payment, index) => (
          <PaymentHistoryItem key={index} {...payment} />
        ))}
      </div>
    )}
  </div>
);

const PaymentScreen = () => {
  const router = useRouter();
  const [expandedYear, setExpandedYear] = useState<string | null>('Third Year - (2023-2024)');

  const paymentHistory = {
    'Third Year - (2023-2024)': [
      {
        term: 'Term 3 (Online Payment)',
        date: '19/07/2024 - 16:24:56',
        amount: '₹1,500',
        paymentId: '24F5ECE2',
        status: 'success' as const,
      },
      {
        term: 'Term 2 (Online Payment)',
        date: '16/03/2024 - 10:15:30',
        amount: '₹1,500',
        paymentId: '24B4CDE2',
        status: 'success' as const,
      },
      {
        term: 'Term 2 (Online Payment)',
        date: '15/03/2024 - 14:30:22',
        amount: '₹1,500',
        paymentId: '24A3BCD1',
        status: 'failed' as const,
      },
      {
        term: 'Term 1 (Online Payment)',
        date: '10/01/2024 - 09:15:47',
        amount: '₹1,500',
        paymentId: '24D2EFA3',
        status: 'success' as const,
      },
    ],
    'Second Year - (2022-2023)': [
      {
        term: 'Term 3 (Online Payment)',
        date: '19/07/2023 - 16:24:56',
        amount: '₹1,500',
        paymentId: '23F5ECE2',
        status: 'success' as const,
      },
      {
        term: 'Term 2 (Online Payment)',
        date: '15/03/2023 - 14:30:22',
        amount: '₹1,500',
        paymentId: '23A3BCD1',
        status: 'success' as const,
      },
      {
        term: 'Term 1 (Online Payment)',
        date: '10/01/2023 - 09:15:47',
        amount: '₹1,500',
        paymentId: '23D2EFA3',
        status: 'success' as const,
      },
    ],
    'First Year - (2021-2022)': [
      {
        term: 'Term 3 (Online Payment)',
        date: '19/07/2022 - 16:24:56',
        amount: '₹1,500',
        paymentId: '22F5ECE2',
        status: 'success' as const,
      },
      {
        term: 'Term 2 (Online Payment)',
        date: '15/03/2022 - 14:30:22',
        amount: '₹1,500',
        paymentId: '22A3BCD1',
        status: 'success' as const,
      },
      {
        term: 'Term 1 (Online Payment)',
        date: '10/01/2022 - 09:15:47',
        amount: '₹1,500',
        paymentId: '22D2EFA3',
        status: 'success' as const,
      },
    ],
  };

  const toggleYear = (year: string) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const handlePayNow = () => {
    router.push('/payment-details');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header Spacing */}
      <div className="lg:hidden h-16" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Center</h1>
            <p className="text-gray-600">Manage your transportation fees and payments</p>
          </div>
        </div>

        {/* Payment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <PaymentCard
            title="Current Term"
            subtitle="Term 1 - 2024-2025"
            amount="₹1,500"
            isActive={true}
          />
          <PaymentCard
            title="Next Term"
            subtitle="Term 2 - 2024-2025"
            amount="₹1,500"
            isActive={false}
          />
        </div>

        {/* Pay Now Button */}
        <div className="card mb-8">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready to Pay?</h3>
                <p className="text-gray-600">Complete your payment for the current term</p>
              </div>
              <button
                onClick={handlePayNow}
                className="btn-primary"
              >
                <span>Pay Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
            <p className="text-sm text-gray-600">View all your past transactions</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {Object.entries(paymentHistory).map(([year, payments]) => (
                <YearSection
                  key={year}
                  year={year}
                  payments={payments}
                  isExpanded={expandedYear === year}
                  onToggle={() => toggleYear(year)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="card mt-8">
          <div className="card-content text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need help with payments?
            </h3>
            <p className="text-gray-600 mb-4">
              Our support team is here to help you with any payment-related questions.
            </p>
            <div className="flex gap-3 justify-center">
              <button className="btn-outline">
                Contact Support
              </button>
              <button className="btn-primary">
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen; 