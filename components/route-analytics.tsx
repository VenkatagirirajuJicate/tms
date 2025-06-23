import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Clock, Users, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

interface RouteAnalyticsProps {
  routeNumber: string;
}

const RouteAnalytics: React.FC<RouteAnalyticsProps> = ({ routeNumber }) => {
  // Mock data - in real app, this would come from API
  const weeklyOccupancyData = [
    { day: 'Mon', occupancy: 85, onTime: 92 },
    { day: 'Tue', occupancy: 78, onTime: 88 },
    { day: 'Wed', occupancy: 82, onTime: 95 },
    { day: 'Thu', occupancy: 88, onTime: 90 },
    { day: 'Fri', occupancy: 92, onTime: 87 },
    { day: 'Sat', occupancy: 65, onTime: 93 },
  ];

  const monthlyTrendsData = [
    { month: 'Jan', passengers: 1250, satisfaction: 4.2 },
    { month: 'Feb', passengers: 1180, satisfaction: 4.1 },
    { month: 'Mar', passengers: 1320, satisfaction: 4.4 },
    { month: 'Apr', passengers: 1280, satisfaction: 4.3 },
    { month: 'May', passengers: 1150, satisfaction: 4.0 },
    { month: 'Jun', passengers: 1200, satisfaction: 4.2 },
  ];

  const punctualityData = [
    { name: 'On Time', value: 87, color: '#22c55e' },
    { name: 'Delayed (0-5 min)', value: 10, color: '#f59e0b' },
    { name: 'Delayed (5+ min)', value: 3, color: '#ef4444' },
  ];

  const performanceMetrics = {
    avgOccupancy: 85,
    onTimePerformance: 89,
    totalTrips: 124,
    avgDelay: 2.3,
    satisfactionScore: 4.2,
    fuelEfficiency: 12.5,
  };

  const recentIssues = [
    { id: 1, type: 'delay', message: 'Traffic congestion at Erode Junction', time: '2 hours ago', severity: 'medium' },
    { id: 2, type: 'maintenance', message: 'Scheduled maintenance completed', time: '1 day ago', severity: 'low' },
    { id: 3, type: 'passenger', message: 'Passenger feedback: AC not working', time: '3 days ago', severity: 'medium' },
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Avg Occupancy"
          value={`${performanceMetrics.avgOccupancy}%`}
          trend={+3.2}
          color="blue"
        />
        <MetricCard
          icon={<Clock className="w-5 h-5" />}
          label="On-Time"
          value={`${performanceMetrics.onTimePerformance}%`}
          trend={-1.1}
          color="green"
        />
        <MetricCard
          icon={<MapPin className="w-5 h-5" />}
          label="Total Trips"
          value={performanceMetrics.totalTrips.toString()}
          trend={+8.5}
          color="purple"
        />
        <MetricCard
          icon={<AlertTriangle className="w-5 h-5" />}
          label="Avg Delay"
          value={`${performanceMetrics.avgDelay}min`}
          trend={-0.8}
          color="orange"
        />
        <MetricCard
          icon={<CheckCircle className="w-5 h-5" />}
          label="Satisfaction"
          value={`${performanceMetrics.satisfactionScore}/5`}
          trend={+0.2}
          color="emerald"
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Fuel Efficiency"
          value={`${performanceMetrics.fuelEfficiency}km/l`}
          trend={+1.3}
          color="indigo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Occupancy Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyOccupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occupancy" fill="#3b82f6" name="Occupancy %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="onTime" fill="#22c55e" name="On-Time %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Punctuality Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Punctuality Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={punctualityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {punctualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyTrendsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="passengers"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              name="Passengers"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="satisfaction"
              stroke="#22c55e"
              strokeWidth={3}
              name="Satisfaction Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Issues & Alerts */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues & Updates</h3>
        <div className="space-y-3">
          {recentIssues.map((issue) => (
            <div
              key={issue.id}
              className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${
                issue.severity === 'high'
                  ? 'bg-red-50 border-red-400'
                  : issue.severity === 'medium'
                  ? 'bg-yellow-50 border-yellow-400'
                  : 'bg-green-50 border-green-400'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${
                issue.severity === 'high'
                  ? 'bg-red-400'
                  : issue.severity === 'medium'
                  ? 'bg-yellow-400'
                  : 'bg-green-400'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{issue.message}</p>
                <p className="text-xs text-gray-500 mt-1">{issue.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: number;
  color: string;
}> = ({ icon, label, value, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    indigo: 'bg-indigo-100 text-indigo-600',
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      {trend !== undefined && (
        <div className={`flex items-center text-xs mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className={`w-3 h-3 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
          {Math.abs(trend)}% vs last week
        </div>
      )}
    </div>
  );
};

export default RouteAnalytics; 