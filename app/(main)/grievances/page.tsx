'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  FileText, 
  Send, 
  Route, 
  User, 
  MessageSquare, 
  AlertCircle,
  CheckCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Lightbulb,
  Settings
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Enhanced input field component
const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
  icon?: React.ReactNode;
}> = ({ label, value, onChange, placeholder, required = false, multiline = false, icon }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
      {icon && <span className="text-gray-500">{icon}</span>}
      <span>{label} {required && <span className="text-red-500">*</span>}</span>
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white text-gray-900 placeholder-gray-500"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900 placeholder-gray-500"
      />
    )}
  </div>
);

// Enhanced select field component
const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; icon?: React.ReactNode; color?: string }[];
  required?: boolean;
  icon?: React.ReactNode;
}> = ({ label, value, onChange, options, required = false, icon }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
      {icon && <span className="text-gray-500">{icon}</span>}
      <span>{label} {required && <span className="text-red-500">*</span>}</span>
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900"
    >
      <option value="" className="text-gray-500">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-gray-900">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Option card component
const OptionCard: React.FC<{
  option: { value: string; label: string; icon: React.ReactNode; color: string; description: string };
  isSelected: boolean;
  onClick: () => void;
}> = ({ option, isSelected, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
        isSelected
          ? `border-${option.color}-500 bg-${option.color}-50`
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className={`w-10 h-10 rounded-lg bg-${option.color}-100 text-${option.color}-600 flex items-center justify-center`}>
          {option.icon}
        </div>
        <h3 className="font-semibold text-gray-900">{option.label}</h3>
      </div>
      <p className="text-sm text-gray-600">{option.description}</p>
    </motion.button>
  );
};

const Grievances: React.FC = () => {
  const router = useRouter();
  const [routeNo, setRouteNo] = useState('');
  const [driverName, setDriverName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const grievanceOptions = [
    {
      value: 'compliment',
      label: 'Share a Compliment',
      icon: <ThumbsUp className="w-5 h-5" />,
      color: 'green',
      description: 'Appreciate excellent service or positive experience'
    },
    {
      value: 'complaint',
      label: 'Lodge a Complaint',
      icon: <ThumbsDown className="w-5 h-5" />,
      color: 'red',
      description: 'Report issues with service quality or behavior'
    },
    {
      value: 'suggestion',
      label: 'Make a Suggestion',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'yellow',
      description: 'Suggest improvements for better service'
    },
    {
      value: 'problem',
      label: 'Report a Problem',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'orange',
      description: 'Report technical issues or service problems'
    },
    {
      value: 'request',
      label: 'Service Request',
      icon: <Star className="w-5 h-5" />,
      color: 'purple',
      description: 'Request new features or services'
    }
  ];

  const validateForm = () => {
    if (!routeNo.trim()) {
      toast.error('Please enter the route number');
      return false;
    }
    if (!driverName.trim()) {
      toast.error('Please enter the driver name');
      return false;
    }
    if (!selectedOption) {
      toast.error('Please select a feedback type');
      return false;
    }
    if (!comments.trim()) {
      toast.error('Please provide your feedback details');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const feedbackData = {
        routeNo: routeNo.trim(),
        driverName: driverName.trim(),
        type: selectedOption,
        comments: comments.trim(),
        timestamp: new Date().toISOString(),
        userId: 'user_001'
      };

      console.log('Feedback submitted:', feedbackData);
      
      toast.success('Feedback submitted successfully!');
      
      // Reset form
      setRouteNo('');
      setDriverName('');
      setSelectedOption('');
      setComments('');
      
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedOptionData = grievanceOptions.find(opt => opt.value === selectedOption);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="lg:hidden h-16" />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Feedback & Grievances</h1>
              <p className="text-sm text-gray-600">Share your thoughts and help us improve</p>
            </div>
          </div>
          
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Trip Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Route className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Trip Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Route Number"
              value={routeNo}
              onChange={setRouteNo}
              placeholder="e.g., Route 12, Route 8"
              required
              icon={<Route className="w-4 h-4" />}
            />

            <InputField
              label="Driver Name"
              value={driverName}
              onChange={setDriverName}
              placeholder="Enter driver's name"
              required
              icon={<User className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Feedback Type Selection */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">What type of feedback would you like to share?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grievanceOptions.map((option) => (
              <OptionCard
                key={option.value}
                option={option}
                isSelected={selectedOption === option.value}
                onClick={() => setSelectedOption(option.value)}
              />
            ))}
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Share Your Experience</h3>
          </div>
          
          {selectedOptionData && (
            <div className={`p-4 rounded-lg bg-${selectedOptionData.color}-50 border border-${selectedOptionData.color}-200 mb-6`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-${selectedOptionData.color}-100 text-${selectedOptionData.color}-600 flex items-center justify-center`}>
                  {selectedOptionData.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedOptionData.label}</h4>
                  <p className="text-sm text-gray-600">{selectedOptionData.description}</p>
                </div>
              </div>
            </div>
          )}
          
          <InputField
            label="Your Feedback"
            value={comments}
            onChange={setComments}
            placeholder={
              selectedOptionData?.value === 'compliment' 
                ? "Tell us what made your experience great..."
                : selectedOptionData?.value === 'complaint'
                ? "Please describe the issue you experienced..."
                : selectedOptionData?.value === 'suggestion'
                ? "Share your ideas for improvement..."
                : selectedOptionData?.value === 'problem'
                ? "Describe the problem you encountered..."
                : selectedOptionData?.value === 'request'
                ? "What new service or feature would you like?"
                : "Please provide detailed feedback..."
            }
            required
            multiline
            icon={<MessageSquare className="w-4 h-4" />}
          />
        </div>

        {/* Submit Button */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting Feedback...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Feedback</span>
              </>
            )}
          </motion.button>
          
          <p className="text-sm text-gray-600 mt-3 text-center">
            Your feedback helps us improve our transportation services. Thank you for taking the time to share your experience.
          </p>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { background: '#fff', color: '#374151' },
        }}
      />
    </div>
  );
};

export default Grievances; 