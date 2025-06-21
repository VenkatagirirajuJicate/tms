'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
}) => (
  <div className="mb-5">
    <label className="block text-white text-sm mb-2">
      {label} {required && '*'}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[#FCD34D] transition-colors resize-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[#FCD34D] transition-colors"
      />
    )}
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) => (
  <div className="mb-5">
    <label className="block text-white text-sm mb-2">
      {label} {required && '*'}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#FCD34D] transition-colors"
    >
      <option value="" className="text-gray-600">Select</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-gray-600">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const Grievances = () => {
  const router = useRouter();
  const [routeNo, setRouteNo] = useState('');
  const [driverName, setDriverName] = useState('');
  const [option, setOption] = useState('');
  const [comments, setComments] = useState('');

  const grievanceOptions = [
    { value: 'Option 1', label: 'Are you making a compliment?' },
    { value: 'Option 2', label: 'Are you making a complaint?' },
    { value: 'Option 3', label: 'Are you making a suggestion?' },
    { value: 'Option 4', label: 'Reporting a problem or fix?' },
    { value: 'Option 5', label: 'Are you requesting something new?' },
  ];

  const handleSubmit = () => {
    if (routeNo.trim() === '' || driverName.trim() === '') {
      toast.error('Please fill out all required fields!');
      return;
    }

    toast.success('Feedback Sent Successfully!');
    setTimeout(() => router.push('/profile'), 2000);
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1E262F] to-[#16171B] min-h-screen">
      <div className="flex-1 p-5">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">Grievances</h1>
        </div>

        {/* Form */}
        <div className="px-5">
          <InputField
            label="Route No"
            value={routeNo}
            onChange={setRouteNo}
            placeholder="Enter route number"
            required
          />

          <InputField
            label="Driver Name"
            value={driverName}
            onChange={setDriverName}
            placeholder="Enter driver name"
            required
          />

          <SelectField
            label="Choose Option that best suits your request"
            value={option}
            onChange={setOption}
            options={grievanceOptions}
          />

          <InputField
            label="Comments"
            value={comments}
            onChange={setComments}
            placeholder="Enter your comments"
            multiline
          />

          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#FCD34D] py-3 px-6 rounded-lg font-semibold text-[#1E293B] hover:bg-[#F59E0B] transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { background: '#363636', color: '#fff' },
        }}
      />
    </div>
  );
};

export default Grievances; 