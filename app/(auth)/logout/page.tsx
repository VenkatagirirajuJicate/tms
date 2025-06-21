'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

const ActionButton = ({ 
  label, 
  onPress, 
  style 
}: { 
  label: string; 
  onPress: () => void; 
  style: string; 
}) => (
  <button
    onClick={onPress}
    className={`py-2.5 px-5 rounded-full w-[45%] text-center text-white text-base font-bold transition-colors ${style}`}
  >
    {label}
  </button>
);

const Logout = () => {
  const router = useRouter();

  const handleConfirm = () => {
    // Clear any stored data
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login
    router.push('/login');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#1E262F] rounded-lg p-5 w-4/5 max-w-sm relative">
        <button
          onClick={handleCancel}
          className="absolute top-2.5 right-2.5 text-white hover:text-[#FCD34D] transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-white text-2xl font-bold mb-5 text-center">
          Logout
        </h2>
        
        <p className="text-white text-base mb-5 text-center">
          Are you sure you want to logout?
        </p>
        
        <div className="flex justify-between w-full">
          <ActionButton
            label="No"
            onPress={handleCancel}
            style="bg-[#353A40] hover:bg-[#4A5568]"
          />
          <ActionButton
            label="Yes"
            onPress={handleConfirm}
            style="bg-[#00A3FF] hover:bg-[#0088CC]"
          />
        </div>
      </div>
    </div>
  );
};

export default Logout; 