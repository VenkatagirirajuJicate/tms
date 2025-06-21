'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Bus, MapPin, Clock, Users, Fuel, User } from 'lucide-react';

const dummyRoutes = [
  {
    id: 1,
    routeNumber: '15',
    routeName: 'Thiruvagowndanoor Bypass',
    startLocation: 'Thiruvagowndanoor',
    endLocation: 'JKKN Campus',
    departureTime: '07:10 AM',
    arrivalTime: '08:45 AM',
    totalStops: 13,
    seatCapacity: 50,
    standingCapacity: 20,
    currentPassengers: 66,
    vehicleRegNo: 'TN12AB6789',
    fuelLevel: '60/80 litre',
    status: 'active',
    driver: 'Velan K',
  },
  {
    id: 2,
    routeNumber: '7',
    routeName: 'Kakapalayam Route',
    startLocation: 'Kakapalayam',
    endLocation: 'JKKN Campus',
    departureTime: '07:30 AM',
    arrivalTime: '08:15 AM',
    totalStops: 8,
    seatCapacity: 45,
    standingCapacity: 15,
    currentPassengers: 42,
    vehicleRegNo: 'TN12CD1234',
    fuelLevel: '75/80 litre',
    status: 'active',
    driver: 'Ramesh M',
  },
  {
    id: 3,
    routeNumber: '5',
    routeName: 'Seelanayakkampatti Route',
    startLocation: 'Seelanayakkampatti',
    endLocation: 'JKKN Campus',
    departureTime: '07:00 AM',
    arrivalTime: '08:30 AM',
    totalStops: 10,
    seatCapacity: 55,
    standingCapacity: 25,
    currentPassengers: 58,
    vehicleRegNo: 'TN12EF5678',
    fuelLevel: '45/80 litre',
    status: 'active',
    driver: 'Kumar S',
  },
  {
    id: 4,
    routeNumber: '1',
    routeName: 'Main City Route',
    startLocation: 'City Center',
    endLocation: 'JKKN Campus',
    departureTime: '07:15 AM',
    arrivalTime: '08:00 AM',
    totalStops: 6,
    seatCapacity: 40,
    standingCapacity: 20,
    currentPassengers: 35,
    vehicleRegNo: 'TN12GH9012',
    fuelLevel: '80/80 litre',
    status: 'active',
    driver: 'Sundar P',
  },
];

const RouteCard = ({ route }: { route: typeof dummyRoutes[0] }) => {
  const router = useRouter();
  const totalCapacity = route.seatCapacity + route.standingCapacity;
  const occupancyRate = (route.currentPassengers / totalCapacity) * 100;
  
  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return 'text-error-600 bg-error-50';
    if (rate >= 75) return 'text-warning-600 bg-warning-50';
    return 'text-success-600 bg-success-50';
  };

  const getFuelColor = (fuel: string) => {
    const level = parseInt(fuel.split('/')[0]);
    if (level <= 20) return 'text-error-600 bg-error-50';
    if (level <= 40) return 'text-warning-600 bg-warning-50';
    return 'text-success-600 bg-success-50';
  };

  return (
    <div 
      className="card-hover cursor-pointer group"
      onClick={() => router.push(`/routes/${route.routeNumber}`)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
            <Bus className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              Route {route.routeNumber}
            </h3>
            <p className="text-sm text-gray-600">{route.routeName}</p>
          </div>
        </div>
        <span className="badge-success">
          {route.status}
        </span>
      </div>

      {/* Route Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">
            {route.startLocation} → {route.endLocation}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">
            {route.departureTime} - {route.arrivalTime}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">
            {route.currentPassengers}/{totalCapacity} passengers
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Occupancy</span>
          <span>{occupancyRate.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              occupancyRate >= 90 ? 'bg-error-500' : 
              occupancyRate >= 75 ? 'bg-warning-500' : 'bg-success-500'
            }`}
            style={{ width: `${Math.min(occupancyRate, 100)}%` }}
          />
        </div>
      </div>

      {/* Vehicle Info Grid */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Driver</p>
            <p className="text-sm font-medium text-gray-900">{route.driver}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Bus className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Vehicle</p>
            <p className="text-sm font-medium text-gray-900">{route.vehicleRegNo}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Stops</p>
            <p className="text-sm font-medium text-gray-900">{route.totalStops}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Fuel className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Fuel</p>
            <p className="text-sm font-medium text-gray-900">{route.fuelLevel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Routes = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header Spacing */}
      <div className="lg:hidden h-16" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bus Routes</h1>
              <p className="text-gray-600">Manage and monitor all transportation routes</p>
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{dummyRoutes.length}</p>
              <p className="text-sm text-gray-600">Active Routes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {dummyRoutes.reduce((sum, route) => sum + route.currentPassengers, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Passengers</p>
            </div>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyRoutes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>

        {/* Empty State (if no routes) */}
        {dummyRoutes.length === 0 && (
          <div className="text-center py-12">
            <Bus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Routes Available</h3>
            <p className="text-gray-600 mb-6">There are currently no active routes in the system.</p>
            <button className="btn-primary">
              Add New Route
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Routes; 