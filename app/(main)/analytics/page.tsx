'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, TrendingUp, Users, Bus, Clock, MapPin } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const Analytics = () => {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', attendance: 85, trips: 120, revenue: 45000 },
    { month: 'Feb', attendance: 88, trips: 125, revenue: 48000 },
    { month: 'Mar', attendance: 92, trips: 130, revenue: 52000 },
    { month: 'Apr', attendance: 89, trips: 128, revenue: 49000 },
    { month: 'May', attendance: 94, trips: 135, revenue: 55000 },
    { month: 'Jun', attendance: 91, trips: 132, revenue: 51000 },
  ];

  const weeklyData = [
    { day: 'Mon', students: 45, staff: 12, total: 57 },
    { day: 'Tue', students: 52, staff: 15, total: 67 },
    { day: 'Wed', students: 48, staff: 13, total: 61 },
    { day: 'Thu', students: 55, staff: 14, total: 69 },
    { day: 'Fri', students: 50, staff: 16, total: 66 },
    { day: 'Sat', students: 30, staff: 8, total: 38 },
    { day: 'Sun', students: 0, staff: 0, total: 0 },
  ];

  const routeData = [
    { route: 'Route 1', passengers: 45, efficiency: 92 },
    { route: 'Route 2', passengers: 38, efficiency: 88 },
    { route: 'Route 3', passengers: 52, efficiency: 95 },
    { route: 'Route 4', passengers: 41, efficiency: 90 },
    { route: 'Route 5', passengers: 35, efficiency: 85 },
  ];

  const attendanceData = [
    { name: 'Present', value: 245, color: '#22c55e' },
    { name: 'Absent', value: 28, color: '#ef4444' },
    { name: 'Late', value: 15, color: '#f59e0b' },
  ];

  const stats = [
    {
      title: 'Total Attendance',
      value: '288',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      title: 'Active Routes',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: Bus,
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    },
    {
      title: 'Avg. Trip Time',
      value: '45m',
      change: '-5m',
      changeType: 'positive',
      icon: Clock,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50'
    },
    {
      title: 'Total Distance',
      value: '1,240km',
      change: '+8%',
      changeType: 'positive',
      icon: MapPin,
      color: 'text-error-600',
      bgColor: 'bg-error-50'
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Transportation performance insights</p>
            </div>
          </div>
          
          {/* Period Selector */}
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
            {['week', 'month', 'quarter'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={stat.title} className="card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`w-4 h-4 ${
                      stat.changeType === 'positive' ? 'text-success-500' : 'text-error-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trends */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
              <p className="text-sm text-gray-600">Attendance, trips, and revenue trends</p>
            </div>
            <div className="card-content">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Attendance %" />
                    <Bar dataKey="trips" fill="#22c55e" radius={[4, 4, 0, 0]} name="Trips" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Weekly Attendance */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Attendance</h3>
              <p className="text-sm text-gray-600">Daily attendance patterns</p>
            </div>
            <div className="card-content">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="students" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6}
                      name="Students"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="staff" 
                      stackId="1"
                      stroke="#22c55e" 
                      fill="#22c55e" 
                      fillOpacity={0.6}
                      name="Staff"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Route Performance */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Route Performance</h3>
              <p className="text-sm text-gray-600">Passenger count and efficiency by route</p>
            </div>
            <div className="card-content">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={routeData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis type="number" stroke="#6b7280" fontSize={12} />
                    <YAxis dataKey="route" type="category" stroke="#6b7280" fontSize={12} width={80} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="passengers" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Passengers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Attendance Distribution */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
              <p className="text-sm text-gray-600">Current day attendance breakdown</p>
            </div>
            <div className="card-content">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [value, 'People']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4">
                {attendanceData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 