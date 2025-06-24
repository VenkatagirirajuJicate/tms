'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bus, MapPin, Clock, Users, Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import AdvancedRouteFilters from '@/components/advanced-route-filters';

const dummyRoutes = [
  {
    id: 1, routeNumber: '01', routeName: 'Erode Central',
    startLocation: 'Erode', endLocation: 'JKKN Campus',
    departureTime: '07:00 AM', arrivalTime: '08:30 AM',
    totalStops: 12, currentPassengers: 65, totalCapacity: 70,
    status: 'active', driver: 'Suresh K', vehicleRegNo: 'TN 33 AB 1234',
  },
  {
    id: 2, routeNumber: '02', routeName: 'Salem Steel Plant',
    startLocation: 'Salem', endLocation: 'JKKN Campus',
    departureTime: '06:45 AM', arrivalTime: '08:45 AM',
    totalStops: 15, currentPassengers: 55, totalCapacity: 70,
    status: 'active', driver: 'Mohan R', vehicleRegNo: 'TN 30 XY 5678',
  },
  {
    id: 3, routeNumber: '03', routeName: 'Tiruppur Express',
    startLocation: 'Tiruppur', endLocation: 'JKKN Campus',
    departureTime: '07:15 AM', arrivalTime: '08:50 AM',
    totalStops: 10, currentPassengers: 75, totalCapacity: 80,
    status: 'active', driver: 'Vignesh S', vehicleRegNo: 'TN 39 F 9101',
  },
  {
    id: 4, routeNumber: '04', routeName: 'Namakkal Fort',
    startLocation: 'Namakkal', endLocation: 'JKKN Campus',
    departureTime: '07:30 AM', arrivalTime: '08:20 AM',
    totalStops: 8, currentPassengers: 58, totalCapacity: 60,
    status: 'active', driver: 'Karthik P', vehicleRegNo: 'TN 28 J 1121',
  },
  {
    id: 5, routeNumber: '05', routeName: 'Karur Textile Park',
    startLocation: 'Karur', endLocation: 'JKKN Campus',
    departureTime: '06:50 AM', arrivalTime: '08:35 AM',
    totalStops: 14, currentPassengers: 62, totalCapacity: 80,
    status: 'inactive', driver: 'Arun G', vehicleRegNo: 'TN 47 R 3141',
  },
  {
    id: 6, routeNumber: '06', routeName: 'Kumarapalayam Weaver',
    startLocation: 'Kumarapalayam', endLocation: 'JKKN Campus',
    departureTime: '07:45 AM', arrivalTime: '08:15 AM',
    totalStops: 5, currentPassengers: 55, totalCapacity: 60,
    status: 'active', driver: 'Praveen M', vehicleRegNo: 'TN 34 T 5161',
  },
  {
    id: 7, routeNumber: '07', routeName: 'Bhavani River Side',
    startLocation: 'Bhavani', endLocation: 'JKKN Campus',
    departureTime: '07:25 AM', arrivalTime: '08:25 AM',
    totalStops: 7, currentPassengers: 48, totalCapacity: 60,
    status: 'active', driver: 'Balaji V', vehicleRegNo: 'TN 36 S 7181',
  },
  {
    id: 8, routeNumber: '08', routeName: 'Perundurai SIPCOT',
    startLocation: 'Perundurai', endLocation: 'JKKN Campus',
    departureTime: '07:50 AM', arrivalTime: '08:40 AM',
    totalStops: 6, currentPassengers: 68, totalCapacity: 70,
    status: 'active', driver: 'Dinesh T', vehicleRegNo: 'TN 56 P 9101',
  },
  {
    id: 9, routeNumber: '09', routeName: 'Gobichettipalayam Hills',
    startLocation: 'Gobichettipalayam', endLocation: 'JKKN Campus',
    departureTime: '06:40 AM', arrivalTime: '08:20 AM',
    totalStops: 18, currentPassengers: 78, totalCapacity: 80,
    status: 'active', driver: 'Sathish K', vehicleRegNo: 'TN 36 G 1213',
  },
  {
    id: 10, routeNumber: '10', routeName: 'Sankagiri Fort',
    startLocation: 'Sankagiri', endLocation: 'JKKN Campus',
    departureTime: '07:35 AM', arrivalTime: '08:10 AM',
    totalStops: 5, currentPassengers: 45, totalCapacity: 60,
    status: 'active', driver: 'Rajan L', vehicleRegNo: 'TN 30 K 1415',
  },
  {
    id: 11, routeNumber: '11', routeName: 'Pallipalayam Agri',
    startLocation: 'Pallipalayam', endLocation: 'JKKN Campus',
    departureTime: '07:10 AM', arrivalTime: '08:15 AM',
    totalStops: 9, currentPassengers: 63, totalCapacity: 70,
    status: 'inactive', driver: 'Anand C', vehicleRegNo: 'TN 28 M 1617',
  },
  {
    id: 12, routeNumber: '12', routeName: 'Rasipuram Silk',
    startLocation: 'Rasipuram', endLocation: 'JKKN Campus',
    departureTime: '07:05 AM', arrivalTime: '08:35 AM',
    totalStops: 11, currentPassengers: 52, totalCapacity: 60,
    status: 'active', driver: 'Vijay N', vehicleRegNo: 'TN 28 W 1819',
  },
  {
    id: 13, routeNumber: '13', routeName: 'Attur Town',
    startLocation: 'Attur', endLocation: 'JKKN Campus',
    departureTime: '06:30 AM', arrivalTime: '08:55 AM',
    totalStops: 20, currentPassengers: 70, totalCapacity: 80,
    status: 'active', driver: 'Gopi S', vehicleRegNo: 'TN 30 C 2021',
  },
  {
    id: 14, routeNumber: '14', routeName: 'Mettur Dam',
    startLocation: 'Mettur', endLocation: 'JKKN Campus',
    departureTime: '06:55 AM', arrivalTime: '08:40 AM',
    totalStops: 16, currentPassengers: 68, totalCapacity: 70,
    status: 'active', driver: 'Senthil R', vehicleRegNo: 'TN 52 H 2223',
  },
  {
    id: 15, routeNumber: '15', routeName: 'Anthiyur Market',
    startLocation: 'Anthiyur', endLocation: 'JKKN Campus',
    departureTime: '07:20 AM', arrivalTime: '08:50 AM',
    totalStops: 13, currentPassengers: 59, totalCapacity: 70,
    status: 'active', driver: 'Murugan P', vehicleRegNo: 'TN 36 N 2425',
  },
  {
    id: 16, routeNumber: '16', routeName: 'Tiruchengode Hills',
    startLocation: 'Tiruchengode', endLocation: 'JKKN Campus',
    departureTime: '07:40 AM', arrivalTime: '08:25 AM',
    totalStops: 6, currentPassengers: 51, totalCapacity: 60,
    status: 'active', driver: 'Hari B', vehicleRegNo: 'TN 34 Q 2627',
  },
  {
    id: 17, routeNumber: '17', routeName: 'Omalur Main',
    startLocation: 'Omalur', endLocation: 'JKKN Campus',
    departureTime: '07:00 AM', arrivalTime: '08:30 AM',
    totalStops: 12, currentPassengers: 69, totalCapacity: 70,
    status: 'active', driver: 'Krishna M', vehicleRegNo: 'TN 30 S 2829',
  },
  {
    id: 18, routeNumber: '18', routeName: 'Edappadi Town',
    startLocation: 'Edappadi', endLocation: 'JKKN Campus',
    departureTime: '07:15 AM', arrivalTime: '08:20 AM',
    totalStops: 9, currentPassengers: 44, totalCapacity: 60,
    status: 'active', driver: 'Shankar T', vehicleRegNo: 'TN 77 Z 3031',
  },
  {
    id: 19, routeNumber: '19', routeName: 'Komarapalayam Bridge',
    startLocation: 'Komarapalayam', endLocation: 'JKKN Campus',
    departureTime: '07:55 AM', arrivalTime: '08:20 AM',
    totalStops: 4, currentPassengers: 57, totalCapacity: 60,
    status: 'active', driver: 'Siva R', vehicleRegNo: 'TN 34 U 3233',
  },
  {
    id: 20, routeNumber: '20', routeName: 'Dharmapuri City',
    startLocation: 'Dharmapuri', endLocation: 'JKKN Campus',
    departureTime: '06:35 AM', arrivalTime: '09:00 AM',
    totalStops: 22, currentPassengers: 79, totalCapacity: 80,
    status: 'inactive', driver: 'Logesh D', vehicleRegNo: 'TN 29 V 3435',
  },
];

const RouteCard = ({ route }: { route: typeof dummyRoutes[0] }) => {
  const router = useRouter();
  const occupancyRate = (route.currentPassengers / route.totalCapacity) * 100;
  
  const getOccupancyColor = () => {
    if (occupancyRate >= 90) return 'bg-red-500';
    if (occupancyRate >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
      onClick={() => router.push(`/routes/${route.routeNumber}`)}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {route.routeNumber}
            </div>
          <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {route.routeName}
            </h3>
              <p className="text-sm text-gray-500">{route.startLocation} to {route.endLocation}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            route.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {route.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
          <div className="flex items-center gap-2 text-gray-600"><MapPin className="w-4 h-4 text-gray-400" /><span>{route.totalStops} stops</span></div>
          <div className="flex items-center gap-2 text-gray-600"><Clock className="w-4 h-4 text-gray-400" /><span>{route.departureTime} - {route.arrivalTime}</span></div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">Occupancy</span>
            <span className="text-xs font-semibold text-gray-800">{route.currentPassengers} / {route.totalCapacity}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full transition-all duration-300 ${getOccupancyColor()}`} style={{ width: `${occupancyRate}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Users className="w-4 h-4 text-gray-600"/>
          </div>
          <div>
            <p className="text-xs text-gray-500">Driver</p>
            <p className="text-sm font-semibold text-gray-800">{route.driver}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
};

const RoutesPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: [] as string[],
    occupancyRange: [0, 100] as [number, number],
    distanceRange: [0, 100] as [number, number],
    departureTimeRange: ['06:00', '09:00'] as [string, string],
    driver: [] as string[],
    vehicleType: [] as string[],
    routeType: [] as string[],
    showInactive: false,
  });

  // Get unique drivers for filter options
  const availableDrivers = Array.from(new Set(dummyRoutes.map(route => route.driver)));
  const availableVehicleTypes = ['Standard Bus', 'Mini Bus', 'Luxury Coach', 'Electric Bus'];

  const tabs = ['All', 'Active', 'Inactive'];

  const filteredRoutes = dummyRoutes.filter(route => {
    const statusMatch = activeTab === 'All' || route.status === activeTab.toLowerCase();
    const searchMatch = route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden h-16" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Routes</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search routes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 w-full sm:w-64"
                />
              </div>
              <AdvancedRouteFilters
                filters={filters}
                onFiltersChange={setFilters}
                availableDrivers={availableDrivers}
                availableVehicleTypes={availableVehicleTypes}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
          {filteredRoutes.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No routes found</h3>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage; 