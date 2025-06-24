'use client';

import React from 'react';
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

interface BoardingChartsProps {
  studentCount: number;
  totalStudents: number;
  staffCount: number;
  totalStaff: number;
  weeklyData?: Array<{
    day: string;
    students: number;
    staff: number;
  }>;
  monthlyData?: Array<{
    month: string;
    attendance: number;
    total: number;
  }>;
}

const BoardingCharts: React.FC<BoardingChartsProps> = ({
  studentCount,
  totalStudents,
  staffCount,
  totalStaff,
  weeklyData = [],
  monthlyData = []
}) => {
  const studentPercentage = totalStudents > 0 ? (studentCount / totalStudents) * 100 : 0;
  const staffPercentage = totalStaff > 0 ? (staffCount / totalStaff) * 100 : 0;

  // Prepare data for pie charts
  const studentData = [
    { name: 'Present', value: studentCount, color: '#22c55e' },
    { name: 'Absent', value: totalStudents - studentCount, color: '#ef4444' }
  ];

  const staffData = [
    { name: 'Present', value: staffCount, color: '#3b82f6' },
    { name: 'Absent', value: totalStaff - staffCount, color: '#f59e0b' }
  ];

  // Default weekly data if not provided
  const defaultWeeklyData = [
    { day: 'Mon', students: 45, staff: 12 },
    { day: 'Tue', students: 52, staff: 15 },
    { day: 'Wed', students: 48, staff: 13 },
    { day: 'Thu', students: 55, staff: 14 },
    { day: 'Fri', students: 50, staff: 16 },
    { day: 'Sat', students: 30, staff: 8 },
    { day: 'Sun', students: 0, staff: 0 }
  ];

  const chartData = weeklyData.length > 0 ? weeklyData : defaultWeeklyData;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Students Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Student Attendance</h3>
            <p className="text-sm text-gray-600">Today&apos;s boarding status</p>
          </div>
          <div className="card-content">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{studentCount}</p>
                <p className="text-sm text-gray-600">Present</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-400">{totalStudents - studentCount}</p>
                <p className="text-sm text-gray-600">Absent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600">{studentPercentage.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Attendance</p>
              </div>
            </div>
            
            {/* Student Pie Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {studentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Students']}
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
          </div>
        </div>

        {/* Staff Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Staff Attendance</h3>
            <p className="text-sm text-gray-600">Today&apos;s boarding status</p>
          </div>
          <div className="card-content">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{staffCount}</p>
                <p className="text-sm text-gray-600">Present</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-400">{totalStaff - staffCount}</p>
                <p className="text-sm text-gray-600">Absent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">{staffPercentage.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Attendance</p>
              </div>
            </div>
            
            {/* Staff Pie Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={staffData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {staffData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value, 'Staff']}
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
          </div>
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Attendance Trend</h3>
          <p className="text-sm text-gray-600">Last 7 days attendance pattern</p>
        </div>
        <div className="card-content">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="day" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
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
                  stroke="#22c55e" 
                  fill="#22c55e" 
                  fillOpacity={0.6}
                  name="Students"
                />
                <Area 
                  type="monotone" 
                  dataKey="staff" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  name="Staff"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      {monthlyData.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Attendance Overview</h3>
            <p className="text-sm text-gray-600">Monthly attendance statistics</p>
          </div>
          <div className="card-content">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="attendance" 
                    fill="#22c55e" 
                    radius={[4, 4, 0, 0]}
                    name="Attendance"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardingCharts; 