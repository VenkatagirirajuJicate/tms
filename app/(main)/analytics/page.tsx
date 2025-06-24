'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { 
  ArrowLeft, Activity, Users, TrendingUp, Download, RefreshCw, Fuel, Bus, 
  Route, Calendar, BarChart3, Leaf, Star, ArrowRight, Filter, ArrowUp, ArrowDown,
  ChevronLeft, CheckCircle, DollarSign, Gauge, LineChart as LineChartIcon, Sun, 
  Shield, UserCheck
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ComposedChart,
  ReferenceLine
} from 'recharts';

const Analytics = () => {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState(['all']);
  const [selectedDrivers, setSelectedDrivers] = useState(['all']);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate data refresh
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 500);
      }, 30000); // Refresh every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Enhanced real-time KPIs
  const kpiData = {
    realTime: {
      activeBuses: 12,
      onRoutePassengers: 342,
      averageSpeed: 35.2,
      onTimePerformance: 94.8,
      fuelEfficiency: 8.2,
      currentRevenue: 15420,
      emergencyAlerts: 0,
      weatherCondition: 'sunny'
    },
    trends: {
      activeBuses: 8.3,
      onRoutePassengers: 12.5,
      averageSpeed: -2.1,
      onTimePerformance: 3.2,
      fuelEfficiency: 5.8,
      currentRevenue: 18.9
    }
  };

  // Comprehensive analytics data
  const analyticsData = {
    performance: [
      { time: '06:00', onTime: 98, delayed: 2, cancelled: 0, passengers: 45 },
      { time: '07:00', onTime: 95, delayed: 4, cancelled: 1, passengers: 180 },
      { time: '08:00', onTime: 92, delayed: 6, cancelled: 2, passengers: 220 },
      { time: '09:00', onTime: 96, delayed: 3, cancelled: 1, passengers: 150 },
      { time: '10:00', onTime: 97, delayed: 2, cancelled: 1, passengers: 80 },
      { time: '11:00', onTime: 99, delayed: 1, cancelled: 0, passengers: 60 },
      { time: '12:00', onTime: 94, delayed: 5, cancelled: 1, passengers: 140 },
      { time: '13:00', onTime: 96, delayed: 3, cancelled: 1, passengers: 165 },
      { time: '14:00', onTime: 98, delayed: 2, cancelled: 0, passengers: 190 },
      { time: '15:00', onTime: 93, delayed: 6, cancelled: 1, passengers: 210 },
      { time: '16:00', onTime: 91, delayed: 7, cancelled: 2, passengers: 250 },
      { time: '17:00', onTime: 89, delayed: 9, cancelled: 2, passengers: 280 }
    ],
    
    routes: [
      { id: '01', name: 'Erode Central', efficiency: 94, passengers: 85, revenue: 4250, onTime: 96, distance: 25, fuelUsed: 18.5 },
      { id: '02', name: 'Salem Express', efficiency: 88, passengers: 72, revenue: 3600, onTime: 91, distance: 35, fuelUsed: 28.2 },
      { id: '03', name: 'Coimbatore Line', efficiency: 96, passengers: 92, revenue: 4600, onTime: 98, distance: 22, fuelUsed: 16.8 },
      { id: '04', name: 'Tirupur Route', efficiency: 90, passengers: 68, revenue: 3400, onTime: 93, distance: 28, fuelUsed: 22.1 },
      { id: '05', name: 'Karur Connect', efficiency: 92, passengers: 78, revenue: 3900, onTime: 95, distance: 30, fuelUsed: 24.3 }
    ],

    drivers: [
      { id: 'D001', name: 'Raj Kumar', rating: 4.8, trips: 24, onTime: 96, fuelEff: 8.5, incidents: 0 },
      { id: 'D002', name: 'Muthu Vel', rating: 4.6, trips: 28, onTime: 94, fuelEff: 8.2, incidents: 1 },
      { id: 'D003', name: 'Senthil Kumar', rating: 4.9, trips: 22, onTime: 98, fuelEff: 8.8, incidents: 0 },
      { id: 'D004', name: 'Dinesh Raj', rating: 4.5, trips: 26, onTime: 92, fuelEff: 7.9, incidents: 2 },
      { id: 'D005', name: 'Arjun Dev', rating: 4.7, trips: 25, onTime: 95, fuelEff: 8.4, incidents: 0 }
    ],

    financial: [
      { month: 'Jan', revenue: 245000, expenses: 185000, profit: 60000, fuelCost: 45000 },
      { month: 'Feb', revenue: 268000, expenses: 198000, profit: 70000, fuelCost: 48000 },
      { month: 'Mar', revenue: 285000, expenses: 205000, profit: 80000, fuelCost: 52000 },
      { month: 'Apr', revenue: 290000, expenses: 210000, profit: 80000, fuelCost: 55000 },
      { month: 'May', revenue: 312000, expenses: 220000, profit: 92000, fuelCost: 58000 },
      { month: 'Jun', revenue: 295000, expenses: 215000, profit: 80000, fuelCost: 53000 }
    ],

    environmental: [
      { metric: 'CO2 Emissions', value: 2.3, unit: 'kg/km', trend: -8.5, target: 2.0 },
      { metric: 'Fuel Efficiency', value: 8.2, unit: 'km/l', trend: 5.2, target: 9.0 },
      { metric: 'Green Score', value: 87, unit: '%', trend: 12.3, target: 90 },
      { metric: 'Energy Saved', value: 145, unit: 'kWh', trend: 18.7, target: 200 }
    ]
  };

  const handleExport = (type: 'pdf' | 'excel' | 'csv') => {
    toast.loading('Generating report...', { id: 'export' });
    setTimeout(() => {
      toast.success(`${type.toUpperCase()} report downloaded successfully!`, { id: 'export' });
    }, 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Data refreshed successfully!');
    }, 1000);
  };

  const StatCard = ({ title, value, unit, change, icon: Icon, color, trend }: any) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate" title={title}>{title}</p>
          <div className="flex items-baseline gap-1 sm:gap-2 mb-1">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{value}</p>
            {unit && <span className="text-xs sm:text-sm text-gray-500 truncate">{unit}</span>}
          </div>
          {change && (
            <div className="flex items-center gap-1">
              {trend > 0 ? (
                <ArrowUp className="w-3 h-3 text-green-500 flex-shrink-0" />
              ) : (
                <ArrowDown className="w-3 h-3 text-red-500 flex-shrink-0" />
              )}
              <span className={`text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'} truncate`}>
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-gray-500 hidden sm:inline truncate">vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg ${color.bg} flex-shrink-0`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${color.text}`} />
        </div>
      </div>
    </motion.div>
  );

  const mainKPIs = [
    {
      title: 'Active Buses',
      value: kpiData.realTime.activeBuses,
      change: kpiData.trends.activeBuses,
      icon: Bus,
      color: { bg: 'bg-blue-50', text: 'text-blue-600' },
      trend: kpiData.trends.activeBuses
    },
    {
      title: 'Live Passengers',
      value: kpiData.realTime.onRoutePassengers,
      change: kpiData.trends.onRoutePassengers,
      icon: Users,
      color: { bg: 'bg-green-50', text: 'text-green-600' },
      trend: kpiData.trends.onRoutePassengers
    },
    {
      title: 'On-Time Performance',
      value: kpiData.realTime.onTimePerformance,
      unit: '%',
      change: kpiData.trends.onTimePerformance,
      icon: CheckCircle,
      color: { bg: 'bg-purple-50', text: 'text-purple-600' },
      trend: kpiData.trends.onTimePerformance
    },
    {
      title: 'Today\'s Revenue',
      value: `₹${(kpiData.realTime.currentRevenue / 1000).toFixed(1)}k`,
      change: kpiData.trends.currentRevenue,
      icon: DollarSign,
      color: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
      trend: kpiData.trends.currentRevenue
    },
    {
      title: 'Avg. Speed',
      value: kpiData.realTime.averageSpeed,
      unit: 'km/h',
      change: Math.abs(kpiData.trends.averageSpeed),
      icon: Gauge,
      color: { bg: 'bg-orange-50', text: 'text-orange-600' },
      trend: kpiData.trends.averageSpeed
    },
    {
      title: 'Fuel Efficiency',
      value: kpiData.realTime.fuelEfficiency,
      unit: 'km/l',
      change: kpiData.trends.fuelEfficiency,
      icon: Fuel,
      color: { bg: 'bg-cyan-50', text: 'text-cyan-600' },
      trend: kpiData.trends.fuelEfficiency
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Mobile Header Spacing */}
      <div className="lg:hidden h-16" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mb-6"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 flex-shrink-0"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Analytics Dashboard</h1>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base truncate">Real-time transportation insights & performance metrics</p>
            </div>
          </div>
          
          {/* Action Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-white text-gray-600 hover:text-gray-900 shadow-sm'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-2 bg-white text-gray-600 hover:text-gray-900 rounded-lg shadow-sm transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-3 py-2 bg-white text-gray-600 hover:text-gray-900 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </motion.div>

        {/* Period & Metric Selectors */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="w-full sm:w-auto overflow-x-auto">
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm min-w-max">
              {[
                { key: 'today', label: 'Today', icon: Activity },
                { key: 'week', label: 'Week', icon: Calendar },
                { key: 'month', label: 'Month', icon: BarChart3 },
                { key: 'quarter', label: 'Quarter', icon: TrendingUp }
              ].map((period) => (
                <button
                  key={period.key}
                  onClick={() => setSelectedPeriod(period.key)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedPeriod === period.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <period.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">{period.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-xs sm:text-sm text-gray-500">Auto-refresh:</span>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
                autoRefresh ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                  autoRefresh ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Routes</label>
                  <select 
                    value={selectedRoutes[0]} 
                    onChange={(e) => setSelectedRoutes([e.target.value])}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Routes</option>
                    {analyticsData.routes.map(route => (
                      <option key={route.id} value={route.id}>Route {route.id} - {route.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drivers</label>
                  <select 
                    value={selectedDrivers[0]} 
                    onChange={(e) => setSelectedDrivers([e.target.value])}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Drivers</option>
                    {analyticsData.drivers.map(driver => (
                      <option key={driver.id} value={driver.id}>{driver.name}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metric Focus</label>
                  <select 
                    value={selectedMetric} 
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="overview">Overview</option>
                    <option value="performance">Performance</option>
                    <option value="financial">Financial</option>
                    <option value="environmental">Environmental</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {mainKPIs.map((kpi) => (
            <StatCard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Real-time Status Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 shadow-sm border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Live System Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm text-green-600 font-medium">All Systems Operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Fleet Status</p>
                <p className="font-semibold text-green-600 text-sm">Operational</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 truncate">GPS Tracking</p>
                <p className="font-semibold text-blue-600 text-sm">Active</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-orange-50 rounded-lg flex-shrink-0">
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Weather</p>
                <p className="font-semibold text-orange-600 text-sm">Clear</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Safety Alerts</p>
                <p className="font-semibold text-purple-600 text-sm">None</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Charts Based on Selected Metric */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Primary Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  {selectedMetric === 'financial' ? 'Revenue vs Expenses' : 'On-Time Performance Today'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  {selectedMetric === 'financial' ? 'Monthly financial overview' : 'Hourly performance tracking'}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <LineChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="h-64 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {selectedMetric === 'financial' ? (
                  <ComposedChart data={analyticsData.financial}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                    />
                    <Bar dataKey="revenue" fill="#22c55e" name="Revenue" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} name="Profit" />
                  </ComposedChart>
                ) : (
                  <AreaChart data={analyticsData.performance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="time" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontSize: '12px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="onTime" 
                      stackId="1"
                      stroke="#22c55e" 
                      fill="#22c55e" 
                      fillOpacity={0.6}
                      name="On Time %"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="delayed" 
                      stackId="1"
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.6}
                      name="Delayed %"
                    />
                    <ReferenceLine y={95} stroke="#ef4444" strokeDasharray="5 5" label="Target" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Secondary Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Route Efficiency Analysis</h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate">Performance by route with passenger load</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="h-64 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={analyticsData.routes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="passengers" 
                    stroke="#6b7280" 
                    fontSize={11}
                    label={{ value: 'Passengers', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="efficiency" 
                    stroke="#6b7280" 
                    fontSize={11}
                    label={{ value: 'Efficiency %', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                    formatter={(value: number, name: string) => [
                      name === 'efficiency' ? `${value}%` : value,
                      name === 'efficiency' ? 'Efficiency' : 'Passengers'
                    ]}
                    labelFormatter={(label) => `Route ${label}`}
                  />
                  <Scatter dataKey="efficiency" fill="#3b82f6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Detailed Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Route Performance Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Route Performance</h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Detailed route analytics</p>
                </div>
                <Route className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passengers</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Time</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analyticsData.routes.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            <span className="text-xs sm:text-sm font-bold text-blue-600">{route.id}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{route.name}</div>
                            <div className="text-xs text-gray-500 truncate">{route.distance} km</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-900">{route.passengers}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          route.onTime >= 95 
                            ? 'bg-green-100 text-green-800' 
                            : route.onTime >= 90 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {route.onTime}%
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        ₹{route.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Driver Performance Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Top Performing Drivers</h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Driver performance metrics</p>
                </div>
                <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trips</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel Eff.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analyticsData.drivers
                    .sort((a, b) => b.rating - a.rating)
                    .map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            <span className="text-xs font-bold text-white">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{driver.name}</div>
                            <div className="text-xs text-gray-500 truncate">{driver.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs sm:text-sm text-gray-900 mr-1">{driver.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-2 h-2 sm:w-3 sm:h-3 ${
                                  i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {driver.trips}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`text-xs sm:text-sm font-medium ${
                          driver.fuelEff >= 8.5 ? 'text-green-600' : 
                          driver.fuelEff >= 8.0 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {driver.fuelEff} km/l
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Environmental Impact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 sm:mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span className="truncate">Environmental Impact</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Sustainability metrics and green initiatives</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xl sm:text-2xl font-bold text-green-600">87%</p>
              <p className="text-xs sm:text-sm text-green-600">Green Score</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {analyticsData.environmental.map((metric) => (
              <div key={metric.metric} className="bg-white rounded-lg p-3 sm:p-4 border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate pr-2" title={metric.metric}>{metric.metric}</p>
                  <div className={`flex items-center gap-1 flex-shrink-0 ${
                    metric.trend > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend > 0 ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    <span className="text-xs">{Math.abs(metric.trend)}%</span>
                  </div>
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{metric.value} {metric.unit}</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">Target: {metric.target} {metric.unit}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics; 