'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, MapPin } from 'lucide-react';

interface HeaderProps {
  userType: string;
  userDetails: any;
  routeDetails: any;
  onViewRouteDetails: (details: any) => void;
}

const Header: React.FC<HeaderProps> = ({
  userType,
  userDetails,
  routeDetails,
  onViewRouteDetails,
}) => {
  const router = useRouter();
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  useEffect(() => {
    const checkUnreadNotifications = async () => {
      try {
        const data = localStorage.getItem('notificationsData');
        const notifications = data && JSON.parse(data);
        const hasUnread = notifications
          ? [...(notifications.system || []), ...(notifications.user || [])].some(
              (n: any) => !n.isRead && n.unreadCount > 0
            )
          : false;
        setHasUnreadNotifications(hasUnread);
      } catch (error) {
        console.error('Error checking unread notifications:', error);
      }
    };
    checkUnreadNotifications();
  }, []);

  const handleViewRouteDetails = () => {
    onViewRouteDetails(userType === 'driver' ? userDetails : routeDetails);
  };

  return (
    <div className="py-5 px-5 pb-0">
      <div className="flex flex-row justify-between items-center w-full pb-2.5">
        <h1 className="text-white text-sm font-medium">TRAVENT</h1>
        <div className="flex flex-row items-center">
          {userType !== 'driver' && (
            <div className="flex flex-row items-center rounded-[20px] py-1.5 px-2.5 mr-2.5 bg-gradient-to-r from-[#1E262F] to-[#16171B]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffd700] mr-1.5"></div>
              <span className="text-white text-base font-bold">
                {userDetails?.remainingAmulets || 0}
              </span>
            </div>
          )}
          <div className="relative">
            <button
              onClick={() => router.push('/notifications')}
              className="text-white hover:text-[#FCD34D] transition-colors"
            >
              <Bell size={24} />
            </button>
            {hasUnreadNotifications && (
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#00A3FF]"></div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-white text-3xl font-bold">Home</h2>
          <p className="text-white text-base mt-1.5">
            Welcome {userDetails?.name || 'User'}!
          </p>
        </div>
        <div className="flex flex-row items-center mt-1.5">
          <div className="ml-1.5 flex flex-col">
            <button
              onClick={handleViewRouteDetails}
              className="flex flex-row items-center py-2 px-3.5 bg-[#00A3FF] rounded-[25px] text-center shadow-lg hover:bg-[#0088CC] transition-colors"
            >
              <MapPin size={18} className="text-white mr-1.5" />
              <span className="text-white text-sm font-bold">
                View Default Route
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 