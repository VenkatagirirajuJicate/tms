'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SettingItem = ({ 
  label, 
  component 
}: { 
  label: string; 
  component: React.ReactNode; 
}) => (
  <div className="flex flex-row justify-between items-center py-4 border-b border-[#353A40]">
    <span className="text-white text-base">{label}</span>
    {component}
  </div>
);

const Switch = ({ 
  value, 
  onChange 
}: { 
  value: boolean; 
  onChange: (value: boolean) => void; 
}) => (
  <button
    onClick={() => onChange(!value)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      value ? 'bg-[#81b0ff]' : 'bg-[#767577]'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        value ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const NotificationControl = () => {
  const router = useRouter();
  const [enableNotification, setEnableNotification] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [selectedSound, setSelectedSound] = useState('Beep');

  useEffect(() => {
    // Load settings from localStorage
    const savedSound = localStorage.getItem('notificationSound');
    const savedVibrate = localStorage.getItem('vibrate');
    
    if (savedSound) setSelectedSound(savedSound);
    if (savedVibrate !== null) setVibrate(JSON.parse(savedVibrate));
  }, []);

  const saveVibrateSetting = (value: boolean) => {
    setVibrate(value);
    try {
      localStorage.setItem('vibrate', JSON.stringify(value));
    } catch (error) {
      console.error('Error saving vibrate setting:', error);
    }
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
          <h1 className="text-2xl font-bold text-white">Notification Control</h1>
        </div>

        {/* Settings Container */}
        <div className="px-4">
          <SettingItem
            label="Enable Notification"
            component={
              <Switch
                value={enableNotification}
                onChange={setEnableNotification}
              />
            }
          />
          
          <p className="text-[#888] text-sm my-2">
            Get real-time bus updates; turn off notifications to silence alerts.
          </p>

          <button
            onClick={() => router.push('/notification-sound')}
            className="flex flex-row justify-between items-center py-4 border-b border-[#353A40] w-full text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-white text-base">Notification Sound</span>
            <div className="flex flex-row items-center">
              <span className="text-[#888] text-base mr-2">{selectedSound}</span>
              <ChevronRight className="text-[#888] w-6 h-6" />
            </div>
          </button>

          <SettingItem
            label="Vibrate"
            component={
              <Switch
                value={vibrate}
                onChange={saveVibrateSetting}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationControl; 
 