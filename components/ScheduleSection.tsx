'use client';

import React from 'react';

interface ScheduleSectionProps {
  onDateSelect: (date: string) => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onDateSelect }) => {
  return (
    <div className="bg-[#1E262F] rounded-lg p-4 mb-4">
      <h3 className="text-white text-lg font-bold mb-4">Schedule</h3>
      <button
        onClick={() => onDateSelect('2024-07-26')}
        className="bg-[#FCD34D] text-[#1E293B] px-4 py-2 rounded-lg font-semibold hover:bg-[#F59E0B] transition-colors"
      >
        Schedule Trip
      </button>
    </div>
  );
};

export default ScheduleSection; 