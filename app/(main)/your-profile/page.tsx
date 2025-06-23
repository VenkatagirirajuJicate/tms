'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  ChevronLeft, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Shield,
  Briefcase,
  Heart,
  AlertCircle,
  Check,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Enhanced user details interface
interface UserDetails {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  email: string;
  mobile: string;
  address: string;
  department?: string;
  studentId?: string;
  year?: string;
  bloodGroup?: string;
  avatar?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  preferences: {
    isProfilePublic: boolean;
    allowNotifications: boolean;
    shareLocationData: boolean;
  };
}

// Mock enhanced user data
const mockUserDetails: UserDetails = {
  id: 'usr_001',
  name: 'John Doe',
  gender: 'male',
  dob: '1995-05-15',
  email: 'john.doe@example.com',
  mobile: '+91 9876543210',
  address: '123 Main Street, Erode, Tamil Nadu 638001',
  department: 'Computer Science',
  studentId: 'CS2021001',
  year: '3rd Year',
  bloodGroup: 'O+',
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Mother',
    phone: '+91 9876543211',
  },
  preferences: {
    isProfilePublic: true,
    allowNotifications: true,
    shareLocationData: false,
  }
};

// Enhanced input field component
const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
}> = ({ label, value, onChange, placeholder, disabled = false, required = false, type = 'text', icon, multiline = false }) => {
  return (
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
          disabled={disabled}
          rows={3}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'
          }`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'
          }`}
        />
      )}
    </div>
  );
};

// Enhanced select field component
const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
}> = ({ label, value, onChange, options, disabled = false, required = false, icon }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
        {icon && <span className="text-gray-500">{icon}</span>}
        <span>{label} {required && <span className="text-red-500">*</span>}</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Profile section component
const ProfileSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-gray-100">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
};

// Main component
const YourProfile: React.FC = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails>(mockUserDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tempDetails, setTempDetails] = useState<UserDetails>(mockUserDetails);
  const [showImageUpload, setShowImageUpload] = useState(false);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      try {
        const parsed = { ...mockUserDetails, ...JSON.parse(storedUserDetails) };
        setUserDetails(parsed);
        setTempDetails(parsed);
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setTempDetails({ ...userDetails });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempDetails({ ...userDetails });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUserDetails({ ...tempDetails });
      localStorage.setItem('userDetails', JSON.stringify(tempDetails));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof UserDetails, value: any) => {
    setTempDetails(prev => ({ ...prev, [field]: value }));
  };

  const updateEmergencyContact = (field: keyof UserDetails['emergencyContact'], value: string) => {
    setTempDetails(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value }
    }));
  };

  const updatePreferences = (field: keyof UserDetails['preferences'], value: boolean) => {
    setTempDetails(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    }));
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  const relationshipOptions = [
    { value: 'Father', label: 'Father' },
    { value: 'Mother', label: 'Mother' },
    { value: 'Guardian', label: 'Guardian' },
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Other', label: 'Other' },
  ];

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
              <h1 className="text-xl font-bold text-gray-900">Your Profile</h1>
              <p className="text-sm text-gray-600">Manage your personal information</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancel}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Profile Picture Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              {isEditing && (
                <button
                  onClick={() => setShowImageUpload(true)}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{userDetails.name}</h2>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <GraduationCap className="w-4 h-4" />
                <span>{userDetails.department}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Briefcase className="w-4 h-4" />
                <span>{userDetails.studentId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <ProfileSection title="Personal Information" icon={<User className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              value={isEditing ? tempDetails.name : userDetails.name}
              onChange={(value) => updateField('name', value)}
              placeholder="Enter your full name"
              disabled={!isEditing}
              required
              icon={<User className="w-4 h-4" />}
            />
            
            <SelectField
              label="Gender"
              value={isEditing ? tempDetails.gender : userDetails.gender}
              onChange={(value) => updateField('gender', value)}
              options={genderOptions}
              disabled={!isEditing}
              required
              icon={<User className="w-4 h-4" />}
            />
            
            <InputField
              label="Date of Birth"
              value={isEditing ? tempDetails.dob : userDetails.dob}
              onChange={(value) => updateField('dob', value)}
              placeholder="YYYY-MM-DD"
              disabled={!isEditing}
              type="date"
              required
              icon={<Calendar className="w-4 h-4" />}
            />
            
            <SelectField
              label="Blood Group"
              value={isEditing ? tempDetails.bloodGroup || '' : userDetails.bloodGroup || ''}
              onChange={(value) => updateField('bloodGroup', value)}
              options={bloodGroupOptions}
              disabled={!isEditing}
              icon={<Heart className="w-4 h-4" />}
            />
          </div>
        </ProfileSection>

        {/* Contact Information */}
        <ProfileSection title="Contact Information" icon={<Phone className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Email Address"
              value={isEditing ? tempDetails.email : userDetails.email}
              onChange={(value) => updateField('email', value)}
              placeholder="your.email@example.com"
              disabled={!isEditing}
              type="email"
              required
              icon={<Mail className="w-4 h-4" />}
            />
            
            <InputField
              label="Mobile Number"
              value={isEditing ? tempDetails.mobile : userDetails.mobile}
              onChange={(value) => updateField('mobile', value)}
              placeholder="+91 9876543210"
              disabled={!isEditing}
              type="tel"
              required
              icon={<Phone className="w-4 h-4" />}
            />
            
            <div className="md:col-span-2">
              <InputField
                label="Address"
                value={isEditing ? tempDetails.address : userDetails.address}
                onChange={(value) => updateField('address', value)}
                placeholder="Enter your complete address"
                disabled={!isEditing}
                required
                multiline
                icon={<MapPin className="w-4 h-4" />}
              />
            </div>
          </div>
        </ProfileSection>

        {/* Academic Information */}
        <ProfileSection title="Academic Information" icon={<GraduationCap className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Department"
              value={isEditing ? tempDetails.department || '' : userDetails.department || ''}
              onChange={(value) => updateField('department', value)}
              placeholder="Computer Science"
              disabled={!isEditing}
              icon={<GraduationCap className="w-4 h-4" />}
            />
            
            <InputField
              label="Student ID"
              value={isEditing ? tempDetails.studentId || '' : userDetails.studentId || ''}
              onChange={(value) => updateField('studentId', value)}
              placeholder="CS2021001"
              disabled={!isEditing}
              icon={<Briefcase className="w-4 h-4" />}
            />
            
            <InputField
              label="Year of Study"
              value={isEditing ? tempDetails.year || '' : userDetails.year || ''}
              onChange={(value) => updateField('year', value)}
              placeholder="3rd Year"
              disabled={!isEditing}
              icon={<Calendar className="w-4 h-4" />}
            />
          </div>
        </ProfileSection>

        {/* Emergency Contact */}
        <ProfileSection title="Emergency Contact" icon={<AlertCircle className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Contact Name"
              value={isEditing ? tempDetails.emergencyContact.name : userDetails.emergencyContact.name}
              onChange={(value) => updateEmergencyContact('name', value)}
              placeholder="Enter contact name"
              disabled={!isEditing}
              required
              icon={<User className="w-4 h-4" />}
            />
            
            <SelectField
              label="Relationship"
              value={isEditing ? tempDetails.emergencyContact.relationship : userDetails.emergencyContact.relationship}
              onChange={(value) => updateEmergencyContact('relationship', value)}
              options={relationshipOptions}
              disabled={!isEditing}
              required
              icon={<Heart className="w-4 h-4" />}
            />
            
            <InputField
              label="Contact Phone"
              value={isEditing ? tempDetails.emergencyContact.phone : userDetails.emergencyContact.phone}
              onChange={(value) => updateEmergencyContact('phone', value)}
              placeholder="+91 9876543210"
              disabled={!isEditing}
              type="tel"
              required
              icon={<Phone className="w-4 h-4" />}
            />
          </div>
        </ProfileSection>

        {/* Privacy Settings */}
        <ProfileSection title="Privacy Settings" icon={<Shield className="w-5 h-5" />}>
          <div className="space-y-4">
            {Object.entries(tempDetails.preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {key === 'isProfilePublic' && 'Allow others to view your profile'}
                    {key === 'allowNotifications' && 'Receive notifications from the app'}
                    {key === 'shareLocationData' && 'Share location data for better service'}
                  </p>
                </div>
                <button
                  onClick={() => updatePreferences(key as keyof UserDetails['preferences'], !value)}
                  disabled={!isEditing}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-blue-600' : 'bg-gray-300'
                  } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </ProfileSection>
      </div>

      {/* Image Upload Modal */}
      <AnimatePresence>
        {showImageUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowImageUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Upload className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Upload Profile Picture</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Choose a profile picture to personalize your account.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success('Profile picture updated!');
                    setShowImageUpload(false);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Upload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default YourProfile; 