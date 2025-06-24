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
  Briefcase,
  Shield,
  Car,
  Award,
  Star,
  Clock,
  Route,
  Users,
  Fuel,
  Settings,
  FileText,
  AlertCircle,
  Upload,
  TrendingUp,
  Badge,
  Wrench,
  CreditCard,
  Share2,
  Download
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Driver profile interface
interface DriverProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  licenseNumber: string;
  licenseExpiry: string;
  joinDate: string;
  employeeId: string;
  bloodGroup: string;
  avatar?: string;
  
  // Vehicle Information
  vehicle: {
    registrationNumber: string;
    model: string;
    capacity: number;
    fuelType: 'Diesel' | 'Petrol' | 'CNG' | 'Electric';
    yearOfManufacture: string;
    lastServiceDate: string;
    nextServiceDue: string;
    insuranceExpiry: string;
    pucExpiry: string;
  };
  
  // Performance Metrics
  performance: {
    totalTrips: number;
    totalDistance: number;
    averageRating: number;
    onTimePercentage: number;
    fuelEfficiency: number;
    accidentCount: number;
    complaintCount: number;
    totalExperience: number; // in years
  };
  
  // Assigned Routes
  assignedRoutes: Array<{
    id: string;
    routeNumber: string;
    routeName: string;
    startLocation: string;
    endLocation: string;
    totalStops: number;
    estimatedDuration: string;
    status: 'active' | 'inactive';
  }>;
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  
  // Preferences
  preferences: {
    notifications: boolean;
    locationSharing: boolean;
    autoAcceptTrips: boolean;
  };
}

// Mock driver data
const mockDriverProfile: DriverProfile = {
  id: 'drv_001',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@traventtms.com',
  phone: '+91 9876543210',
  address: '456 Driver Colony, Erode, Tamil Nadu 638002',
  dateOfBirth: '1985-03-20',
  licenseNumber: 'TN2234567890',
  licenseExpiry: '2027-03-20',
  joinDate: '2020-01-15',
  employeeId: 'EMP001',
  bloodGroup: 'B+',
  
  vehicle: {
    registrationNumber: 'TN 43 AB 1234',
    model: 'Tata Ultra 1518',
    capacity: 45,
    fuelType: 'Diesel',
    yearOfManufacture: '2022',
    lastServiceDate: '2024-01-10',
    nextServiceDue: '2024-04-10',
    insuranceExpiry: '2024-12-31',
    pucExpiry: '2024-06-15'
  },
  
  performance: {
    totalTrips: 1247,
    totalDistance: 45670,
    averageRating: 4.7,
    onTimePercentage: 94.5,
    fuelEfficiency: 8.5,
    accidentCount: 0,
    complaintCount: 2,
    totalExperience: 12
  },
  
  assignedRoutes: [
    {
      id: 'rt_001',
      routeNumber: 'Route 12',
      routeName: 'College to Erode Central',
      startLocation: 'College Campus',
      endLocation: 'Erode Central Bus Stand',
      totalStops: 15,
      estimatedDuration: '45 minutes',
      status: 'active'
    },
    {
      id: 'rt_002',
      routeNumber: 'Route 8',
      routeName: 'College to Railway Station',
      startLocation: 'College Campus',
      endLocation: 'Erode Junction',
      totalStops: 12,
      estimatedDuration: '35 minutes',
      status: 'active'
    }
  ],
  
  emergencyContact: {
    name: 'Lakshmi Kumar',
    relationship: 'Spouse',
    phone: '+91 9876543211'
  },
  
  preferences: {
    notifications: true,
    locationSharing: true,
    autoAcceptTrips: false
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
}> = ({ label, value, onChange, placeholder, disabled = false, required = false, type = 'text', icon }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
        {icon && <span className="text-gray-500">{icon}</span>}
        <span>{label} {required && <span className="text-red-500">*</span>}</span>
      </label>
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
    </div>
  );
};

// Select field component
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
        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
};

// Performance card component
const PerformanceCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
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
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center`}>
          {icon}
        </div>
        {trend && (
          <TrendingUp className={`w-4 h-4 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400'}`} />
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
      {subValue && (
        <p className="text-xs text-gray-500 mt-1">{subValue}</p>
      )}
    </div>
  );
};

// Route card component
const RouteCard: React.FC<{
  route: DriverProfile['assignedRoutes'][0];
}> = ({ route }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{route.routeNumber}</h4>
            <p className="text-sm text-gray-600">{route.routeName}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          route.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {route.status}
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Route:</span>
          <span>{route.startLocation} → {route.endLocation}</span>
        </div>
        <div className="flex justify-between">
          <span>Stops:</span>
          <span>{route.totalStops} stops</span>
        </div>
        <div className="flex justify-between">
          <span>Duration:</span>
          <span>{route.estimatedDuration}</span>
        </div>
      </div>
    </div>
  );
};

// Main component
const DriverProfile: React.FC = () => {
  const router = useRouter();
  const [driverProfile, setDriverProfile] = useState<DriverProfile>(mockDriverProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tempProfile, setTempProfile] = useState<DriverProfile>(mockDriverProfile);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('driverProfile');
    if (storedProfile) {
      try {
        const parsed = { ...mockDriverProfile, ...JSON.parse(storedProfile) };
        setDriverProfile(parsed);
        setTempProfile(parsed);
      } catch (error) {
        console.error('Error parsing driver profile:', error);
      }
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile({ ...driverProfile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile({ ...driverProfile });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDriverProfile({ ...tempProfile });
      localStorage.setItem('driverProfile', JSON.stringify(tempProfile));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof DriverProfile, value: any) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  const updateVehicle = (field: keyof DriverProfile['vehicle'], value: string) => {
    setTempProfile(prev => ({
      ...prev,
      vehicle: { ...prev.vehicle, [field]: value }
    }));
  };

  const updateEmergencyContact = (field: keyof DriverProfile['emergencyContact'], value: string) => {
    setTempProfile(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value }
    }));
  };

  const fuelTypeOptions = [
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Petrol', label: 'Petrol' },
    { value: 'CNG', label: 'CNG' },
    { value: 'Electric', label: 'Electric' },
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
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Father', label: 'Father' },
    { value: 'Mother', label: 'Mother' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Child', label: 'Child' },
    { value: 'Other', label: 'Other' },
  ];

  const handleDownload = (type: string) => {
    setShowDownloadModal(false);
    
    const documents = {
      'driver-certificate': () => generateDriverCertificate(),
      'vehicle-report': () => generateVehicleReport(),
      'performance-summary': () => generatePerformanceSummary(),
      'route-assignments': () => generateRouteAssignments()
    };

    if (documents[type as keyof typeof documents]) {
      documents[type as keyof typeof documents]();
    }
  };

  const generateDriverCertificate = () => {
    const certificateData = `
TRAVENT TMS - DRIVER CERTIFICATE
================================
Certificate Number: DC${Date.now()}
Issue Date: ${new Date().toLocaleDateString('en-GB')}

DRIVER INFORMATION
------------------
Name: ${driverProfile.name}
Employee ID: ${driverProfile.employeeId}
License Number: ${driverProfile.licenseNumber}
License Expiry: ${new Date(driverProfile.licenseExpiry).toLocaleDateString('en-GB')}
Experience: ${driverProfile.performance.totalExperience} years

PERFORMANCE RECORD
------------------
Total Trips: ${driverProfile.performance.totalTrips}
Total Distance: ${driverProfile.performance.totalDistance} km
Average Rating: ${driverProfile.performance.averageRating}/5.0
On-time Performance: ${driverProfile.performance.onTimePercentage}%
Safety Record: ${driverProfile.performance.accidentCount} accidents

CERTIFICATION
-------------
This certifies that the above-named driver is authorized
to operate transportation vehicles under Travent TMS.

Valid until: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}

Issued by: Travent TMS
Contact: fleet@traventtms.com
    `;
    
    downloadTextFile(certificateData, `driver-certificate-${Date.now()}.txt`);
    toast.success('Driver Certificate downloaded successfully!');
  };

  const generateVehicleReport = () => {
    const reportData = `
TRAVENT TMS - VEHICLE REPORT
===========================
Report Date: ${new Date().toLocaleDateString('en-GB')}
Driver: ${driverProfile.name}

VEHICLE DETAILS
---------------
Registration: ${driverProfile.vehicle.registrationNumber}
Model: ${driverProfile.vehicle.model}
Year: ${driverProfile.vehicle.yearOfManufacture}
Capacity: ${driverProfile.vehicle.capacity} passengers
Fuel Type: ${driverProfile.vehicle.fuelType}

MAINTENANCE RECORD
------------------
Last Service: ${new Date(driverProfile.vehicle.lastServiceDate).toLocaleDateString('en-GB')}
Next Service Due: ${new Date(driverProfile.vehicle.nextServiceDue).toLocaleDateString('en-GB')}
Insurance Expiry: ${new Date(driverProfile.vehicle.insuranceExpiry).toLocaleDateString('en-GB')}

PERFORMANCE METRICS
-------------------
Fuel Efficiency: ${driverProfile.performance.fuelEfficiency} km/l
Total Distance: ${driverProfile.performance.totalDistance} km
Trips Completed: ${driverProfile.performance.totalTrips}

Generated by: Travent TMS
Contact: fleet@traventtms.com
    `;
    
    downloadTextFile(reportData, `vehicle-report-${Date.now()}.txt`);
    toast.success('Vehicle Report downloaded successfully!');
  };

  const generatePerformanceSummary = () => {
    const summaryData = `
TRAVENT TMS - PERFORMANCE SUMMARY
=================================
Driver: ${driverProfile.name}
Employee ID: ${driverProfile.employeeId}
Report Period: Last 30 Days
Generated: ${new Date().toLocaleDateString('en-GB')}

OVERALL PERFORMANCE
-------------------
Total Trips: ${driverProfile.performance.totalTrips}
Total Distance: ${driverProfile.performance.totalDistance} km
Average Rating: ${driverProfile.performance.averageRating}/5.0
On-time Performance: ${driverProfile.performance.onTimePercentage}%

SAFETY RECORD
-------------
Accidents: ${driverProfile.performance.accidentCount}
Complaints: ${driverProfile.performance.complaintCount}
Safety Score: Excellent

EFFICIENCY METRICS
------------------
Fuel Efficiency: ${driverProfile.performance.fuelEfficiency} km/l
Route Completion Rate: 99.2%
Passenger Satisfaction: 4.7/5.0

ASSIGNED ROUTES
---------------
${driverProfile.assignedRoutes.map(route => 
  `${route.routeNumber}: ${route.routeName} (${route.status})`
).join('\n')}

Generated by: Travent TMS
Contact: fleet@traventtms.com
    `;
    
    downloadTextFile(summaryData, `performance-summary-${Date.now()}.txt`);
    toast.success('Performance Summary downloaded successfully!');
  };

  const generateRouteAssignments = () => {
    const assignmentData = `
TRAVENT TMS - ROUTE ASSIGNMENTS
===============================
Driver: ${driverProfile.name}
Employee ID: ${driverProfile.employeeId}
Valid From: ${new Date().toLocaleDateString('en-GB')}

ASSIGNED ROUTES
---------------
${driverProfile.assignedRoutes.map(route => `
Route: ${route.routeNumber}
Name: ${route.routeName}
From: ${route.startLocation}
To: ${route.endLocation}
Stops: ${route.totalStops}
Duration: ${route.estimatedDuration}
Status: ${route.status}
`).join('\n')}

DRIVER RESPONSIBILITIES
-----------------------
- Maintain punctuality and follow schedule
- Ensure passenger safety and comfort
- Report any vehicle issues immediately
- Follow all traffic regulations
- Maintain professional behavior

CONTACT INFORMATION
-------------------
Fleet Manager: fleet@traventtms.com
Emergency Contact: +91 9876543210
Support: support@traventtms.com

Generated by: Travent TMS
    `;
    
    downloadTextFile(assignmentData, `route-assignments-${Date.now()}.txt`);
    toast.success('Route Assignments downloaded successfully!');
  };

  const downloadTextFile = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async (platform: string) => {
    setShowShareModal(false);
    
    const shareData = {
      title: 'Travent TMS - Transportation Management System',
      text: 'Join our professional driver network at Travent TMS! 🚌',
      url: 'https://traventtms.com/drivers'
    };

    try {
      if (platform === 'native' && navigator.share) {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        const shareUrls = {
          whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`,
          telegram: `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`,
          twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
          email: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(`${shareData.text}\n\n${shareData.url}`)}`
        };

        if (shareUrls[platform as keyof typeof shareUrls]) {
          window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
          toast.success('Opening share dialog...');
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="lg:hidden h-16" />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Driver Profile</h1>
              <p className="text-sm text-gray-600">Manage your driver information</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              {isEditing && (
                <button
                  onClick={() => setShowImageUpload(true)}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{driverProfile.name}</h2>
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Driver
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Badge className="w-4 h-4" />
                  <span>Employee ID: {driverProfile.employeeId}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined: {new Date(driverProfile.joinDate).toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>License: {driverProfile.licenseNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Experience: {driverProfile.performance.totalExperience} years</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <PerformanceCard
              icon={<Route className="w-5 h-5" />}
              label="Total Trips"
              value={driverProfile.performance.totalTrips.toLocaleString()}
              color="blue"
              trend="up"
            />
            <PerformanceCard
              icon={<MapPin className="w-5 h-5" />}
              label="Distance (km)"
              value={driverProfile.performance.totalDistance.toLocaleString()}
              color="green"
              trend="up"
            />
            <PerformanceCard
              icon={<Star className="w-5 h-5" />}
              label="Rating"
              value={driverProfile.performance.averageRating.toFixed(1)}
              subValue="⭐⭐⭐⭐⭐"
              color="yellow"
              trend="stable"
            />
            <PerformanceCard
              icon={<Clock className="w-5 h-5" />}
              label="On-time %"
              value={`${driverProfile.performance.onTimePercentage}%`}
              color="purple"
              trend="up"
            />
            <PerformanceCard
              icon={<Fuel className="w-5 h-5" />}
              label="Fuel Efficiency"
              value={`${driverProfile.performance.fuelEfficiency} km/l`}
              color="orange"
              trend="stable"
            />
            <PerformanceCard
              icon={<Shield className="w-5 h-5" />}
              label="Safety Score"
              value="Excellent"
              subValue={`${driverProfile.performance.accidentCount} accidents`}
              color="green"
              trend="stable"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDownloadModal(true)}
              className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-2">
                <Download className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">Download Reports</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowShareModal(true)}
              className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">Share Profile</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toast.success('Vehicle inspection scheduled')}
              className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">Schedule Service</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toast.success('Emergency contact alerted')}
              className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-2">
                <AlertCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">Emergency Alert</span>
            </motion.button>
          </div>
        </div>

        {/* Personal Information */}
        <ProfileSection title="Personal Information" icon={<User className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              value={isEditing ? tempProfile.name : driverProfile.name}
              onChange={(value) => updateField('name', value)}
              placeholder="Enter your full name"
              disabled={!isEditing}
              required
              icon={<User className="w-4 h-4" />}
            />
            
            <InputField
              label="Employee ID"
              value={isEditing ? tempProfile.employeeId : driverProfile.employeeId}
              onChange={(value) => updateField('employeeId', value)}
              placeholder="EMP001"
              disabled={!isEditing}
              required
              icon={<Badge className="w-4 h-4" />}
            />
            
            <InputField
              label="Date of Birth"
              value={isEditing ? tempProfile.dateOfBirth : driverProfile.dateOfBirth}
              onChange={(value) => updateField('dateOfBirth', value)}
              placeholder="YYYY-MM-DD"
              disabled={!isEditing}
              type="date"
              required
              icon={<Calendar className="w-4 h-4" />}
            />
            
            <SelectField
              label="Blood Group"
              value={isEditing ? tempProfile.bloodGroup : driverProfile.bloodGroup}
              onChange={(value) => updateField('bloodGroup', value)}
              options={bloodGroupOptions}
              disabled={!isEditing}
              icon={<CreditCard className="w-4 h-4" />}
            />
          </div>
        </ProfileSection>

        {/* Contact Information */}
        <ProfileSection title="Contact Information" icon={<Phone className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Email Address"
              value={isEditing ? tempProfile.email : driverProfile.email}
              onChange={(value) => updateField('email', value)}
              placeholder="your.email@example.com"
              disabled={!isEditing}
              type="email"
              required
              icon={<Mail className="w-4 h-4" />}
            />
            
            <InputField
              label="Phone Number"
              value={isEditing ? tempProfile.phone : driverProfile.phone}
              onChange={(value) => updateField('phone', value)}
              placeholder="+91 9876543210"
              disabled={!isEditing}
              type="tel"
              required
              icon={<Phone className="w-4 h-4" />}
            />
            
            <div className="md:col-span-2">
              <InputField
                label="Address"
                value={isEditing ? tempProfile.address : driverProfile.address}
                onChange={(value) => updateField('address', value)}
                placeholder="Enter your complete address"
                disabled={!isEditing}
                required
                icon={<MapPin className="w-4 h-4" />}
              />
            </div>
          </div>
        </ProfileSection>

        {/* License Information */}
        <ProfileSection title="License Information" icon={<FileText className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="License Number"
              value={isEditing ? tempProfile.licenseNumber : driverProfile.licenseNumber}
              onChange={(value) => updateField('licenseNumber', value)}
              placeholder="TN2234567890"
              disabled={!isEditing}
              required
              icon={<FileText className="w-4 h-4" />}
            />
            
            <InputField
              label="License Expiry"
              value={isEditing ? tempProfile.licenseExpiry : driverProfile.licenseExpiry}
              onChange={(value) => updateField('licenseExpiry', value)}
              placeholder="YYYY-MM-DD"
              disabled={!isEditing}
              type="date"
              required
              icon={<Calendar className="w-4 h-4" />}
            />
          </div>
        </ProfileSection>

        {/* Vehicle Information */}
        <ProfileSection title="Vehicle Information" icon={<Car className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Registration Number"
              value={isEditing ? tempProfile.vehicle.registrationNumber : driverProfile.vehicle.registrationNumber}
              onChange={(value) => updateVehicle('registrationNumber', value)}
              placeholder="TN 43 AB 1234"
              disabled={!isEditing}
              required
              icon={<Car className="w-4 h-4" />}
            />
            
            <InputField
              label="Vehicle Model"
              value={isEditing ? tempProfile.vehicle.model : driverProfile.vehicle.model}
              onChange={(value) => updateVehicle('model', value)}
              placeholder="Tata Ultra 1518"
              disabled={!isEditing}
              required
              icon={<Car className="w-4 h-4" />}
            />
            
            <InputField
              label="Seating Capacity"
              value={isEditing ? tempProfile.vehicle.capacity.toString() : driverProfile.vehicle.capacity.toString()}
              onChange={(value) => updateVehicle('capacity', value)}
              placeholder="45"
              disabled={!isEditing}
              type="number"
              required
              icon={<Users className="w-4 h-4" />}
            />
            
            <SelectField
              label="Fuel Type"
              value={isEditing ? tempProfile.vehicle.fuelType : driverProfile.vehicle.fuelType}
              onChange={(value) => updateVehicle('fuelType', value)}
              options={fuelTypeOptions}
              disabled={!isEditing}
              required
              icon={<Fuel className="w-4 h-4" />}
            />
            
            <InputField
              label="Year of Manufacture"
              value={isEditing ? tempProfile.vehicle.yearOfManufacture : driverProfile.vehicle.yearOfManufacture}
              onChange={(value) => updateVehicle('yearOfManufacture', value)}
              placeholder="2022"
              disabled={!isEditing}
              required
              icon={<Calendar className="w-4 h-4" />}
            />
            
            <InputField
              label="Last Service Date"
              value={isEditing ? tempProfile.vehicle.lastServiceDate : driverProfile.vehicle.lastServiceDate}
              onChange={(value) => updateVehicle('lastServiceDate', value)}
              placeholder="YYYY-MM-DD"
              disabled={!isEditing}
              type="date"
              icon={<Wrench className="w-4 h-4" />}
            />
            
            <InputField
              label="Next Service Due"
              value={isEditing ? tempProfile.vehicle.nextServiceDue : driverProfile.vehicle.nextServiceDue}
              onChange={(value) => updateVehicle('nextServiceDue', value)}
              placeholder="YYYY-MM-DD"
              disabled={!isEditing}
              type="date"
              icon={<Wrench className="w-4 h-4" />}
            />
            
            <InputField
              label="Insurance Expiry"
              value={isEditing ? tempProfile.vehicle.insuranceExpiry : driverProfile.vehicle.insuranceExpiry}
              onChange={(value) => updateVehicle('insuranceExpiry', value)}
              placeholder="YYYY-MM-DD"
              disabled={!isEditing}
              type="date"
              icon={<Shield className="w-4 h-4" />}
            />
          </div>
        </ProfileSection>

        {/* Assigned Routes */}
        <ProfileSection title="Assigned Routes" icon={<Route className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {driverProfile.assignedRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </ProfileSection>

        {/* Emergency Contact */}
        <ProfileSection title="Emergency Contact" icon={<AlertCircle className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Contact Name"
              value={isEditing ? tempProfile.emergencyContact.name : driverProfile.emergencyContact.name}
              onChange={(value) => updateEmergencyContact('name', value)}
              placeholder="Enter contact name"
              disabled={!isEditing}
              required
              icon={<User className="w-4 h-4" />}
            />
            
            <SelectField
              label="Relationship"
              value={isEditing ? tempProfile.emergencyContact.relationship : driverProfile.emergencyContact.relationship}
              onChange={(value) => updateEmergencyContact('relationship', value)}
              options={relationshipOptions}
              disabled={!isEditing}
              required
              icon={<Users className="w-4 h-4" />}
            />
            
            <InputField
              label="Contact Phone"
              value={isEditing ? tempProfile.emergencyContact.phone : driverProfile.emergencyContact.phone}
              onChange={(value) => updateEmergencyContact('phone', value)}
              placeholder="+91 9876543210"
              disabled={!isEditing}
              type="tel"
              required
              icon={<Phone className="w-4 h-4" />}
            />
          </div>
        </ProfileSection>
      </div>

      {/* Download Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowDownloadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Download Driver Reports</h3>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleDownload('driver-certificate')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <Award className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Driver Certificate</p>
                    <p className="text-sm text-gray-600">Official driver certification document</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleDownload('vehicle-report')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <Car className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Vehicle Report</p>
                    <p className="text-sm text-gray-600">Complete vehicle information and maintenance</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleDownload('performance-summary')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Performance Summary</p>
                    <p className="text-sm text-gray-600">Detailed performance metrics and ratings</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleDownload('route-assignments')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <Route className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900">Route Assignments</p>
                    <p className="text-sm text-gray-600">Current route assignments and responsibilities</p>
                  </div>
                </button>
              </div>
              
              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Share2 className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Share Driver Profile</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Share your professional driver profile and connect with the transportation community!
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center space-x-2 p-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">📱</span>
                  <span className="font-medium">WhatsApp</span>
                </button>
                
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center space-x-2 p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">💼</span>
                  <span className="font-medium">LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleShare('telegram')}
                  className="flex items-center space-x-2 p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">✈️</span>
                  <span className="font-medium">Telegram</span>
                </button>
                
                <button
                  onClick={() => handleShare('email')}
                  className="flex items-center space-x-2 p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">📧</span>
                  <span className="font-medium">Email</span>
                </button>
              </div>
              
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={() => handleShare('native')}
                  className="w-full mb-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Share via Device
                </button>
              )}
              
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <div className="p-2 bg-green-100 rounded-lg">
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Upload Profile Picture</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Choose a professional profile picture for your driver account.
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
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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

export default DriverProfile; 