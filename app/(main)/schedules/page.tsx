'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ArrowLeft } from 'lucide-react';

const pieData = [
  { name: 'Morning', population: 18, color: '#4287f5' },
  { name: 'Evening', population: 21, color: '#42f554' },
  { name: 'Both', population: 42, color: '#f5d742' },
  { name: 'Absent', population: 3, color: '#f542a1' },
  { name: 'Not Selected', population: 1, color: '#f54242' },
];

const barData = [
  { code: '18', value: 1000, color: '#42f554', name: 'JKKN Engineering College' },
  { code: '20', value: 2309, color: '#4287f5', name: 'JKKN Dental College' },
  { code: '06', value: 2309, color: '#f54242', name: 'JKKN College of Pharmacy' },
  { code: '05', value: 600, color: '#f542a1', name: 'JKKN College of Nursing' },
  { code: '03', value: 1200, color: '#f5d742', name: 'JKKN Arts & Science' },
];

const Schedules = () => {
  const router = useRouter();

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1E262F] to-[#16171B] min-h-screen">
      {/* Header */}
      <div className="flex items-center p-5">
        <button
          onClick={() => router.back()}
          className="mr-4 text-white hover:text-[#FCD34D] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Schedules</h1>
      </div>

      <div className="flex-1 p-5">
        {/* Total Passengers */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-4xl font-bold text-white">84</span>
          <span className="text-[#888] text-base">Passengers Scheduled Totally</span>
        </div>

        {/* Pie Chart Section */}
        <h2 className="text-white text-lg font-bold mb-2">Categories of Usage</h2>
        <div className="flex flex-row mb-8">
          {/* Pie Chart Placeholder */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-40 h-40 bg-[#222] rounded-full flex items-center justify-center">
              <span className="text-[#888]">[Pie Chart]</span>
            </div>
          </div>
          {/* Legend */}
          <div className="w-1/2 flex flex-col justify-center">
            {pieData.map((data, idx) => (
              <div key={data.name} className="flex flex-row items-center mb-2">
                <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: data.color }} />
                <span className="text-white text-sm mr-2">{data.name}</span>
                <span className="text-[#888] text-xs">{data.population}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart Section */}
        <h2 className="text-white text-lg font-bold mb-2">Institution Wise Schedulings</h2>
        <div className="mb-8">
          {/* Bar Chart Placeholder */}
          <div className="w-full h-56 bg-[#222] rounded-lg flex items-center justify-center mb-4">
            <span className="text-[#888]">[Bar Chart]</span>
          </div>
          {/* Institution List */}
          <div className="flex flex-col">
            {barData.map((inst) => (
              <div key={inst.code} className="flex flex-row items-center mb-2">
                <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: inst.color }} />
                <span className="text-white text-sm mr-2">{inst.name}</span>
                <span className="text-[#888] text-xs">{inst.code}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Passengers Button */}
        <button
          onClick={() => router.push('/scheduled-passengers')}
          className="w-full bg-[#2C2C2C] rounded-lg p-5 flex flex-col items-start hover:bg-[#353A40] transition-colors mb-8"
        >
          <span className="text-white text-lg font-bold mb-1">Scheduled Passengers</span>
          <span className="text-[#888] text-sm mb-2">Shows the list of passengers scheduled for their travel</span>
          <div className="bg-[#4a90e2] rounded-full p-2 inline-flex">
            <ArrowLeft className="text-white w-5 h-5 rotate-180" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Schedules; 