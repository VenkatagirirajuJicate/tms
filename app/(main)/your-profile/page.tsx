'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, ChevronLeft } from 'lucide-react';

// Dummy user details
const dummyUserDetails = {
  name: 'John Doe',
  gender: 'male',
  dob: '1995-05-15',
  email: 'john.doe@example.com',
  mobile: '+1 234 567 8900',
  address: '123 Main Street, City, State 12345',
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '+1 234 567 8901',
  },
};

const InputField = ({
  label,
  value,
  placeholder,
  disabled = true,
}: {
  label: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
}) => (
  <div className="mb-5">
    <label className="block text-white text-sm mb-2">{label}</label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[#FCD34D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

const SelectField = ({
  label,
  value,
  options,
  disabled = true,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) => (
  <div className="mb-5">
    <label className="block text-white text-sm mb-2">{label}</label>
    <select
      value={value}
      disabled={disabled}
      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#FCD34D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-gray-600">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const YourProfile = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(dummyUserDetails);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      try {
        setUserDetails(JSON.parse(storedUserDetails));
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
  }, []);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

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
          <h1 className="text-2xl font-bold text-white">Your Profile</h1>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-[#353A40] flex items-center justify-center">
            <User className="text-[#888] w-12 h-12" />
          </div>
        </div>

        {/* Form */}
        <div className="px-5">
          <InputField
            label="Name"
            value={userDetails?.name || ''}
            placeholder="Enter your name"
            disabled
          />

          <SelectField
            label="Gender"
            value={userDetails?.gender || ''}
            options={genderOptions}
            disabled
          />

          <InputField
            label="Date of Birth"
            value={userDetails?.dob || ''}
            placeholder="Enter date of birth"
            disabled
          />

          <InputField
            label="Email"
            value={userDetails?.email || ''}
            placeholder="Enter your email"
            disabled
          />

          <InputField
            label="Phone No"
            value={userDetails?.mobile || ''}
            placeholder="Enter your phone number"
            disabled
          />

          <InputField
            label="Address"
            value={userDetails?.address || ''}
            placeholder="Enter your address"
            disabled
          />

          {/* Emergency Contact Section */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white mb-4">Emergency Contact</h3>
            
            <InputField
              label="Emergency Contact Name"
              value={userDetails?.emergencyContact?.name || ''}
              placeholder="Enter emergency contact name"
              disabled
            />

            <InputField
              label="Emergency Contact Relation"
              value={userDetails?.emergencyContact?.relationship || ''}
              placeholder="Enter relationship"
              disabled
            />

            <InputField
              label="Emergency Contact Phone"
              value={userDetails?.emergencyContact?.phone || ''}
              placeholder="Enter emergency contact phone"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourProfile; 