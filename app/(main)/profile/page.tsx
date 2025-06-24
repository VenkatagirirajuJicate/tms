'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  FileText, 
  Bell, 
  Star, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Edit3,
  Camera,
  Settings,
  Shield,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  Bus,
  CreditCard,
  Download,
  Eye,
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  Share2,
  MoreVertical,
  Save
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Enhanced user data interface
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  userType: 'student' | 'driver' | 'staff';
  department?: string;
  studentId?: string;
  driverLicense?: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  stats: {
    totalTrips: number;
    totalDistance: number;
    avgRating: number;
    completedPayments: number;
    activeRoutes: number;
    grievancesSubmitted: number;
  };
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    smsAlerts: boolean;
    darkMode: boolean;
  };
  recentActivity: Array<{
    id: string;
    type: 'trip' | 'payment' | 'rating' | 'grievance';
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
  }>;
}

// Mock user data with comprehensive information
const mockUserProfile: UserProfile = {
  id: 'usr_001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 9876543210',
  userType: 'student',
  department: 'Computer Science',
  studentId: 'CS2021001',
  joinDate: '2024-01-15',
  status: 'active',
  stats: {
    totalTrips: 247,
    totalDistance: 12840,
    avgRating: 4.8,
    completedPayments: 12,
    activeRoutes: 3,
    grievancesSubmitted: 2
  },
  preferences: {
    notifications: true,
    emailUpdates: true,
    smsAlerts: false,
    darkMode: false
  },
  recentActivity: [
    {
      id: 'act_001',
      type: 'trip',
      description: 'Completed trip on Route 12 to Erode Central',
      date: '2024-01-20T09:30:00',
      status: 'completed'
    },
    {
      id: 'act_002',
      type: 'payment',
      description: 'Semester fee payment of ₹2,500',
      date: '2024-01-19T14:15:00',
      status: 'completed'
    },
    {
      id: 'act_003',
      type: 'rating',
      description: 'Rated Route 8 service - 5 stars',
      date: '2024-01-18T16:45:00',
      status: 'completed'
    }
  ]
};

// Enhanced stat card component
const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}> = ({ icon, label, value, subValue, color, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    red: 'bg-red-100 text-red-600 border-red-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
    >
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
    </motion.div>
  );
};

// Quick action button component
const QuickAction: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}> = ({ icon, label, onClick, color = 'blue' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
    >
      <div className={`w-12 h-12 rounded-lg bg-${color}-100 text-${color}-600 flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </motion.button>
  );
};

// Recent activity item
const ActivityItem: React.FC<{
  activity: UserProfile['recentActivity'][0];
}> = ({ activity }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trip': return <Bus className="w-4 h-4" />;
      case 'payment': return <CreditCard className="w-4 h-4" />;
      case 'rating': return <Star className="w-4 h-4" />;
      case 'grievance': return <FileText className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
        <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString('en-GB')}</p>
      </div>
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
        {activity.status}
      </div>
    </div>
  );
};

// Main profile screen component
const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview');
  const [tempProfile, setTempProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load user profile from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        setUserProfile({ ...mockUserProfile, ...JSON.parse(storedProfile) });
      } catch (error) {
        console.error('Error parsing user profile:', error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      setShowLogoutModal(false);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setTempProfile({ ...userProfile });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempProfile({ ...userProfile });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUserProfile({ ...tempProfile });
      localStorage.setItem('userProfile', JSON.stringify(tempProfile));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const updateProfileField = (field: keyof UserProfile, value: any) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleDownload = (type: string) => {
    setShowDownloadModal(false);
    
    // Generate different types of documents
    const documents = {
      'e-receipt': () => generateEReceipt(),
      'travel-pass': () => generateTravelPass(),
      'profile-summary': () => generateProfileSummary(),
      'activity-report': () => generateActivityReport()
    };

    if (documents[type as keyof typeof documents]) {
      documents[type as keyof typeof documents]();
    }
  };

  const generateEReceipt = () => {
    const receiptData = `
TRAVENT TMS - E-RECEIPT
======================
Receipt Number: RCP${Date.now()}
Date: ${new Date().toLocaleDateString('en-GB')}
Student: ${userProfile.name}
Email: ${userProfile.email}
Department: ${userProfile.department}

PAYMENT DETAILS
---------------
Semester Fee: Rs. 2,500
Service Fee: Rs. 50
Total Amount: Rs. 2,550

Payment Status: COMPLETED
Payment Method: UPI
Transaction ID: TXN${Date.now()}

Thank you for using Travent TMS!
Contact: support@traventtms.com
    `;
    
    downloadTextFile(receiptData, `e-receipt-${Date.now()}.txt`);
    toast.success('E-Receipt downloaded successfully!');
  };

  const generateTravelPass = () => {
    const passData = `
TRAVENT TMS - TRAVEL PASS
========================
Pass Number: TP${Date.now()}
Valid From: ${new Date().toLocaleDateString('en-GB')}
Valid Until: ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}

STUDENT DETAILS
---------------
Name: ${userProfile.name}
Student ID: ${userProfile.studentId}
Department: ${userProfile.department}
Contact: ${userProfile.phone}

ROUTE ACCESS
------------
Route 12: College to Erode Central
Route 8: College to Railway Station
Route 15: College to Bus Stand

This pass is valid for 90 days from issue date.
Please carry this pass during travel.

Issued by: Travent TMS
Contact: support@traventtms.com
    `;
    
    downloadTextFile(passData, `travel-pass-${Date.now()}.txt`);
    toast.success('Travel Pass downloaded successfully!');
  };

  const generateProfileSummary = () => {
    const summaryData = `
TRAVENT TMS - PROFILE SUMMARY
============================
Generated on: ${new Date().toLocaleDateString('en-GB')}

PERSONAL INFORMATION
--------------------
Name: ${userProfile.name}
Email: ${userProfile.email}
Phone: ${userProfile.phone}
Department: ${userProfile.department}
Student ID: ${userProfile.studentId}
Join Date: ${userProfile.joinDate}
Status: ${userProfile.status}

ACTIVITY STATISTICS
-------------------
Total Trips: ${userProfile.stats.totalTrips}
Total Distance: ${userProfile.stats.totalDistance} km
Average Rating: ${userProfile.stats.avgRating}/5.0
Completed Payments: ${userProfile.stats.completedPayments}
Active Routes: ${userProfile.stats.activeRoutes}
Grievances Submitted: ${userProfile.stats.grievancesSubmitted}

PREFERENCES
-----------
Notifications: ${userProfile.preferences.notifications ? 'Enabled' : 'Disabled'}
Email Updates: ${userProfile.preferences.emailUpdates ? 'Enabled' : 'Disabled'}
SMS Alerts: ${userProfile.preferences.smsAlerts ? 'Enabled' : 'Disabled'}
Dark Mode: ${userProfile.preferences.darkMode ? 'Enabled' : 'Disabled'}

Generated by: Travent TMS
Contact: support@traventtms.com
    `;
    
    downloadTextFile(summaryData, `profile-summary-${Date.now()}.txt`);
    toast.success('Profile Summary downloaded successfully!');
  };

  const generateActivityReport = () => {
    const reportData = `
TRAVENT TMS - ACTIVITY REPORT
============================
Report Period: Last 30 Days
Generated on: ${new Date().toLocaleDateString('en-GB')}
Student: ${userProfile.name}

RECENT ACTIVITIES
-----------------
${userProfile.recentActivity.map(activity => 
  `${new Date(activity.date).toLocaleDateString('en-GB')} - ${activity.description} (${activity.status})`
).join('\n')}

SUMMARY STATISTICS
------------------
Total Activities: ${userProfile.recentActivity.length}
Completed: ${userProfile.recentActivity.filter(a => a.status === 'completed').length}
Pending: ${userProfile.recentActivity.filter(a => a.status === 'pending').length}

PERFORMANCE METRICS
-------------------
Trip Completion Rate: 98.5%
Average Rating Given: 4.6/5.0
On-time Performance: 94.2%

Generated by: Travent TMS
Contact: support@traventtms.com
    `;
    
    downloadTextFile(reportData, `activity-report-${Date.now()}.txt`);
    toast.success('Activity Report downloaded successfully!');
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
      text: 'Join me on Travent TMS for easy campus transportation! 🚌',
      url: 'https://traventtms.com'
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateProfileField('avatar', imageUrl);
        toast.success('Profile picture updated!');
        setShowImageUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const quickActions = [
    { icon: <Edit3 className="w-6 h-6" />, label: 'Edit Profile', onClick: () => router.push('/your-profile'), color: 'blue' },
    { icon: <FileText className="w-6 h-6" />, label: 'Grievances', onClick: () => router.push('/grievances'), color: 'orange' },
    { icon: <Star className="w-6 h-6" />, label: 'Rate Service', onClick: () => router.push('/rating'), color: 'yellow' },
    { icon: <Bell className="w-6 h-6" />, label: 'Notifications', onClick: () => router.push('/notification-control'), color: 'purple' },
    { icon: <Download className="w-6 h-6" />, label: 'Download', onClick: () => setShowDownloadModal(true), color: 'green' },
    { icon: <Share2 className="w-6 h-6" />, label: 'Share App', onClick: () => setShowShareModal(true), color: 'pink' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="lg:hidden h-16" />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <button
              onClick={() => router.back()}
              className="text-gray-700 hover:text-blue-600 transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Profile</h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Manage your account and preferences</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setShowEditProfile(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 px-4 pb-4">
          {[
            { key: 'overview', label: 'Overview', icon: User },
            { key: 'activity', label: 'Activity', icon: Clock },
            { key: 'settings', label: 'Settings', icon: Settings }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Profile Header Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                    <div className="relative">
                      {(isEditing ? tempProfile.avatar : userProfile.avatar) ? (
                        <img
                          src={isEditing ? tempProfile.avatar : userProfile.avatar}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-10 h-10 text-white" />
                        </div>
                      )}
                      {isEditing && (
                        <button 
                          onClick={() => setShowImageUpload(true)}
                          className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        >
                          <Camera className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={tempProfile.name}
                            onChange={(e) => updateProfileField('name', e.target.value)}
                            className="text-xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                          />
                        ) : (
                          <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
                        )}
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userProfile.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {userProfile.status}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {isEditing ? (
                            <input
                              type="email"
                              value={tempProfile.email}
                              onChange={(e) => updateProfileField('email', e.target.value)}
                              className="bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900"
                            />
                          ) : (
                            <span>{userProfile.email}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {isEditing ? (
                            <input
                              type="tel"
                              value={tempProfile.phone}
                              onChange={(e) => updateProfileField('phone', e.target.value)}
                              className="bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900"
                            />
                          ) : (
                            <span>{userProfile.phone}</span>
                          )}
                        </div>
                        {userProfile.department && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <GraduationCap className="w-4 h-4" />
                            {isEditing ? (
                              <input
                                type="text"
                                value={tempProfile.department || ''}
                                onChange={(e) => updateProfileField('department', e.target.value)}
                                className="bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900"
                              />
                            ) : (
                              <span>{userProfile.department}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 sm:space-y-0 space-y-2 min-w-0">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base whitespace-nowrap"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base whitespace-nowrap"
                          >
                            {isSaving ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            <span>{isSaving ? 'Saving...' : 'Save'}</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleEditProfile}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base whitespace-nowrap"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span className="hidden xs:inline sm:inline">Edit Profile</span>
                          <span className="xs:hidden sm:hidden">Edit</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <StatCard
                    icon={<Bus className="w-5 h-5" />}
                    label="Total Trips"
                    value={userProfile.stats.totalTrips}
                    color="blue"
                    trend="up"
                  />
                  <StatCard
                    icon={<MapPin className="w-5 h-5" />}
                    label="Distance (km)"
                    value={userProfile.stats.totalDistance.toLocaleString()}
                    color="green"
                    trend="up"
                  />
                  <StatCard
                    icon={<Star className="w-5 h-5" />}
                    label="Avg Rating"
                    value={userProfile.stats.avgRating.toFixed(1)}
                    subValue="⭐⭐⭐⭐⭐"
                    color="yellow"
                    trend="stable"
                  />
                  <StatCard
                    icon={<CreditCard className="w-5 h-5" />}
                    label="Payments"
                    value={userProfile.stats.completedPayments}
                    color="purple"
                    trend="up"
                  />
                  <StatCard
                    icon={<Users className="w-5 h-5" />}
                    label="Active Routes"
                    value={userProfile.stats.activeRoutes}
                    color="orange"
                    trend="stable"
                  />
                  <StatCard
                    icon={<FileText className="w-5 h-5" />}
                    label="Grievances"
                    value={userProfile.stats.grievancesSubmitted}
                    color="red"
                    trend="down"
                  />
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {quickActions.map((action, index) => (
                      <QuickAction
                        key={index}
                        icon={action.icon}
                        label={action.label}
                        onClick={action.onClick}
                        color={action.color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {userProfile.recentActivity.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Preferences */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                  
                  <div className="space-y-4">
                    {Object.entries(userProfile.preferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {key === 'notifications' && 'Receive push notifications'}
                            {key === 'emailUpdates' && 'Get updates via email'}
                            {key === 'smsAlerts' && 'Receive SMS alerts'}
                            {key === 'darkMode' && 'Use dark theme'}
                          </p>
                        </div>
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
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
                </div>

                {/* Account Actions */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Privacy & Security</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Help & Support</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    
                    <button 
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <LogOut className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-red-600">Sign Out</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowLogoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Sign Out</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to sign out? You'll need to log in again to access your account.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <h3 className="text-lg font-semibold text-gray-900">Download Documents</h3>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleDownload('e-receipt')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">E-Receipt</p>
                    <p className="text-sm text-gray-600">Download your latest payment receipt</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleDownload('travel-pass')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <Bus className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Travel Pass</p>
                    <p className="text-sm text-gray-600">Download your valid travel pass</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleDownload('profile-summary')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <User className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Profile Summary</p>
                    <p className="text-sm text-gray-600">Complete profile information</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleDownload('activity-report')}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900">Activity Report</p>
                    <p className="text-sm text-gray-600">Last 30 days activity summary</p>
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
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Share2 className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Share Travent TMS</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Share Travent TMS with your friends and help them discover easy campus transportation!
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
                  onClick={() => handleShare('telegram')}
                  className="flex items-center space-x-2 p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">✈️</span>
                  <span className="font-medium">Telegram</span>
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center space-x-2 p-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">🐦</span>
                  <span className="font-medium">Twitter</span>
                </button>
                
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center space-x-2 p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">📘</span>
                  <span className="font-medium">Facebook</span>
                </button>
                
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center space-x-2 p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">💼</span>
                  <span className="font-medium">LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleShare('email')}
                  className="flex items-center space-x-2 p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">📧</span>
                  <span className="font-medium">Email</span>
                </button>
              </div>
              
              {navigator.share && (
                <button
                  onClick={() => handleShare('native')}
                  className="w-full mb-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Update Profile Picture</h3>
              </div>
              
              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <label className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer text-center">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
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

export default ProfileScreen; 