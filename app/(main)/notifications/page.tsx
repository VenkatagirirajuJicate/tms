'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Search } from 'lucide-react';
import { Navbar } from '@/components/navigation/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Bell, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'

// Dummy notification data
const dummyNotifications = [
  {
    id: 1,
    title: 'Bus Schedule Update',
    body: 'Your bus will arrive 5 minutes early today.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
  },
  {
    id: 2,
    title: 'Bus Schedule Update',
    body: 'Route 17 has been delayed by 10 minutes.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
  },
  {
    id: 3,
    title: 'Payment Confirmation',
    body: 'Your payment of ₹500 has been successfully processed.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
  },
  {
    id: 4,
    title: 'Payment Confirmation',
    body: 'Your monthly pass has been renewed.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isRead: true,
  },
  {
    id: 5,
    title: 'System Maintenance',
    body: 'Scheduled maintenance will occur tonight at 2 AM.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    isRead: true,
  },
];

const NotificationItem = ({ 
  title, 
  message, 
  time, 
  unreadCount, 
  onPress 
}: { 
  title: string; 
  message: string; 
  time: Date; 
  unreadCount: number; 
  onPress: () => void; 
}) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(time);

  return (
    <button
      onClick={onPress}
      className="flex flex-row items-center p-4 border-b border-[#2C2C2C] w-full text-left hover:bg-[#2C2C2C] transition-colors"
    >
      <div className="mr-3 w-10 h-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
        <User size={24} className="text-[#666]" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-white text-base mb-1">{title}</h3>
        <p className="text-[#666] text-sm mb-1 truncate">{message}</p>
        <p className="text-[#666] text-xs">{formattedTime}</p>
      </div>
      
      {unreadCount > 0 && (
        <div className="bg-[#00A3FF] px-2 py-1 rounded-xl ml-2">
          <span className="text-white text-xs font-bold">{unreadCount}</span>
        </div>
      )}
    </button>
  );
};

const SearchBar = ({ 
  placeholder, 
  onSearch 
}: { 
  placeholder: string; 
  onSearch: (query: string) => void; 
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center bg-[#2C2C2C] rounded-lg px-3 py-2 mx-4 mb-4">
      <Search className="text-[#666] w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="flex-1 bg-transparent text-white placeholder-[#666] outline-none"
      />
    </div>
  );
};

const NotificationScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.isRead).length,
    [notifications]
  );

  const groupedNotifications = useMemo(() => {
    const groups: { [key: string]: typeof notifications } = {};
    notifications.forEach((notification) => {
      if (!groups[notification.title]) {
        groups[notification.title] = [];
      }
      groups[notification.title].push(notification);
    });
    
    return Object.entries(groups).map(([title, group]) => ({
      title,
      messages: group,
      unreadCount: group.filter((msg) => !msg.isRead).length,
    }));
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    let filtered = groupedNotifications;
    
    if (searchQuery) {
      filtered = filtered.filter(group => 
        group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.messages.some(msg => 
          msg.body.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    if (showUnreadOnly) {
      filtered = filtered.filter(group => group.unreadCount > 0);
    }
    
    return filtered;
  }, [groupedNotifications, searchQuery, showUnreadOnly]);

  const handleNotificationRead = (notificationTitle: string) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.title === notificationTitle) {
        return { ...notification, isRead: true };
      }
      return notification;
    });

    setNotifications(updatedNotifications);
    localStorage.setItem('notificationsData', JSON.stringify(updatedNotifications));
  };

  const handleNotificationPress = (notificationTitle: string) => {
    const selectedGroup = notifications.filter(
      (n) => n.title === notificationTitle
    );
    
    // Navigate to detailed message view
    router.push('/detailed-message');
  };

  const toggleUnreadFilter = () => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  return (
    <div className="flex-1 bg-[#1E1E1E] min-h-screen">
      {/* Header */}
      <div className="flex items-center p-5">
        <button
          onClick={() => router.back()}
          className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
      </div>

      {/* Search Bar */}
      <SearchBar placeholder="Search" onSearch={setSearchQuery} />

      {/* Unread Filter */}
      <div className="flex justify-end mx-4 mb-4">
        <button
          onClick={toggleUnreadFilter}
          className={`flex flex-row items-center px-3 py-1.5 rounded-full transition-colors ${
            showUnreadOnly 
              ? 'bg-[rgba(0,163,255,0.1)]' 
              : 'bg-[#2C2C2C]'
          }`}
        >
          <span className={`text-sm mr-1 ${
            showUnreadOnly ? 'text-white font-bold' : 'text-white'
          }`}>
            Unread
          </span>
          {unreadCount > 0 && (
            <div className="bg-[#00A3FF] px-1.5 py-0.5 rounded-lg">
              <span className="text-white text-xs font-bold">{unreadCount}</span>
                  </div>
          )}
        </button>
                  </div>

      {/* Notifications List */}
      <div className="flex-1">
        {filteredNotifications.length === 0 ? (
          <div className="flex items-center justify-center p-8">
            <p className="text-[#666] text-center">
              {searchQuery ? 'No notifications found' : 'No notifications'}
            </p>
                </div>
        ) : (
          filteredNotifications.map((item) => (
            <NotificationItem
              key={item.title}
              title={item.title}
              message={item.messages[item.messages.length - 1].body}
              time={item.messages[item.messages.length - 1].createdAt}
              unreadCount={item.unreadCount}
              onPress={() => handleNotificationPress(item.title)}
            />
          ))
        )}
        </div>
    </div>
  );
};

export default NotificationScreen; 