'use client';

import React from 'react';

interface StatusBarProps {
  userType: string;
}

interface StatusItemProps {
  title: string;
  time: string;
  active?: boolean;
  isFirst: boolean;
  isLast: boolean;
}

const getStatusItems = (userType: string) =>
  userType === 'driver'
    ? [
        { title: 'Bus Departed', time: '07:05 AM', active: true },
        { title: 'Boarded', time: '08:30 AM', active: true },
        { title: 'Reached', time: '09:00 AM' },
      ]
    : [
        { title: 'Scheduled', time: 'Wed, 25 Jul', active: true },
        { title: 'Bus Departed', time: '07:05 AM', active: true },
        { title: 'Boarded', time: '08:30 AM', active: true },
        { title: 'Reached', time: '09:00 AM' },
      ];

const StatusItem: React.FC<StatusItemProps> = ({ title, time, active, isFirst, isLast }) => (
  <div className="w-30 flex items-center relative">
    {!isFirst && (
      <div
        className={`absolute top-2 h-0.5 w-15 ${
          active ? 'bg-[#12B76A]' : 'bg-[#888]'
        }`}
        style={{ left: 0 }}
      />
    )}
    <div
      className={`w-4 h-4 rounded-full border-2 mb-2 ${
        active
          ? 'bg-[#12B76A] border-[#12B76A]'
          : 'bg-[#888] border-[#2c2c2c]'
      }`}
    />
    {!isLast && (
      <div
        className={`absolute top-2 h-0.5 w-15 ${
          active ? 'bg-[#12B76A]' : 'bg-[#888]'
        }`}
        style={{ right: 0 }}
      />
    )}
    <div className="flex flex-col items-center">
      <span
        className={`text-xs text-center mb-1 ${
          active ? 'text-white' : 'text-[#888]'
        }`}
      >
        {title}
      </span>
      <span
        className={`text-xs text-center ${
          active ? 'text-white' : 'text-[#999]'
        }`}
      >
        {time}
      </span>
    </div>
  </div>
);

const StatusBar: React.FC<StatusBarProps> = ({ userType }) => {
  const statusItems = getStatusItems(userType);

  return (
    <div className="max-w-full my-5 overflow-x-auto">
      <div className="flex flex-row items-center">
        {statusItems.map((item, index) => (
          <StatusItem
            key={index}
            {...item}
            isFirst={index === 0}
            isLast={index === statusItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusBar; 