'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ScheduleFormOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  selectedDate: string;
  onScheduleConfirm: (date: string) => void;
  userId: string | null;
}

const ScheduleFormOverlay: React.FC<ScheduleFormOverlayProps> = ({
  isVisible,
  onClose,
  selectedDate,
  onScheduleConfirm,
  userId,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Schedule Trip</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-600 mb-4">Selected Date: {selectedDate}</p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onScheduleConfirm(selectedDate)}
            className="flex-1 px-4 py-2 bg-[#FCD34D] text-[#1E293B] rounded-lg font-semibold hover:bg-[#F59E0B]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleFormOverlay; 