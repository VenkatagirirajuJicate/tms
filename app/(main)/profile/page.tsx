'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, FileText, Bell, Star, LogOut, ChevronLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Dummy user data
const dummyUserDetails = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  userType: 'student',
};

const ProfileOption = ({ 
  icon: Icon, 
  title, 
  onPress 
}: { 
  icon: any; 
  title: string; 
  onPress: () => void; 
}) => (
  <button
    onClick={onPress}
    className="flex flex-row items-center py-5 border-b border-[#353A40] w-full text-left hover:bg-white/5 transition-colors"
  >
    <Icon className="text-[#999] w-6 h-6" />
    <span className="text-white text-sm ml-4 flex-1">{title}</span>
    <ChevronLeft className="text-[#888] w-6 h-6 transform rotate-180" />
  </button>
);

const ProfileScreen = () => {
  const router = useRouter();
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const [userType, setUserType] = useState('student');
  const [userDetails, setUserDetails] = useState(dummyUserDetails);

  useEffect(() => {
    // Simulate fetching user details from localStorage
    const storedUserType = localStorage.getItem('userType') || 'student';
    const storedUserDetails = localStorage.getItem('userDetails');
    
    setUserType(storedUserType);
    if (storedUserDetails) {
      try {
        setUserDetails(JSON.parse(storedUserDetails));
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
  }, []);

  const handleLogoutConfirm = async () => {
    try {
      localStorage.clear();
      setShowLogoutOverlay(false);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      toast.error('Error logging out');
    }
  };

  const profileOptions = [
    {
      icon: User,
      title: 'Your profile',
      onPress: () => router.push(userType === 'driver' ? '/driver-profile' : '/your-profile'),
    },
    { 
      icon: FileText, 
      title: 'Grievances', 
      onPress: () => router.push('/grievances') 
    },
    { 
      icon: Bell, 
      title: 'Notification Control', 
      onPress: () => router.push('/notification-control') 
    },
    ...(userType === 'driver'
      ? []
      : [{ 
          icon: Star, 
          title: 'Rating', 
          onPress: () => router.push('/rating') 
        }]
    ),
    {
      icon: LogOut,
      title: 'Logout',
      onPress: () => setShowLogoutOverlay(true),
    },
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
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[#353A40] flex items-center justify-center mb-4">
            <User className="text-[#888] w-12 h-12" />
          </div>
          <h2 className="text-white text-base font-bold mb-2">
            {userDetails?.name || 'Loading...'}
          </h2>
          <p className="text-[#888] text-sm">
            {userDetails?.email || 'Loading...'}
          </p>
        </div>

        {/* Profile Options */}
        <div className="px-4">
          {profileOptions.map(({ icon, title, onPress }) => (
            <ProfileOption
              key={title}
              icon={icon}
              title={title}
              onPress={onPress}
            />
          ))}
        </div>
      </div>

      {/* Logout Overlay */}
      {showLogoutOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-[90vw]">
            <h3 className="text-xl font-bold mb-4">Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutOverlay(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

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

export default ProfileScreen; 