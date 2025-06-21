'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const routeDetails = [
  { label: 'Route Number', value: '15' },
  { label: 'Route Name', value: 'Thiruvagowndanoor Bypass' },
  { label: 'Main Driver', value: 'Velan K', hasLink: true },
  { label: 'Departure Time', value: '07.10 AM' },
  { label: 'ETA', value: '08.45 AM' },
  { label: 'Boarding Point Count', value: '13' },
  { label: 'Seat Capacity', value: '50' },
  { label: 'Standing Capacity', value: '20' },
  { label: 'Passenger Boarding', value: '66' },
  { label: 'Vehicle Reg No', value: 'TN12AB6789' },
  { label: 'Fuel', value: '60 / 80 litre' },
];

const tabs = [
  { name: 'Stoppings', screen: 'stoppings' },
  { name: 'Passengers', screen: 'passengers' },
  { name: 'Track', screen: 'track' },
];

const RouteDetails = () => {
  const router = useRouter();
  const params = useParams();
  const routeNumber = params.routeNumber as string;
  const [activeTab, setActiveTab] = useState('stoppings');

  const handleTabClick = (tabScreen: string) => {
    setActiveTab(tabScreen);
    if (tabScreen === 'track') {
      router.push('/live-tracking');
    }
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
        <h1 className="text-2xl font-bold text-white">Route {routeNumber}</h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-around px-4 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.screen)}
            className={`px-4 py-2 rounded-full min-w-[100px] text-center border transition-colors ${
              activeTab === tab.screen
                ? 'bg-[#4a90e2] text-white border-[#4a90e2]'
                : 'bg-[#2C2C2C] text-white border-[#666] hover:bg-[#353A40]'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-5">
        {activeTab === 'stoppings' && (
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">ROUTE DETAILS</h2>
            <div className="bg-[#2C2C2C] rounded-lg overflow-hidden">
              {routeDetails.map((detail, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-3 px-4 ${
                    index !== routeDetails.length - 1 ? 'border-b border-[#666]' : ''
                  }`}
                >
                  <span className="text-[#888] text-sm font-semibold flex-1">
                    {detail.label}
                  </span>
                  <div className="flex items-center justify-end">
                    <span className="text-white text-sm text-right">
                      {detail.value}
                    </span>
                    {detail.hasLink && (
                      <button className="text-[#3498db] ml-2 text-sm hover:underline">
                        View Profile
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'passengers' && (
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">PASSENGERS</h2>
            <div className="bg-[#2C2C2C] rounded-lg p-4">
              <p className="text-[#888] text-center">Passenger list will be displayed here</p>
              <button
                onClick={() => router.push('/route-passengers')}
                className="mt-4 w-full bg-[#4a90e2] text-white py-2 rounded-lg hover:bg-[#357abd] transition-colors"
              >
                View All Passengers
              </button>
            </div>
          </div>
        )}

        {activeTab === 'track' && (
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">TRACKING</h2>
            <div className="bg-[#2C2C2C] rounded-lg p-4">
              <p className="text-[#888] text-center">Live tracking will be displayed here</p>
              <button
                onClick={() => router.push('/live-tracking')}
                className="mt-4 w-full bg-[#4a90e2] text-white py-2 rounded-lg hover:bg-[#357abd] transition-colors"
              >
                Open Live Tracking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteDetails; 