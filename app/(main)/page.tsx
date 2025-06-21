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

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="lg:hidden h-16" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div {...fadeIn()} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Welcome back, {userType.charAt(0).toUpperCase() + userType.slice(1)}!
          </h1>
          <p className="text-gray-600">Here's your transportation summary for today.</p>
        </motion.div>

        {/* Next Trip Card */}
        <motion.div {...fadeIn(0.1)} className="mb-8">
          <div className="card-hover bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Your Next Trip</p>
                <h2 className="text-2xl font-bold mt-1">{userTripData.routeName}</h2>
                <p className="text-lg text-amber-400 font-semibold">{userTripData.departureTime}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">ETA</p>
                <p className="text-2xl font-bold">{userTripData.eta}</p>
                {userTripData.live && <div className="flex items-center justify-end gap-1.5 mt-1 text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> Live
                </div>}
              </div>
            </div>
            <button
              onClick={() => router.push('/live-tracking')}
              className="mt-4 w-full text-center py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-semibold"
            >
              Track on Live Map
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div {...fadeIn(0.2)}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.title}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(action.href)}
                    className="bg-white rounded-xl p-4 text-left shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-3 shadow-md`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-500">{action.subtitle}</p>
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Info</h2>
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