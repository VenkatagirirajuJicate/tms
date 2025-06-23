'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  XCircle,
  DollarSign,
  Bus,
  AlertTriangle,
  Receipt,
  Download,
  RefreshCw,
  Bell,
  User,
  Users,
  Wallet,
  PiggyBank,
  Clock,
  Shield,
  Gift,
  Filter,
  Search,
  Eye,
  Edit,
  Plus,
  Smartphone,
  Building,
  QrCode,
  Star,
  History,
  TrendingUp,
  Settings,
  HelpCircle,
  FileText,
  Repeat
} from 'lucide-react';
import { useRef } from 'react';
import jsPDF from 'jspdf';

// Professional Receipt Generator - Compact Single Page Layout
const generateProfessionalReceipt = (
  receiptData: {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: string;
    paymentMethod?: string;
    transactionId?: string;
  }
) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  
  // Color Palette - Matching Design
  const mintGreen = [220, 237, 200]; // Light green header
  const darkGray = [75, 85, 99];     // Text color
  const lightGray = [156, 163, 175]; // Secondary text
  const borderColor = [229, 231, 235]; // Borders
  
  let currentY = 15;
  
  // ===== HEADER SECTION =====
  pdf.setFillColor(mintGreen[0], mintGreen[1], mintGreen[2]);
  pdf.rect(0, 0, pageWidth, 45, 'F');
  
  // RECEIPT Title (Left)
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('RECEIPT', 20, 28);
  
  // Icon placeholder (Right) - Simple geometric shape
  const iconX = pageWidth - 30;
  pdf.setFillColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.circle(iconX, 22, 10, 'F');
  pdf.setFillColor(255, 255, 255);
  pdf.circle(iconX, 22, 7, 'F');
  pdf.setFillColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.circle(iconX, 22, 3, 'F');
  
  currentY = 55;
  
  // ===== RECEIPT INFO ROW (Compact 3-Column Layout) =====
  // Left Column - Receipt Details
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Receipt Number', 20, currentY);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text(receiptData.id, 20, currentY + 8);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Transaction ID', 20, currentY + 20);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text(receiptData.transactionId || 'TXN202512345', 20, currentY + 28);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Date', 20, currentY + 40);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text(new Date(receiptData.date).toLocaleDateString('en-GB'), 20, currentY + 48);
  
  // Middle Column - Payment Details
  const middleCol = 75;
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Payment Type', middleCol, currentY);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text(receiptData.type || 'Transportation Fee', middleCol, currentY + 8);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Payment Status', middleCol, currentY + 20);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(34, 197, 94); // Green color for success
  pdf.text('COMPLETED', middleCol, currentY + 28);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Payment Method', middleCol, currentY + 40);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text(receiptData.paymentMethod || 'UPI', middleCol, currentY + 48);
  
  // Right Column - Business Info
  const rightCol = 130;
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Business Name', rightCol, currentY);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('TRAVENT TMS', rightCol, currentY + 8);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Processing Time', rightCol, currentY + 20);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text(new Date(receiptData.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), rightCol, currentY + 28);
  
  currentY += 65;
  
  // ===== BILL FROM / PAYABLE TO SECTION (Compact) =====
  // Left Column - PAYABLE TO
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('PAYABLE TO', 20, currentY);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text(paymentData.user.name, 20, currentY + 12);
  pdf.text(paymentData.user.department, 20, currentY + 22);
  pdf.text('Student ID: ' + paymentData.user.studentId, 20, currentY + 32);
  
  // Right Column - BILL FROM
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BILL FROM', rightCol, currentY);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Travent TMS', rightCol, currentY + 12);
  pdf.text('Transportation Services', rightCol, currentY + 22);
  pdf.text('College Campus', rightCol, currentY + 32);
  
  currentY += 50;
  
  // ===== ITEM TABLE =====
  // Table header
  pdf.setFillColor(mintGreen[0], mintGreen[1], mintGreen[2]);
  pdf.rect(20, currentY, pageWidth - 40, 12, 'F');
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('ITEM DESCRIPTION', 25, currentY + 8);
  pdf.text('QTY', pageWidth - 110, currentY + 8);
  pdf.text('PRICE', pageWidth - 70, currentY + 8);
  pdf.text('TOTAL', pageWidth - 35, currentY + 8);
  
  // Table border
  pdf.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
  pdf.setLineWidth(0.5);
  pdf.rect(20, currentY, pageWidth - 40, 12);
  
  currentY += 12;
  
  // Item row
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  
  // Truncate description if too long
  const maxDescLength = 30;
  const truncatedDesc = receiptData.description.length > maxDescLength 
    ? receiptData.description.substring(0, maxDescLength) + '...' 
    : receiptData.description;
  
  pdf.text(truncatedDesc, 25, currentY + 8);
  pdf.text('1', pageWidth - 110, currentY + 8);
  pdf.text('Rs. ' + receiptData.amount.toLocaleString('en-IN'), pageWidth - 85, currentY + 8);
  pdf.text('Rs. ' + receiptData.amount.toLocaleString('en-IN'), pageWidth - 50, currentY + 8);
  
  // Item row border
  pdf.rect(20, currentY, pageWidth - 40, 15);
  
  currentY += 25;
  
  // ===== TOTALS SECTION (Compact) =====
  // Left side - Transaction Summary
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('TRANSACTION SUMMARY', 25, currentY);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Processed on:', 25, currentY + 12);
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text(new Date(receiptData.date).toLocaleDateString('en-GB'), 70, currentY + 12);
  
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Status:', 25, currentY + 22);
  pdf.setTextColor(34, 197, 94); // Green
  pdf.text('Payment Successful', 50, currentY + 22);
  
  // Right side - Totals (Aligned properly)
  const totalsLabelX = pageWidth - 90;
  const totalsValueX = pageWidth - 25;
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Sub Total', totalsLabelX, currentY + 5);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('Rs. ' + receiptData.amount.toLocaleString('en-IN'), totalsValueX, currentY + 5, { align: 'right' });
  
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('Service Fee', totalsLabelX, currentY + 15);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('Rs. 0.00', totalsValueX, currentY + 15, { align: 'right' });
  
  // Grand Total
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('Grand Total', totalsLabelX, currentY + 28);
  pdf.text('Rs. ' + receiptData.amount.toLocaleString('en-IN'), totalsValueX, currentY + 28, { align: 'right' });
  
  currentY += 50;
  
  // ===== FOOTER SECTION (Compact) =====
  // Left side - Contact info
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  
  pdf.text('Phone: +91 9876543210', 25, currentY);
  pdf.text('Email: support@travent-tms.com', 25, currentY + 10);
  pdf.text('Address: College Campus, City', 25, currentY + 20);
  pdf.text('Website: www.travent-tms.com', 25, currentY + 30);
  
  // Right side - Notes
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('NOTES', rightCol, currentY);
  
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.text('This is a computer-generated receipt.', rightCol, currentY + 12);
  pdf.text('Thank you for using Travent TMS.', rightCol, currentY + 22);
  pdf.text('For queries: support@travent-tms.com', rightCol, currentY + 32);
  
  currentY += 50;
  
  // Powered by footer (Ensure it fits)
  if (currentY < pageHeight - 15) {
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    const poweredText = 'Powered by Travent TMS';
    const textWidth = pdf.getTextWidth(poweredText);
    pdf.text(poweredText, (pageWidth - textWidth) / 2, pageHeight - 10);
  }
  
  // Download
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const filename = `Travent_TMS_Receipt_${receiptData.id}_${timestamp}.pdf`;
  pdf.save(filename);
};

// Mock comprehensive payment data for TMS
const paymentData = {
  user: {
    id: 'STU001',
    name: 'John Doe',
    department: 'Computer Science',
    studentId: 'CS2021001',
    contactNumber: '+91 9876543210',
    email: 'john.doe@example.com',
    accountBalance: 150,
    monthlyBudget: 1000,
    autoPayEnabled: true,
    linkedFamily: ['jane.doe@example.com'], // Parent/Guardian
  },
  
  outstandingPayments: [
    {
      id: 'OUT001',
      type: 'fine',
      title: 'No-Show Fine',
      description: 'Trip on Jan 18, 2024 - Erode Central Route',
      amount: 50,
      dueDate: '2024-01-25',
      priority: 'high',
      canPayLater: false,
    },
    {
      id: 'OUT002', 
      type: 'semester-fee',
      title: 'Semester Transportation Fee',
      description: 'Transportation fee for Jan-May 2024 semester',
      amount: 2500,
      dueDate: '2024-01-31',
      priority: 'high',
      canPayLater: false,
    }
  ],

  upcomingPayments: [
    {
      id: 'UP001',
      type: 'semester-fee',
      title: 'Next Semester Transportation Fee',
      description: 'Transportation fee for May-Sep 2024 semester',
      amount: 2800,
      discount: 300,
      finalAmount: 2500,
      dueDate: '2024-04-30',
      autoPayEnabled: true,
    }
  ],

  paymentMethods: [
    {
      id: 'PM001',
      type: 'upi',
      identifier: 'john.doe@paytm',
      isDefault: true,
      lastUsed: '2024-01-18',
      status: 'active',
    },
    {
      id: 'PM002',
      type: 'card',
      identifier: '**** **** **** 1234',
      cardType: 'visa',
      expiryDate: '12/26',
      isDefault: false,
      lastUsed: '2024-01-15',
      status: 'active',
    },
    {
      id: 'PM003',
      type: 'wallet',
      identifier: 'TMS Wallet',
      balance: 150,
      isDefault: false,
      lastUsed: '2024-01-20',
      status: 'active',
    }
  ],

  subscriptions: [
    {
      id: 'SUB001',
      type: 'semester-plan',
      routeName: 'Erode Central',
      amount: 2500,
      nextBilling: '2024-05-01',
      status: 'active',
      autoRenew: true,
      savings: 'All transportation included',
    }
  ],

  recentTransactions: [
    {
      id: 'TXN001',
      type: 'semester-fee',
      description: 'Semester Transportation Fee - Jan-May 2024',
      amount: -2500,
      date: '2024-01-01T10:30:00',
      status: 'completed',
      paymentMethod: 'UPI',
      receiptId: 'RCP001',
    },
    {
      id: 'TXN002',
      type: 'wallet-topup',
      description: 'Wallet top-up',
      amount: 500,
      date: '2024-01-18T14:20:00',
      status: 'completed',
      paymentMethod: 'Card',
      receiptId: 'RCP002',
    },
    {
      id: 'TXN003',
      type: 'fine',
      description: 'No-show fine - Route 01',
      amount: -50,
      date: '2024-01-17T10:00:00',
      status: 'pending',
      paymentMethod: 'Auto-debit',
      receiptId: null,
    }
  ],

  analytics: {
    monthlySpending: [
      { month: 'Dec', amount: 0 },
      { month: 'Jan', amount: 2550 },
    ],
    categoryBreakdown: [
      { category: 'Semester Fee', amount: 2500, percentage: 98 },
      { category: 'Fines', amount: 50, percentage: 2 },
    ],
    savingsFromPass: 300,
    totalSaved: 500,
  }
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}> = ({ icon, label, value, subValue, color, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center`}>
          {icon}
        </div>
        {trend && (
          <TrendingUp className={`w-4 h-4 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400'}`} />
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
      {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
    </div>
  );
};

// Tab Content Components
const PaymentOverview: React.FC<{ 
  data: any; 
  onPayNow: (payment: any) => void;
  onWalletTopup: () => void;
  onDownloadReceipts: () => void;
  onPaymentSettings: () => void;
}> = ({ data, onPayNow, onWalletTopup, onDownloadReceipts, onPaymentSettings }) => (
  <motion.div
    key="overview"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    {/* Outstanding Payments */}
    {data.outstandingPayments.length > 0 && (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Outstanding Payments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.outstandingPayments.map((payment: any) => (
            <div key={payment.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    payment.type === 'fine' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {payment.type === 'fine' ? <AlertTriangle className="w-5 h-5" /> : <Receipt className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{payment.title}</h4>
                    <p className="text-sm text-gray-600">{payment.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  payment.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {payment.priority} priority
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">₹{payment.amount}</p>
                  <p className="text-sm text-gray-500">Due: {new Date(payment.dueDate).toLocaleDateString('en-GB')}</p>
                </div>
                <button
                  onClick={() => onPayNow(payment)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    payment.priority === 'high' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Upcoming Payments */}
    {data.upcomingPayments.length > 0 && (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Payments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.upcomingPayments.map((payment: any) => (
            <div key={payment.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{payment.title}</h4>
                  <p className="text-sm text-gray-600">{payment.description}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Original Amount:</span>
                  <span className="line-through text-gray-400">₹{payment.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount:</span>
                  <span className="text-green-600">-₹{payment.discount}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Final Amount:</span>
                  <span>₹{payment.finalAmount}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Auto-pay enabled</span>
                </div>
                <p className="text-sm text-gray-500">Due: {new Date(payment.dueDate).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Quick Actions */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={onWalletTopup}
          className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <Wallet className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <span className="text-sm font-medium">Top Up Wallet</span>
        </button>
        <button 
          onClick={() => {
            const semesterFee = data.outstandingPayments.find(p => p.type === 'semester-fee');
            if (semesterFee) {
              onPayNow(semesterFee);
            } else {
              alert('No pending semester fees to pay!');
            }
          }}
          className="p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
        >
          <Receipt className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <span className="text-sm font-medium">Pay Semester Fee</span>
        </button>
        <button 
          onClick={onDownloadReceipts}
          className="p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
        >
          <FileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <span className="text-sm font-medium">Download Receipts</span>
        </button>
        <button 
          onClick={onPaymentSettings}
          className="p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
        >
          <Settings className="w-6 h-6 text-gray-600 mx-auto mb-2" />
          <span className="text-sm font-medium">Payment Settings</span>
        </button>
      </div>
    </div>

    {/* Spending Analytics */}
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Spending Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-3">This Month</h4>
          <div className="space-y-2">
            {data.analytics.categoryBreakdown.map((category: any) => (
              <div key={category.category} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{category.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">₹{category.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Monthly Trend</h4>
          <div className="space-y-2">
            {data.analytics.monthlySpending.map((month: any) => (
              <div key={month.month} className="flex justify-between">
                <span className="text-sm text-gray-600">{month.month}</span>
                <span className="text-sm font-medium">₹{month.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Savings</h4>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <PiggyBank className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">₹{data.analytics.totalSaved}</p>
            <p className="text-sm text-gray-600">Total saved from bulk payments</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const TransactionHistory: React.FC<{ transactions: any[] }> = ({ transactions }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(txn => {
    const matchesFilter = filter === 'all' || txn.type === filter;
    const matchesSearch = txn.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Transactions</option>
          <option value="semester-fee">Semester Fees</option>
          <option value="wallet-topup">Wallet Top-ups</option>
          <option value="fine">Fines</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'semester-fee' && <Receipt className="w-5 h-5" />}
                  {transaction.type === 'wallet-topup' && <Wallet className="w-5 h-5" />}
                  {transaction.type === 'fine' && <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{new Date(transaction.date).toLocaleDateString('en-GB')}</span>
                    <span>{transaction.paymentMethod}</span>
                    {transaction.receiptId && (
                      <span className="text-blue-600">Receipt: {transaction.receiptId}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                </p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  transaction.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PaymentMethods: React.FC<{ methods: any[] }> = ({ methods }) => (
  <motion.div
    key="methods"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-6"
  >
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold text-gray-900">Payment Methods</h3>
      <button 
        onClick={() => alert('Add new payment method - Coming soon!')}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Method
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {methods.map((method) => (
        <div key={method.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                {method.type === 'upi' && <Smartphone className="w-5 h-5" />}
                {method.type === 'card' && <CreditCard className="w-5 h-5" />}
                {method.type === 'wallet' && <Wallet className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {method.type === 'upi' && 'UPI'}
                  {method.type === 'card' && `${method.cardType?.toUpperCase()} Card`}
                  {method.type === 'wallet' && 'TMS Wallet'}
                </h4>
                <p className="text-sm text-gray-600">{method.identifier}</p>
              </div>
            </div>
            {method.isDefault && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Default
              </span>
            )}
          </div>
          
          {method.type === 'wallet' && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">Balance</p>
              <p className="text-xl font-bold text-gray-900">₹{method.balance}</p>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
                              Last used: {new Date(method.lastUsed).toLocaleDateString('en-GB')}
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => alert('Edit payment method - Coming soon!')}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => alert('View payment method details - Coming soon!')}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const SubscriptionManagement: React.FC<{ subscriptions: any[] }> = ({ subscriptions }) => (
  <motion.div
    key="subscriptions"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-6"
  >
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold text-gray-900">Active Semester Plans</h3>
      <button 
        onClick={() => alert('New semester plan setup - Coming soon!')}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        New Plan
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {subscriptions.map((subscription) => (
        <div key={subscription.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Semester Transportation Plan</h4>
                <p className="text-sm text-gray-600">{subscription.routeName}</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Active
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Semester Cost:</span>
              <span className="font-medium">₹{subscription.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Next Billing:</span>
              <span className="font-medium">{new Date(subscription.nextBilling).toLocaleDateString('en-GB')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Coverage:</span>
              <span className="text-green-600 font-medium">{subscription.savings}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600">Auto-renew enabled</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => alert('Pause semester plan - This will stop auto-renewal')}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
              >
                Pause
              </button>
              <button 
                onClick={() => confirm('Are you sure you want to cancel this semester plan? This action cannot be undone.') && alert('Plan cancelled successfully')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// PIN Verification Modal
const PinVerificationModal: React.FC<{ 
  onClose: () => void; 
  onSuccess: () => void;
  title: string;
}> = ({ onClose, onSuccess, title }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-verify when all digits entered
    if (index === 3 && value && newPin.every(digit => digit !== '')) {
      verifyPin(newPin.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyPin = async (enteredPin: string) => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo PIN is 1234
    if (enteredPin === '1234') {
      setIsVerifying(false);
      onSuccess();
    } else {
      setIsVerifying(false);
      setError('Invalid PIN. Please try again.');
      setPin(['', '', '', '']);
      inputRefs[0].current?.focus();
    }
  };

  const handleManualVerify = () => {
    const enteredPin = pin.join('');
    if (enteredPin.length === 4) {
      verifyPin(enteredPin);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">Enter your 4-digit PIN to proceed</p>
        </div>

        {/* PIN Input */}
        <div className="flex justify-center gap-4 mb-6">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="password"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              maxLength={1}
              disabled={isVerifying}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Demo Hint */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-xs text-blue-700 text-center">
            💡 Demo PIN: 1234
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
            disabled={isVerifying}
          >
            Cancel
          </button>
          <button
            onClick={handleManualVerify}
            disabled={pin.join('').length !== 4 || isVerifying}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Verifying...
              </>
            ) : (
              'Verify PIN'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentFlowModal: React.FC<{ payment: any; onClose: () => void }> = ({ payment, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState(paymentData.paymentMethods[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const handlePayment = async () => {
    // Check if wallet payment requires PIN
    if (selectedMethod.type === 'wallet') {
      setShowPinModal(true);
      return;
    }
    
    // Process non-wallet payments
    processPayment();
  };

  const processPayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsCompleted(true);
  };

  const handlePinSuccess = () => {
    setShowPinModal(false);
    processPayment();
  };

  if (!payment) return null;

  if (isCompleted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">Your payment of ₹{payment.amount} has been processed successfully.</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
              <p className="text-green-700 text-sm text-center">
                ✅ Payment completed • Professional receipt available for download
              </p>
            </div>
            <div className="space-y-2 mb-6">
                              <p className="text-sm text-gray-500">Transaction ID: TXN2024012501</p>
              <p className="text-sm text-gray-500">Payment Method: {selectedMethod.identifier}</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
              <button 
                onClick={() => {
                  generateProfessionalReceipt({
                    id: `RCP${Date.now().toString().slice(-6)}`,
                    date: new Date().toISOString(),
                    description: payment.description,
                    amount: payment.amount,
                    type: payment.type,
                    paymentMethod: selectedMethod.identifier,
                    transactionId: 'TXN2024012501'
                  });
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Complete Payment</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Payment Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">{payment.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{payment.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount:</span>
            <span className="text-xl font-bold text-gray-900">₹{payment.amount}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Select Payment Method</h4>
          <div className="space-y-2">
            {paymentData.paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method)}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  selectedMethod.id === method.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    {method.type === 'upi' && <Smartphone className="w-4 h-4" />}
                    {method.type === 'card' && <CreditCard className="w-4 h-4" />}
                    {method.type === 'wallet' && <Wallet className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{method.identifier}</p>
                    {method.type === 'wallet' && (
                      <p className="text-sm text-gray-600">Balance: ₹{method.balance}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              Pay ₹{payment.amount}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* PIN Verification Modal */}
        {showPinModal && (
          <PinVerificationModal
            title="Verify Wallet PIN"
            onClose={() => setShowPinModal(false)}
            onSuccess={handlePinSuccess}
          />
        )}
      </div>
    </div>
  );
};

// Wallet Top-up Modal
const WalletTopupModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(paymentData.paymentMethods[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const predefinedAmounts = [100, 200, 500, 1000, 2000];

  const handleTopup = async () => {
    if (!amount || parseInt(amount) < 50) {
      alert('Minimum top-up amount is ₹50');
      return;
    }
    
    // All wallet top-ups require PIN verification for security
    setShowPinModal(true);
  };

  const processTopup = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsCompleted(true);
  };

  const handlePinSuccess = () => {
    setShowPinModal(false);
    processTopup();
  };

  if (isCompleted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Top-up Successful!</h3>
            <p className="text-gray-600 mb-4">₹{amount} has been added to your wallet.</p>
            <p className="text-sm text-green-600 mb-6">New balance: ₹{parseInt(paymentData.user.accountBalance) + parseInt(amount)}</p>
            <button 
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Top Up Wallet</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Current Balance */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-medium">Current Balance</span>
            <span className="text-xl font-bold text-blue-900">₹{paymentData.user.accountBalance}</span>
          </div>
        </div>

        {/* Predefined Amounts */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Quick Amounts</h4>
          <div className="grid grid-cols-3 gap-3">
            {predefinedAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt.toString())}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  amount === amt.toString()
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Or Enter Custom Amount</h4>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="50"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Minimum amount: ₹50</p>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
          <div className="space-y-2">
            {paymentData.paymentMethods.filter(method => method.type !== 'wallet').map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method)}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  selectedMethod.id === method.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    {method.type === 'upi' && <Smartphone className="w-4 h-4" />}
                    {method.type === 'card' && <CreditCard className="w-4 h-4" />}
                  </div>
                  <span className="font-medium text-gray-900">{method.identifier}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Top-up Button */}
        <button
          onClick={handleTopup}
          disabled={isProcessing || !amount || parseInt(amount) < 50}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              Top Up ₹{amount || '0'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* PIN Verification Modal for Wallet Top-up */}
        {showPinModal && (
          <PinVerificationModal
            title="Verify PIN for Wallet Top-up"
            onClose={() => setShowPinModal(false)}
            onSuccess={handlePinSuccess}
          />
        )}
      </div>
    </div>
  );
};

// Receipts Modal
const ReceiptsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);

  const availableReceipts = [
    {
      id: 'RCP001',
      description: 'Semester Transportation Fee - Jan-May 2024',
      amount: 2500,
      date: '2024-01-01',
      type: 'semester-fee'
    },
    {
      id: 'RCP002',
      description: 'Wallet Top-up',
      amount: 500,
      date: '2024-01-18',
      type: 'wallet-topup'
    },
    {
      id: 'RCP003',
      description: 'Previous Semester Fee - Aug-Dec 2023',
      amount: 2500,
      date: '2023-08-01',
      type: 'semester-fee'
    }
  ];

  const toggleReceipt = (receiptId: string) => {
    setSelectedReceipts(prev => 
      prev.includes(receiptId) 
        ? prev.filter(id => id !== receiptId)
        : [...prev, receiptId]
    );
  };

  const generateReceiptPDF = (receipt: any) => {
    generateProfessionalReceipt({
      id: receipt.id,
      date: receipt.date,
      description: receipt.description,
      amount: receipt.amount,
      type: receipt.type,
      transactionId: `TXN${Date.now().toString().slice(-6)}`
    });
  };

  const downloadSelected = () => {
    if (selectedReceipts.length === 0) {
      alert('Please select at least one receipt to download');
      return;
    }
    
    const receiptsToDownload = availableReceipts.filter(receipt => 
      selectedReceipts.includes(receipt.id)
    );
    
    receiptsToDownload.forEach((receipt, index) => {
      setTimeout(() => {
        generateReceiptPDF(receipt);
      }, index * 500); // Stagger downloads by 500ms each
    });
    
    setTimeout(() => {
      alert(`Successfully downloaded ${selectedReceipts.length} professional PDF receipt(s)! Check your Downloads folder.`);
      onClose();
    }, receiptsToDownload.length * 500 + 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Download Receipts</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Enhanced PDF Receipts</h4>
              <p className="text-blue-600 text-xs">Professional • Branded • Secure</p>
            </div>
          </div>
          <p className="text-blue-700 text-sm leading-relaxed">
            ✨ Download beautifully formatted PDF receipts with professional branding, enhanced typography, 
            visual elements, and complete transaction verification details.
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-blue-600">
            <span className="flex items-center gap-1">🎨 Modern Design</span>
            <span className="flex items-center gap-1">🔒 Secure Verification</span>
            <span className="flex items-center gap-1">📱 Print Ready</span>
          </div>
        </div>

        {/* Receipt List */}
        <div className="space-y-3 mb-6">
          {availableReceipts.map((receipt) => (
            <div 
              key={receipt.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedReceipts.includes(receipt.id)
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleReceipt(receipt.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedReceipts.includes(receipt.id)}
                    onChange={() => toggleReceipt(receipt.id)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center relative">
                    <FileText className="w-5 h-5 text-red-600" />
                    <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs px-1 rounded text-[8px] font-bold">PDF</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{receipt.description}</h4>
                    <p className="text-sm text-gray-500">{new Date(receipt.date).toLocaleDateString('en-GB')} • Receipt ID: {receipt.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{receipt.amount}</p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Paid
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedReceipts(availableReceipts.map(r => r.id))}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Select All
          </button>
          <button
            onClick={downloadSelected}
            disabled={selectedReceipts.length === 0}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium shadow-lg"
          >
            <FileText className="w-4 h-4" />
            Download PDF Receipts ({selectedReceipts.length})
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment Settings Modal
const PaymentSettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [settings, setSettings] = useState({
    autoPayEnabled: paymentData.user.autoPayEnabled,
    monthlyBudget: paymentData.user.monthlyBudget,
    notificationsEnabled: true,
    lowBalanceAlert: 100,
    budgetAlerts: true,
    familySharing: paymentData.user.linkedFamily.length > 0
  });

  const handleSave = () => {
    alert('Payment settings saved successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Payment Settings</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Auto-pay Settings */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Auto-Pay Preferences</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Enable Auto-Pay for Semester Fees</span>
                <input
                  type="checkbox"
                  checked={settings.autoPayEnabled}
                  onChange={(e) => setSettings({...settings, autoPayEnabled: e.target.checked})}
                  className="w-4 h-4 text-blue-600"
                />
              </label>
            </div>
          </div>

          {/* Budget Settings */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Budget Management</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Monthly Budget (₹)</label>
                <input
                  type="number"
                  value={settings.monthlyBudget}
                  onChange={(e) => setSettings({...settings, monthlyBudget: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Budget Alert Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.budgetAlerts}
                  onChange={(e) => setSettings({...settings, budgetAlerts: e.target.checked})}
                  className="w-4 h-4 text-blue-600"
                />
              </label>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Notifications</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Payment Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.notificationsEnabled}
                  onChange={(e) => setSettings({...settings, notificationsEnabled: e.target.checked})}
                  className="w-4 h-4 text-blue-600"
                />
              </label>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Low Balance Alert (₹)</label>
                <input
                  type="number"
                  value={settings.lowBalanceAlert}
                  onChange={(e) => setSettings({...settings, lowBalanceAlert: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Family Settings */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Family & Sharing</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Family Account Sharing</span>
                <input
                  type="checkbox"
                  checked={settings.familySharing}
                  onChange={(e) => setSettings({...settings, familySharing: e.target.checked})}
                  className="w-4 h-4 text-blue-600"
                />
              </label>
              {settings.familySharing && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-600">
                    Linked accounts: {paymentData.user.linkedFamily.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Security Settings */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Security</h4>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Change Payment PIN</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'methods' | 'subscriptions'>('overview');
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showWalletTopup, setShowWalletTopup] = useState(false);
  const [showReceiptsModal, setShowReceiptsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const totalOutstanding = paymentData.outstandingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const thisMonthSpent = paymentData.analytics.monthlySpending[paymentData.analytics.monthlySpending.length - 1]?.amount || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden h-16" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Center</h1>
              <p className="text-gray-600">Complete transportation payment management</p>
            </div>
            
            {/* User Info & Quick Actions */}
            <div className="mt-4 sm:mt-0 flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Wallet: ₹{paymentData.user.accountBalance}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowWalletTopup(true)}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <StatCard
              icon={<DollarSign className="w-5 h-5" />}
              label="Outstanding Amount"
              value={`₹${totalOutstanding}`}
              color={totalOutstanding > 0 ? "red" : "green"}
              trend={totalOutstanding > 0 ? "up" : "stable"}
            />
            <StatCard
              icon={<Calendar className="w-5 h-5" />}
              label="This Month Spent"
              value={`₹${thisMonthSpent}`}
              subValue="Budget: ₹1,000"
              color="blue"
              trend="up"
            />
            <StatCard
              icon={<Receipt className="w-5 h-5" />}
              label="Active Subscriptions"
              value={paymentData.subscriptions.length.toString()}
              subValue="Auto-renewing"
              color="green"
            />
            <StatCard
              icon={<PiggyBank className="w-5 h-5" />}
              label="Money Saved"
              value={`₹${paymentData.analytics.totalSaved}`}
              subValue="From bulk passes"
              color="purple"
              trend="up"
            />
            <StatCard
              icon={<CreditCard className="w-5 h-5" />}
              label="Payment Methods"
              value={paymentData.paymentMethods.length.toString()}
              subValue="Active cards/accounts"
              color="blue"
            />
          </div>

          {/* Priority Alerts */}
          {paymentData.outstandingPayments.filter(p => p.priority === 'high').length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div className="flex-1">
                  <h3 className="text-red-900 font-semibold">Urgent Payment Required</h3>
                  <p className="text-red-700 text-sm">
                    You have {paymentData.outstandingPayments.filter(p => p.priority === 'high').length} high-priority payment(s) due.
                  </p>
                </div>
                <button 
                  onClick={() => setShowPaymentFlow(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              {[
                { key: 'overview', label: 'Overview', icon: <Bus className="w-4 h-4" /> },
                { key: 'history', label: 'Transaction History', icon: <History className="w-4 h-4" /> },
                { key: 'methods', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> },
                { key: 'subscriptions', label: 'Subscriptions', icon: <Repeat className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <PaymentOverview 
              data={paymentData}
              onPayNow={(payment) => {
                setSelectedPayment(payment);
                setShowPaymentFlow(true);
              }}
              onWalletTopup={() => setShowWalletTopup(true)}
              onDownloadReceipts={() => setShowReceiptsModal(true)}
              onPaymentSettings={() => setShowSettingsModal(true)}
            />
          )}
          
          {activeTab === 'history' && (
            <TransactionHistory transactions={paymentData.recentTransactions} />
          )}
          
          {activeTab === 'methods' && (
            <PaymentMethods methods={paymentData.paymentMethods} />
          )}
          
          {activeTab === 'subscriptions' && (
            <SubscriptionManagement subscriptions={paymentData.subscriptions} />
          )}
        </AnimatePresence>

        {/* Payment Flow Modal */}
        {showPaymentFlow && (
          <PaymentFlowModal
            payment={selectedPayment || paymentData.outstandingPayments[0]}
            onClose={() => {
              setShowPaymentFlow(false);
              setSelectedPayment(null);
            }}
          />
        )}

        {/* Wallet Top-up Modal */}
        {showWalletTopup && (
          <WalletTopupModal
            onClose={() => setShowWalletTopup(false)}
          />
        )}

        {/* Receipts Modal */}
        {showReceiptsModal && (
          <ReceiptsModal
            onClose={() => setShowReceiptsModal(false)}
          />
        )}

        {/* Payment Settings Modal */}
        {showSettingsModal && (
          <PaymentSettingsModal
            onClose={() => setShowSettingsModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;
