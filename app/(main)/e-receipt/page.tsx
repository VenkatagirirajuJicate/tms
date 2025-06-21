'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Download, Share2, CheckCircle, User, Calendar, CreditCard, MapPin, Info } from 'lucide-react';

// Dummy data
const totalAmount = 1500;
const paymentMethod = 'card';

const receiptDetails = {
  transactionId: '#RE25664HG23',
  name: 'Vinayagar S',
  year: 'II Year',
  department: 'Mechanical Engineering',
  feeCategory: 'II Year - Term 2&3',
  paymentDate: 'June 29, 2024 | 10:00 AM',
  paymentMethod: paymentMethod,
  busRoute: 'Route 17: Seelanaickenpatti - JKKN College',
  validUntil: 'December 31, 2024',
};

const DetailCard = ({ 
  icon: Icon, 
  title, 
  value, 
  description 
}: { 
  icon: any; 
  title: string; 
  value: string; 
  description?: string; 
}) => (
  <div className="flex flex-row items-center bg-[#f5f5f5] rounded-lg p-4 mb-3">
    <div className="bg-[rgba(74,144,226,0.1)] rounded-lg p-2 mr-3">
      <Icon className="text-[#4a90e2] w-6 h-6" />
    </div>
    <div className="flex-1">
      <p className="text-[#666] text-sm mb-1">{title}</p>
      <p className="text-[#1a2a3a] text-base font-semibold mb-1">{value}</p>
      {description && (
        <p className="text-[#666] text-sm">{description}</p>
      )}
    </div>
  </div>
);

const EReceiptScreen = () => {
  const router = useRouter();

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
        <h1 className="text-2xl font-bold text-white">E-Receipt</h1>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4a90e2] to-[#357abd] p-8">
            <div className="flex flex-row items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3">
                <span className="text-[#4a90e2] text-xl font-bold">T</span>
              </div>
              <span className="text-white text-3xl font-bold">Travent</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4">
            {/* Status */}
            <div className="flex flex-row items-center justify-center bg-[#e8f5e9] p-4 rounded-lg mb-6">
              <CheckCircle className="text-[#2e7d32] w-6 h-6 mr-2" />
              <span className="text-[#2e7d32] text-lg font-bold">Payment Successful</span>
            </div>

            {/* Amount */}
            <div className="text-center mb-6">
              <p className="text-[#666] text-base mb-2">Total Amount Paid</p>
              <p className="text-[#1a2a3a] text-5xl font-bold">₹{totalAmount}</p>
            </div>

            {/* QR Code Placeholder */}
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-gray-500 text-xs">QR Code</span>
              </div>
              <p className="text-[#1a2a3a] text-base font-bold">
                {receiptDetails.transactionId}
              </p>
            </div>

            {/* Details */}
            <div className="mb-6">
              <DetailCard
                icon={User}
                title="Student Details"
                value={`${receiptDetails.name}, ${receiptDetails.year}`}
                description={`Department: ${receiptDetails.department}`}
              />
              <DetailCard
                icon={Calendar}
                title="Payment Date"
                value={receiptDetails.paymentDate}
                description={`Valid Until: ${receiptDetails.validUntil}`}
              />
              <DetailCard
                icon={CreditCard}
                title="Payment Method"
                value={receiptDetails.paymentMethod}
                description={`Fee Category: ${receiptDetails.feeCategory}`}
              />
              <DetailCard
                icon={MapPin}
                title="Bus Route"
                value={receiptDetails.busRoute}
              />
              <DetailCard
                icon={Info}
                title="Additional Information"
                value="This e-receipt serves as proof of payment for your bus pass."
                description="Please keep this receipt for your records."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-row justify-between p-5 bg-[rgba(255,255,255,0.1)]">
        <button className="flex-1 flex flex-row justify-center items-center bg-[#34495e] py-4 rounded-lg mx-2 hover:bg-[#2c3e50] transition-colors">
          <Share2 className="text-white w-5 h-5 mr-2" />
          <span className="text-white text-base font-bold">Share</span>
        </button>
        <button className="flex-1 flex flex-row justify-center items-center bg-[#4a90e2] py-4 rounded-lg mx-2 hover:bg-[#357abd] transition-colors">
          <Download className="text-white w-5 h-5 mr-2" />
          <span className="text-white text-base font-bold">Download</span>
        </button>
      </div>
    </div>
  );
};

export default EReceiptScreen; 