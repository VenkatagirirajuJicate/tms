'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell } from 'lucide-react';

// Dummy notification group data
const dummyNotificationGroup = [
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
    title: 'Bus Schedule Update',
    body: 'The bus driver has been changed for today\'s route.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
  },
];

const Message = ({ 
  text, 
  time 
}: { 
  text: string; 
  time: Date; 
}) => {
  const formatTime = (timestamp: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    };
    return new Intl.DateTimeFormat('en-US', options).format(timestamp);
  };

  return (
    <div className="max-w-[80%] p-3 rounded-2xl mb-3 bg-[#2C2C2C]">
      <p className="text-white text-base">{text}</p>
      <p className="text-[rgba(255,255,255,0.6)] text-xs self-end mt-1">
        {formatTime(time)}
      </p>
    </div>
  );
};

const Header = ({ 
  notification 
}: { 
  notification: typeof dummyNotificationGroup[0]; 
}) => {
  const router = useRouter();
  const isOnline = true; // Always set to true, indicating the status is "Online"

  return (
    <div className="flex flex-row items-center p-5 border-b border-[#2C2C2C]">
      <button
        onClick={() => router.back()}
        className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
      >
        <ArrowLeft size={24} />
      </button>
      
      <div className="w-12 h-12 rounded-full bg-[#4A90E2] flex items-center justify-center mr-4">
        <Bell className="text-white" size={24} />
      </div>
      
      <div className="flex-1">
        <h2 className="text-white text-lg font-bold">{notification.title}</h2>
        <div className="flex flex-row items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isOnline ? 'bg-[#4CAF50]' : 'bg-[#FF5722]'
          }`} />
          <span className="text-[#888] text-xs">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
};

const DetailedMessageView = () => {
  
  // In a real app, you would get this from route params or context
  const notificationGroup = dummyNotificationGroup;

  const renderMessages = () => {
    return notificationGroup.map((message, index) => (
      <Message key={index} text={message.body} time={message.createdAt} />
    ));
  };

  return (
    <div className="flex-1 bg-[#1E1E1E] min-h-screen flex flex-col">
      <Header notification={notificationGroup[0]} />
      
      <div className="flex-1 p-5 overflow-y-auto">
        {renderMessages()}
      </div>
    </div>
  );
};

export default DetailedMessageView; 