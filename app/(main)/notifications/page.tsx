'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Search, 
  Filter,
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Bus,
  CreditCard,
  MapPin,
  Clock,
  Settings,
  Trash2,
  Archive,
  MoreVertical,
  Eye,
  EyeOff,
  CalendarDays,
  Route,
  DollarSign,
  AlertCircle,
  Smartphone,
  Zap,
  Heart,
  Star,
  MessageSquare,
  ShieldCheck,
  Wifi,
  WifiOff
} from 'lucide-react';

// Enhanced notification types and categories
export interface Notification {
  id: string;
  title: string;
  message: string;
  category: 'transport' | 'payment' | 'system' | 'schedule' | 'emergency' | 'social';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: Date;
  isRead: boolean;
  isArchived: boolean;
  actionable: boolean;
  actions?: {
    primary?: { label: string; action: string };
    secondary?: { label: string; action: string };
  };
  metadata?: {
    routeId?: string;
    amount?: number;
    location?: string;
    dueDate?: Date;
  };
  avatar?: string;
  image?: string;
}

// Rich notification data with various types
const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Bus Arriving Soon',
    message: 'Route 12 to Erode Central will arrive at your stop in 3 minutes',
    category: 'transport',
    priority: 'high',
    type: 'info',
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    isRead: false,
    isArchived: false,
    actionable: true,
    actions: {
      primary: { label: 'Track Live', action: 'track' },
      secondary: { label: 'View Route', action: 'route' }
    },
    metadata: { routeId: '12', location: 'College Gate' }
  },
  {
    id: 'n2',
    title: 'Payment Due Reminder',
    message: 'Your semester transportation fee of ₹2,500 is due in 2 days',
    category: 'payment',
    priority: 'high',
    type: 'warning',
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false,
    isArchived: false,
    actionable: true,
    actions: {
      primary: { label: 'Pay Now', action: 'pay' },
      secondary: { label: 'View Details', action: 'details' }
    },
    metadata: { amount: 2500, dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) }
  },
  {
    id: 'n3',
    title: 'Trip Confirmed',
    message: 'Your booking for Route 8 tomorrow at 8:30 AM has been confirmed',
    category: 'schedule',
    priority: 'medium',
    type: 'success',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    isArchived: false,
    actionable: true,
    actions: {
      primary: { label: 'View Ticket', action: 'ticket' },
      secondary: { label: 'Cancel Trip', action: 'cancel' }
    },
    metadata: { routeId: '8' }
  },
  {
    id: 'n4',
    title: 'Service Disruption Alert',
    message: 'Route 15 services temporarily suspended due to road maintenance',
    category: 'transport',
    priority: 'urgent',
    type: 'error',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    isArchived: false,
    actionable: true,
    actions: {
      primary: { label: 'Find Alternative', action: 'alternative' },
      secondary: { label: 'Get Updates', action: 'updates' }
    },
    metadata: { routeId: '15' }
  },
  {
    id: 'n5',
    title: 'Payment Successful',
    message: 'Your payment of ₹2,500 for semester transportation has been processed',
    category: 'payment',
    priority: 'medium',
    type: 'success',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    isArchived: false,
    actionable: true,
    actions: {
      primary: { label: 'Download Receipt', action: 'receipt' },
      secondary: { label: 'View Transaction', action: 'transaction' }
    },
    metadata: { amount: 2500 }
  },
  {
    id: 'n6',
    title: 'New Route Available',
    message: 'Route 22 to Tech Park is now available for booking',
    category: 'transport',
    priority: 'low',
    type: 'info',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    isArchived: false,
    actionable: true,
    actions: {
      primary: { label: 'Explore Route', action: 'explore' },
      secondary: { label: 'Book Now', action: 'book' }
    },
    metadata: { routeId: '22' }
  },
  {
    id: 'n7',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM',
    category: 'system',
    priority: 'low',
    type: 'info',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: true,
    isArchived: false,
    actionable: false
  }
];

// Category configurations
const categories = {
  transport: { icon: Bus, color: 'text-blue-600 bg-blue-100', label: 'Transport' },
  payment: { icon: CreditCard, color: 'text-green-600 bg-green-100', label: 'Payment' },
  schedule: { icon: CalendarDays, color: 'text-purple-600 bg-purple-100', label: 'Schedule' },
  system: { icon: Settings, color: 'text-gray-600 bg-gray-100', label: 'System' },
  emergency: { icon: AlertTriangle, color: 'text-red-600 bg-red-100', label: 'Emergency' },
  social: { icon: MessageSquare, color: 'text-pink-600 bg-pink-100', label: 'Social' }
};

// Priority configurations
const priorities = {
  low: { color: 'text-gray-500', indicator: 'border-l-gray-400' },
  medium: { color: 'text-blue-600', indicator: 'border-l-blue-500' },
  high: { color: 'text-orange-600', indicator: 'border-l-orange-500' },
  urgent: { color: 'text-red-600', indicator: 'border-l-red-500' }
};

// Type configurations
const types = {
  info: { icon: Info, color: 'text-blue-600' },
  success: { icon: CheckCircle, color: 'text-green-600' },
  warning: { icon: AlertTriangle, color: 'text-yellow-600' },
  error: { icon: XCircle, color: 'text-red-600' }
};

// Time formatting utility
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

// Enhanced notification item component
const NotificationItem: React.FC<{
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onAction: (id: string, action: string) => void;
}> = ({ notification, onMarkAsRead, onMarkAsUnread, onArchive, onDelete, onAction }) => {
  const [showActions, setShowActions] = useState(false);
  const CategoryIcon = categories[notification.category].icon;
  const TypeIcon = types[notification.type].icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`relative bg-white border border-gray-200 border-l-4 ${priorities[notification.priority].indicator} mb-3 rounded-r-lg overflow-hidden shadow-sm`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${categories[notification.category].color}`}>
              <CategoryIcon className="w-4 h-4" />
            </div>
                          <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className={`font-semibold ${notification.isRead ? 'text-gray-500' : 'text-gray-900'}`}>
                    {notification.title}
                  </h3>
                  <TypeIcon className={`w-4 h-4 ${types[notification.type].color}`} />
                  {notification.priority === 'urgent' && (
                    <Zap className="w-4 h-4 text-red-500 animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatRelativeTime(notification.createdAt)}
                </p>
              </div>
          </div>
          
          {/* Actions menu */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            
            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10"
                >
                  <button
                    onClick={() => {
                      notification.isRead ? onMarkAsUnread(notification.id) : onMarkAsRead(notification.id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 text-sm text-gray-700 w-full text-left"
                  >
                    {notification.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>Mark as {notification.isRead ? 'unread' : 'read'}</span>
                  </button>
                  <button
                    onClick={() => {
                      onArchive(notification.id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 text-sm text-gray-700 w-full text-left"
                  >
                    <Archive className="w-4 h-4" />
                    <span>Archive</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(notification.id);
                      setShowActions(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 text-sm text-red-600 w-full text-left"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Message */}
        <p className={`text-sm mb-3 ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
          {notification.message}
        </p>
        
        {/* Metadata */}
        {notification.metadata && (
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
            {notification.metadata.routeId && (
              <span className="flex items-center space-x-1">
                <Route className="w-3 h-3" />
                <span>Route {notification.metadata.routeId}</span>
              </span>
            )}
            {notification.metadata.amount && (
              <span className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3" />
                <span>₹{notification.metadata.amount.toLocaleString('en-IN')}</span>
              </span>
            )}
            {notification.metadata.location && (
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{notification.metadata.location}</span>
              </span>
            )}
          </div>
        )}
        
        {/* Action buttons */}
        {notification.actionable && notification.actions && (
          <div className="flex space-x-2">
            {notification.actions.primary && (
              <button
                onClick={() => onAction(notification.id, notification.actions!.primary!.action)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                {notification.actions.primary.label}
              </button>
            )}
            {notification.actions.secondary && (
              <button
                onClick={() => onAction(notification.id, notification.actions!.secondary!.action)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                {notification.actions.secondary.label}
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Unread indicator */}
      {!notification.isRead && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full"></div>
      )}
    </motion.div>
  );
};

// Enhanced search and filter bar
const SearchAndFilterBar: React.FC<{
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
  showUnreadOnly: boolean;
  onUnreadToggle: () => void;
}> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  showUnreadOnly,
  onUnreadToggle
}) => {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="space-y-3 mb-6">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>
      
      {/* Filter options */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-4 space-y-4 shadow-sm"
          >
            {/* Category filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onCategoryChange('')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === '' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {Object.entries(categories).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => onCategoryChange(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === key 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Priority filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onPriorityChange('')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedPriority === '' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {Object.entries(priorities).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => onPriorityChange(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedPriority === key 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Unread filter */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Show unread only</span>
              <button
                onClick={onUnreadToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showUnreadOnly ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showUnreadOnly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main notification screen component
const NotificationScreen: React.FC = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  
  // Computed values
  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.isRead && !n.isArchived).length, 
    [notifications]
  );
  
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        if (!notification.title.toLowerCase().includes(searchLower) &&
            !notification.message.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      // Category filter
      if (selectedCategory && notification.category !== selectedCategory) {
        return false;
      }
      
      // Priority filter
      if (selectedPriority && notification.priority !== selectedPriority) {
        return false;
      }
      
      // Unread filter
      if (showUnreadOnly && notification.isRead) {
        return false;
      }
      
      // Archived filter
      if (notification.isArchived !== showArchived) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by priority first, then by date
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [notifications, searchQuery, selectedCategory, selectedPriority, showUnreadOnly, showArchived]);
  
  // Handlers
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };
  
  const handleMarkAsUnread = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: false } : n
    ));
  };
  
  const handleArchive = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isArchived: true } : n
    ));
  };
  
  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const handleAction = (id: string, action: string) => {
    console.log('Action:', action, 'for notification:', id);
    // Handle different actions
    switch (action) {
      case 'track':
        router.push('/live-tracking');
        break;
      case 'pay':
        router.push('/payments');
        break;
      case 'ticket':
        router.push('/eticket');
        break;
      case 'receipt':
        router.push('/e-receipt');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };
  
  const handleClearAll = () => {
    setNotifications(prev => prev.filter(n => !n.isRead));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="lg:hidden h-16" />
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => router.push('/notification-control')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
                showArchived ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Archive className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Search and filters */}
        <SearchAndFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          showUnreadOnly={showUnreadOnly}
          onUnreadToggle={() => setShowUnreadOnly(!showUnreadOnly)}
        />
        
                 {/* Bulk actions */}
         {filteredNotifications.length > 0 && (
           <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
             <span className="text-sm text-gray-700">
               {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
             </span>
             <div className="flex space-x-2">
               <button
                 onClick={handleMarkAllAsRead}
                 className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
               >
                 Mark all read
               </button>
               <button
                 onClick={handleClearAll}
                 className="text-sm text-red-600 hover:text-red-700 transition-colors"
               >
                 Clear read
               </button>
             </div>
           </div>
         )}
        
        {/* Notifications list */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {showArchived ? 'No archived notifications' : 
                   searchQuery ? 'No notifications found' : 
                   'No notifications yet'}
                </h3>
                <p className="text-gray-500">
                  {showArchived ? 'Your archived notifications will appear here' :
                   searchQuery ? 'Try adjusting your search or filters' :
                   'Stay tuned for updates about your transportation'}
                </p>
              </motion.div>
            ) : (
              filteredNotifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAsUnread={handleMarkAsUnread}
                  onArchive={handleArchive}
                  onDelete={handleDelete}
                  onAction={handleAction}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen; 