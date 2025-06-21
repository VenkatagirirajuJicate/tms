'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    emergencyContact: string;
  };
  academicInfo: {
    userType: string;
    department: string;
    year: string;
    section: string;
    rollNo: string;
    regNo: string;
    instituteName: string;
  };
  locationDetails: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    boardingPoint: string;
    boardingPeriods: string[];
  };
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    smsUpdates: boolean;
  };
}

const NewUserForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      emergencyContact: '',
    },
    academicInfo: {
      userType: '',
      department: '',
      year: '',
      section: '',
      rollNo: '',
      regNo: '',
      instituteName: '',
    },
    locationDetails: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      boardingPoint: '',
      boardingPeriods: [],
    },
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsUpdates: false,
    },
  });

  const userTypeOptions = [
    { id: 'student', name: 'Student' },
    { id: 'staff', name: 'Staff' },
  ];

  const genderOptions = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
  ];

  const bloodGroupOptions = [
    { id: 'A+', name: 'A+' },
    { id: 'A-', name: 'A-' },
    { id: 'B+', name: 'B+' },
    { id: 'B-', name: 'B-' },
    { id: 'AB+', name: 'AB+' },
    { id: 'AB-', name: 'AB-' },
    { id: 'O+', name: 'O+' },
    { id: 'O-', name: 'O-' },
  ];

  const departmentOptions = [
    { id: 'CSE', name: 'Computer Science Engineering' },
    { id: 'ECE', name: 'Electronics & Communication Engineering' },
    { id: 'EEE', name: 'Electrical & Electronics Engineering' },
    { id: 'MECH', name: 'Mechanical Engineering' },
    { id: 'CIVIL', name: 'Civil Engineering' },
    { id: 'IT', name: 'Information Technology' },
    { id: 'AHS', name: 'Allied Health Sciences' },
    { id: 'B.PHARM', name: 'B.Pharmacy' },
    { id: 'PHARM D', name: 'Pharm D' },
  ];

  const yearOptions = [
    { id: 'I', name: 'First Year' },
    { id: 'II', name: 'Second Year' },
    { id: 'III', name: 'Third Year' },
    { id: 'IV', name: 'Fourth Year' },
    { id: 'V', name: 'Fifth Year' },
  ];

  const sectionOptions = [
    { id: 'A', name: 'Section A' },
    { id: 'B', name: 'Section B' },
    { id: 'C', name: 'Section C' },
    { id: 'D', name: 'Section D' },
  ];

  const boardingPeriodOptions = [
    { id: 'morning', name: 'Morning' },
    { id: 'evening', name: 'Evening' },
    { id: 'both', name: 'Both' },
  ];

  const handleInputChange = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleBoardingPeriodToggle = (periodId: string) => {
    const currentPeriods = formData.locationDetails.boardingPeriods;
    const updatedPeriods = currentPeriods.includes(periodId)
      ? currentPeriods.filter(p => p !== periodId)
      : [...currentPeriods, periodId];
    
    setFormData(prev => ({
      ...prev,
      locationDetails: {
        ...prev.locationDetails,
        boardingPeriods: updatedPeriods,
      },
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        const personal = formData.personalInfo;
        return !!(personal.firstName && personal.lastName && personal.email && personal.phone);
      case 2:
        const academic = formData.academicInfo;
        return !!(academic.userType && academic.department && academic.year && academic.section);
      case 3:
        const location = formData.locationDetails;
        return !!(location.address && location.city && location.state && location.pincode);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success('Registration successful!');
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? 'bg-[#4a90e2] text-white'
                : 'bg-[#2C2C2C] text-[#888]'
            }`}
          >
            {step < currentStep ? <Check size={16} /> : step}
          </div>
          {step < 4 && (
            <div
              className={`w-16 h-1 mx-2 ${
                step < currentStep ? 'bg-[#4a90e2]' : 'bg-[#2C2C2C]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">First Name *</label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter first name"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Last Name *</label>
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter last name"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter email address"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Phone Number *</label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter phone number"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Gender</label>
          <select
            value={formData.personalInfo.gender}
            onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          >
            <option value="">Select gender</option>
            {genderOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Blood Group</label>
          <select
            value={formData.personalInfo.bloodGroup}
            onChange={(e) => handleInputChange('personalInfo', 'bloodGroup', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          >
            <option value="">Select blood group</option>
            {bloodGroupOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Emergency Contact</label>
          <input
            type="tel"
            value={formData.personalInfo.emergencyContact}
            onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter emergency contact"
          />
        </div>
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Academic Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">User Type *</label>
          <select
            value={formData.academicInfo.userType}
            onChange={(e) => handleInputChange('academicInfo', 'userType', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          >
            <option value="">Select user type</option>
            {userTypeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Department *</label>
          <select
            value={formData.academicInfo.department}
            onChange={(e) => handleInputChange('academicInfo', 'department', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          >
            <option value="">Select department</option>
            {departmentOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Year *</label>
          <select
            value={formData.academicInfo.year}
            onChange={(e) => handleInputChange('academicInfo', 'year', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          >
            <option value="">Select year</option>
            {yearOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Section *</label>
          <select
            value={formData.academicInfo.section}
            onChange={(e) => handleInputChange('academicInfo', 'section', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          >
            <option value="">Select section</option>
            {sectionOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Roll Number</label>
          <input
            type="text"
            value={formData.academicInfo.rollNo}
            onChange={(e) => handleInputChange('academicInfo', 'rollNo', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter roll number"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Registration Number</label>
          <input
            type="text"
            value={formData.academicInfo.regNo}
            onChange={(e) => handleInputChange('academicInfo', 'regNo', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter registration number"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-[#888] text-sm font-medium mb-2">Institute Name</label>
          <input
            type="text"
            value={formData.academicInfo.instituteName}
            onChange={(e) => handleInputChange('academicInfo', 'instituteName', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter institute name"
          />
        </div>
      </div>
    </div>
  );

  const renderLocationDetails = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Location Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-[#888] text-sm font-medium mb-2">Address *</label>
          <textarea
            value={formData.locationDetails.address}
            onChange={(e) => handleInputChange('locationDetails', 'address', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            rows={3}
            placeholder="Enter your address"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">City *</label>
          <input
            type="text"
            value={formData.locationDetails.city}
            onChange={(e) => handleInputChange('locationDetails', 'city', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter city"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">State *</label>
          <input
            type="text"
            value={formData.locationDetails.state}
            onChange={(e) => handleInputChange('locationDetails', 'state', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter state"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Pincode *</label>
          <input
            type="text"
            value={formData.locationDetails.pincode}
            onChange={(e) => handleInputChange('locationDetails', 'pincode', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter pincode"
          />
        </div>
        
        <div>
          <label className="block text-[#888] text-sm font-medium mb-2">Boarding Point</label>
          <input
            type="text"
            value={formData.locationDetails.boardingPoint}
            onChange={(e) => handleInputChange('locationDetails', 'boardingPoint', e.target.value)}
            className="w-full px-4 py-3 bg-[#23272e] text-white rounded-lg border border-[#23272e] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            placeholder="Enter boarding point"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-[#888] text-sm font-medium mb-4">Boarding Periods</label>
        <div className="flex flex-wrap gap-3">
          {boardingPeriodOptions.map((period) => (
            <button
              key={period.id}
              onClick={() => handleBoardingPeriodToggle(period.id)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                formData.locationDetails.boardingPeriods.includes(period.id)
                  ? 'bg-[#4a90e2] text-white border-[#4a90e2]'
                  : 'bg-[#23272e] text-[#888] border-[#23272e] hover:bg-[#2C2C2C]'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Preferences</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-[#23272e] rounded-lg">
          <div>
            <h3 className="text-white font-medium">Push Notifications</h3>
            <p className="text-[#888] text-sm">Receive notifications about your trips</p>
          </div>
          <button
            onClick={() => handleInputChange('preferences', 'notifications', !formData.preferences.notifications)}
            className={`w-12 h-6 rounded-full transition-colors ${
              formData.preferences.notifications ? 'bg-[#4a90e2]' : 'bg-[#2C2C2C]'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                formData.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-[#23272e] rounded-lg">
          <div>
            <h3 className="text-white font-medium">Email Updates</h3>
            <p className="text-[#888] text-sm">Receive updates via email</p>
          </div>
          <button
            onClick={() => handleInputChange('preferences', 'emailUpdates', !formData.preferences.emailUpdates)}
            className={`w-12 h-6 rounded-full transition-colors ${
              formData.preferences.emailUpdates ? 'bg-[#4a90e2]' : 'bg-[#2C2C2C]'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                formData.preferences.emailUpdates ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-[#23272e] rounded-lg">
          <div>
            <h3 className="text-white font-medium">SMS Updates</h3>
            <p className="text-[#888] text-sm">Receive updates via SMS</p>
          </div>
          <button
            onClick={() => handleInputChange('preferences', 'smsUpdates', !formData.preferences.smsUpdates)}
            className={`w-12 h-6 rounded-full transition-colors ${
              formData.preferences.smsUpdates ? 'bg-[#4a90e2]' : 'bg-[#2C2C2C]'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                formData.preferences.smsUpdates ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderAcademicInfo();
      case 3:
        return renderLocationDetails();
      case 4:
        return renderPreferences();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E262F] to-[#16171B]">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center p-5">
        <button
          onClick={() => router.back()}
          className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">New User Registration</h1>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-8">
        {renderStepIndicator()}
        
        <div className="bg-[#1E1E1E] rounded-lg p-8">
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-[#2C2C2C] text-white rounded-lg hover:bg-[#353A40] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition-colors"
            >
              {currentStep === 4 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserForm; 