'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Map, List, User, BarChart2, Clock, MapPin, Users, Navigation, Bus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { allRoutes } from '@/data/dummy-data';

const MapComponent = dynamic(() => import('../../live-tracking/map-component'), { ssr: false });

const RouteDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const routeNumber = params.routeNumber as string;

  const route = allRoutes.find(r => r.routeNumber === routeNumber);

  const [activeTab, setActiveTab] = useState('stops');

  if (!route) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Route not found</h2>
          <p className="text-gray-600 mt-2">The route you are looking for does not exist.</p>
          <button onClick={() => router.back()} className="btn-primary mt-6">Go Back</button>
        </div>
      </div>
    );
  }

  const mapSteps = route.stops.map((stop, index) => ({
    name: stop.name,
    time: stop.time,
    position: [11.34 + index * 0.05, 77.71 + index * 0.05] as [number, number],
    isDestination: index === route.stops.length - 1,
  }));

  const renderContent = () => {
    switch (activeTab) {
      case 'stops':
        return <StopsList stops={route.stops} />;
      case 'driver':
        return <DriverVehicleInfo driver={route.driver} vehicle={route.vehicleRegNo} />;
      case 'analytics':
        return <RouteAnalytics />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{`Route ${route.routeNumber}: ${route.routeName}`}</h1>
              <p className="text-gray-600">{route.startLocation} to {route.endLocation}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
            <InfoBox icon={Clock} label="Duration" value={route.duration} />
            <InfoBox icon={MapPin} label="Stops" value={`${route.totalStops}`} />
            <InfoBox icon={Navigation} label="Distance" value={`${route.distance} km`} />
            <InfoBox icon={Users} label="Capacity" value={`${route.currentPassengers} / ${route.totalCapacity}`} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <MapComponent steps={mapSteps} currentStepIndex={mapSteps.length} />
          </motion.div>

          {/* Right Column: Tabs and Dynamic Content */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="card">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                  <TabButton name="stops" icon={List} activeTab={activeTab} setActiveTab={setActiveTab} />
                  <TabButton name="driver" icon={User} activeTab={activeTab} setActiveTab={setActiveTab} />
                  <TabButton name="analytics" icon={BarChart2} activeTab={activeTab} setActiveTab={setActiveTab} />
                </nav>
              </div>
              <div className="pt-6">
                {renderContent()}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ icon: Icon, label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
    <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-bold text-gray-900 text-lg">{value}</p>
  </div>
);

const TabButton = ({ name, icon: Icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(name)}
    className={`flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
      activeTab === name
        ? 'border-blue-600 text-blue-700'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    <Icon className={`w-4 h-4 ${activeTab === name ? 'text-blue-600' : 'text-gray-400'}`} />
    {name}
  </button>
);

const StopsList = ({ stops }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Stops</h3>
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {stops.map((stop, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center mr-4">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center ring-4 ring-blue-100">
              <MapPin className="text-white w-3 h-3" />
            </div>
            {index < stops.length - 1 && <div className="w-0.5 h-12 bg-blue-200" />}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{stop.name}</p>
            <p className="text-sm text-gray-500">Scheduled: {stop.time} AM</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DriverVehicleInfo = ({ driver, vehicle }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver & Vehicle</h3>
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><User className="w-6 h-6 text-blue-600" /></div>
        <div>
          <p className="text-sm text-gray-500">Driver</p>
          <p className="font-bold text-gray-900">{driver}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Bus className="w-6 h-6 text-blue-600" /></div>
        <div>
          <p className="text-sm text-gray-500">Vehicle Reg. No.</p>
          <p className="font-bold text-gray-900">{vehicle}</p>
        </div>
      </div>
    </div>
  </div>
);

const RouteAnalytics = () => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
    <div className="space-y-4">
      <p className="text-gray-600">Analytics and performance data for this route will be displayed here.</p>
      {/* Placeholder for charts or stats */}
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <BarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-2"/>
        <p className="text-sm text-gray-500">Analytics data coming soon.</p>
      </div>
    </div>
  </div>
);

export default RouteDetailPage; 