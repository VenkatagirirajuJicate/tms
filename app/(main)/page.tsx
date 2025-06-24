'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Bus, 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight,
  QrCode,
  CreditCard,
  Navigation,
  CheckCircle,
  Bell,
  HelpCircle,
  ShieldCheck,
  MessageSquareWarning,
  CircleDollarSign
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Mock data for the user's next trip and payment status
const userTripData = {
  routeNumber: '17',
  routeName: 'Thiruvagowndanoor Bypass',
  departureTime: '07:10 AM',
  eta: '12 minutes',
  live: true,
  seatNumber: 'A12',
  boardingPoint: 'Main Gate',
  nextStop: 'College Junction',
  busNumber: 'TN45-BUS-2024',
  driverName: 'Rajesh Kumar',
  driverRating: 4.8,
  passengerCount: 28,
  totalSeats: 45,
  delayStatus: 'on-time', // 'on-time', 'delayed', 'early'
  estimatedArrival: '07:22 AM'
};

const userPaymentStatus = {
  status: 'Cleared',
  dueDate: null,
  amount: 1500
};

const HomeScreen = () => {
  const router = useRouter();
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCardDetails, setShowCardDetails] = useState(false);

  useEffect(() => {
    const userTypeStored = localStorage.getItem('userType') || 'student';
    const userEmailStored = localStorage.getItem('userEmail') || 'demo@example.com';
    
    setUserType(userTypeStored);
    setUserEmail(userEmailStored);

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    { title: 'Scan QR', subtitle: 'Quickly check-in', icon: QrCode, color: 'from-blue-500 to-indigo-600', href: '/scan' },
    { title: 'Live Map', subtitle: 'Track your bus', icon: Navigation, color: 'from-green-500 to-emerald-600', href: '/live-tracking' },
    { title: 'Schedules', subtitle: 'View timings', icon: Calendar, color: 'from-purple-500 to-violet-600', href: '/schedules' },
    { title: 'Payments', subtitle: 'Manage fees', icon: CreditCard, color: 'from-orange-500 to-red-600', href: '/payments' }
  ];

  const stats = [
    { title: 'Your Route', value: userTripData.routeNumber, icon: Bus, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Current Time', value: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }), icon: Clock, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Date', value: currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }), icon: Calendar, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  const recentActivities = [
    { id: 1, action: 'QR Code scanned for Route 17', time: '2m ago', status: 'success', icon: CheckCircle },
    { id: 2, action: 'Payment of ₹1500 received', time: '1h ago', status: 'success', icon: CircleDollarSign },
    { id: 3, action: 'Route 5 schedule updated', time: '3h ago', status: 'info', icon: Bell },
    { id: 4, action: 'Grievance #1024 status changed', time: '1d ago', status: 'info', icon: MessageSquareWarning },
  ];

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay }
  });

  // Theme configuration for minimal theme
  const currentTheme = {
    bg: 'bg-white border-2 border-gray-100 shadow-sm',
    text: 'text-gray-900',
    subtitle: 'text-gray-500',
    accent: 'text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="lg:hidden h-16" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div {...fadeIn()} className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 leading-tight">
            Welcome back, {userType.charAt(0).toUpperCase() + userType.slice(1)}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Here&apos;s your transportation summary for today.</p>
        </motion.div>

        {/* Enhanced Next Trip Card - Minimal Theme */}
        <motion.div {...fadeIn(0.1)} className="mb-6 sm:mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Next Trip</h2>
          <div className={`relative overflow-hidden ${currentTheme.bg} rounded-2xl shadow-xl transition-all duration-300`}>
            <div className="relative p-4 sm:p-6">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Bus className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-lg sm:text-xl font-bold ${currentTheme.text} leading-tight`}>
                      {userTripData.routeName}
                    </h3>
                    <p className={`text-sm ${currentTheme.subtitle}`}>
                      Route {userTripData.routeNumber} • {userTripData.busNumber}
                    </p>
                  </div>
                </div>
                
                {/* Status Badges - Fixed for Minimal Theme */}
                <div className="flex flex-col items-end gap-2 ml-3">
                  {userTripData.live && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs font-medium text-emerald-700">Live</span>
                    </div>
                  )}
                  <div className={`px-3 py-1.5 rounded-full border ${
                    userTripData.delayStatus === 'on-time' ? 'bg-green-50 border-green-200' :
                    userTripData.delayStatus === 'delayed' ? 'bg-red-50 border-red-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <span className={`text-xs font-medium ${
                      userTripData.delayStatus === 'on-time' ? 'text-green-700' :
                      userTripData.delayStatus === 'delayed' ? 'text-red-700' :
                      'text-blue-700'
                    }`}>
                      {userTripData.delayStatus === 'on-time' ? 'On Time' : 
                       userTripData.delayStatus === 'delayed' ? 'Delayed' : 'Early'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <Clock className={`w-4 h-4 mx-auto mb-1 ${currentTheme.accent}`} />
                  <p className={`text-xs ${currentTheme.subtitle}`}>Departure</p>
                  <p className={`text-sm font-bold ${currentTheme.text}`}>{userTripData.departureTime}</p>
                </div>
                <div className="text-center">
                  <MapPin className={`w-4 h-4 mx-auto mb-1 ${currentTheme.accent}`} />
                  <p className={`text-xs ${currentTheme.subtitle}`}>ETA</p>
                  <p className={`text-sm font-bold ${currentTheme.text}`}>{userTripData.eta}</p>
                </div>
                <div className="text-center">
                  <User className={`w-4 h-4 mx-auto mb-1 ${currentTheme.accent}`} />
                  <p className={`text-xs ${currentTheme.subtitle}`}>Seat</p>
                  <p className={`text-sm font-bold ${currentTheme.text}`}>{userTripData.seatNumber}</p>
                </div>
                <div className="text-center">
                  <Bus className={`w-4 h-4 mx-auto mb-1 ${currentTheme.accent}`} />
                  <p className={`text-xs ${currentTheme.subtitle}`}>Passengers</p>
                  <p className={`text-sm font-bold ${currentTheme.text}`}>{userTripData.passengerCount}/{userTripData.totalSeats}</p>
                </div>
              </div>

              {/* Expandable Details */}
              <motion.div
                initial={false}
                animate={{ height: showCardDetails ? 'auto' : 0, opacity: showCardDetails ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Boarding Point</p>
                      <p className="text-sm font-medium text-gray-900">{userTripData.boardingPoint}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Next Stop</p>
                      <p className="text-sm font-medium text-gray-900">{userTripData.nextStop}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Driver</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{userTripData.driverName}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i < Math.floor(userTripData.driverRating) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                          ))}
                          <span className="text-xs text-gray-500">({userTripData.driverRating})</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Arrival Time</p>
                      <p className="text-sm font-medium text-gray-900">{userTripData.estimatedArrival}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons - Optimized for Minimal Theme */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push('/live-tracking')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-200 font-semibold text-sm backdrop-blur-sm border bg-blue-600 hover:bg-blue-700 text-white border-blue-600 group"
                >
                  <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Track Live</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={() => setShowCardDetails(!showCardDetails)}
                  className="px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm border bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700"
                >
                  {showCardDetails ? 'Less' : 'More'}
                </button>

                <button
                  onClick={() => toast.success('Trip details copied to clipboard')}
                  className="p-3 rounded-xl transition-all duration-200 border bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div {...fadeIn(0.2)}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.title}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(action.href)}
                    className="bg-white rounded-xl p-4 sm:p-5 text-left shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group min-h-[120px] flex flex-col justify-between"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow duration-200`}>
                      <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-tight mb-1">{action.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-tight">{action.subtitle}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div {...fadeIn(0.3)}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
              <div className="card p-4">
                <div className="space-y-2">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <motion.div {...fadeIn(0.4)} className="space-y-8">
            {/* Stats */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Today&apos;s Info</h2>
              <div className="card p-4">
                <div className="space-y-3">
                  {stats.map((stat) => (
                    <div key={stat.title} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <p className="font-medium text-gray-700 text-sm">{stat.title}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">More Options</h2>
              <div className="card p-4">
                <div className="space-y-1">
                  <QuickLink href="/payments" icon={ShieldCheck} text="Fees Status" status={userPaymentStatus.status} statusColor={userPaymentStatus.status === 'Cleared' ? 'text-green-500' : 'text-red-500'}/>
                  <QuickLink href="/grievances" icon={MessageSquareWarning} text="Raise a Grievance" />
                  <QuickLink href="/profile" icon={User} text="Update Your Profile" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const QuickLink = ({ href, icon: Icon, text, status, statusColor }: { href: string, icon: React.ElementType, text: string, status?: string, statusColor?: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors group"
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
        <span className="font-medium text-gray-700 group-hover:text-gray-900 text-sm">{text}</span>
      </div>
      <div className="flex items-center gap-2">
        {status && <span className={`text-sm font-semibold ${statusColor}`}>{status}</span>}
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
};

export default HomeScreen;