'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  BellOff, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  Moon, 
  Sun, 
  Smartphone, 
  MessageSquare, 
  AlertTriangle, 
  Settings, 
  Info, 
  Clock, 
  Zap, 
  Shield, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Bus, 
  CheckCircle,
  RotateCcw,
  HelpCircle,
  Lightbulb,
  Filter,
  BarChart3,
  Target
} from 'lucide-react';

// Notification settings interface
interface NotificationSettings {
  enabled: boolean;
  categories: {
    transport: boolean;
    payment: boolean;
    schedule: boolean;
    system: boolean;
    emergency: boolean;
    social: boolean;
  };
  priorities: {
    low: boolean;
    medium: boolean;
    high: boolean;
    urgent: boolean;
  };
  delivery: {
    sound: boolean;
    vibration: boolean;
    badge: boolean;
    popup: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    allowUrgent: boolean;
  };
  frequency: {
    bundling: boolean;
    delay: number; // in minutes
    maxPerHour: number;
  };
  smartFeatures: {
    locationBased: boolean;
    predictive: boolean;
    autoArchive: boolean;
    duplicateFilter: boolean;
  };
}

// Default settings
const defaultSettings: NotificationSettings = {
  enabled: true,
  categories: {
    transport: true,
    payment: true,
    schedule: true,
    system: true,
    emergency: true,
    social: false
  },
  priorities: {
    low: true,
    medium: true,
    high: true,
    urgent: true
  },
  delivery: {
    sound: true,
    vibration: true,
    badge: true,
    popup: true
  },
  quietHours: {
    enabled: false,
    startTime: '22:00',
    endTime: '07:00',
    allowUrgent: true
  },
  frequency: {
    bundling: true,
    delay: 2,
    maxPerHour: 10
  },
  smartFeatures: {
    locationBased: true,
    predictive: false,
    autoArchive: true,
    duplicateFilter: true
  }
};

// Category configurations with detailed info
const categoryConfig = {
  transport: {
    icon: Bus,
    label: 'Transportation',
    description: 'Bus arrivals, delays, route changes',
    color: 'text-blue-500 bg-blue-100'
  },
  payment: {
    icon: CreditCard,
    label: 'Payments',
    description: 'Fee reminders, payment confirmations',
    color: 'text-green-500 bg-green-100'
  },
  schedule: {
    icon: Calendar,
    label: 'Schedules',
    description: 'Trip bookings, confirmations, cancellations',
    color: 'text-purple-500 bg-purple-100'
  },
  system: {
    icon: Settings,
    label: 'System',
    description: 'App updates, maintenance notices',
    color: 'text-gray-500 bg-gray-100'
  },
  emergency: {
    icon: AlertTriangle,
    label: 'Emergency',
    description: 'Service disruptions, urgent alerts',
    color: 'text-red-500 bg-red-100'
  },
  social: {
    icon: MessageSquare,
    label: 'Social',
    description: 'Community updates, announcements',
    color: 'text-pink-500 bg-pink-100'
  }
};

// Priority configurations
const priorityConfig = {
  low: { label: 'Low Priority', color: 'text-gray-400', description: 'General information' },
  medium: { label: 'Medium Priority', color: 'text-blue-400', description: 'Important updates' },
  high: { label: 'High Priority', color: 'text-orange-400', description: 'Needs attention' },
  urgent: { label: 'Urgent', color: 'text-red-400', description: 'Immediate action required' }
};

// Enhanced toggle component
const Toggle: React.FC<{
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({ enabled, onChange, disabled = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-13'
  };
  
  const thumbSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const translateClasses = {
    sm: enabled ? 'translate-x-5' : 'translate-x-1',
    md: enabled ? 'translate-x-6' : 'translate-x-1',
    lg: enabled ? 'translate-x-7' : 'translate-x-1'
  };
  
  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`relative inline-flex ${sizeClasses[size]} items-center rounded-full transition-colors duration-200 ${
        disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : enabled 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-gray-600 hover:bg-gray-700'
      }`}
    >
      <span
        className={`inline-block ${thumbSizeClasses[size]} transform rounded-full bg-white transition-transform duration-200 ${translateClasses[size]}`}
      />
    </button>
  );
};

// Setting item component
const SettingItem: React.FC<{
  icon?: React.ReactNode;
  label: string;
  description?: string;
  action: React.ReactNode;
  disabled?: boolean;
}> = ({ icon, label, description, action, disabled = false }) => (
  <div className={`flex items-center justify-between p-4 ${disabled ? 'opacity-50' : ''}`}>
    <div className="flex items-center space-x-3 flex-1">
      {icon && (
        <div className="p-2 bg-white/10 rounded-lg">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-gray-900 font-medium">{label}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
    </div>
    <div className="ml-4">
      {action}
    </div>
  </div>
);

// Time picker component
const TimePicker: React.FC<{
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}> = ({ value, onChange, disabled = false }) => (
  <input
    type="time"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
  />
);

// Number input component
const NumberInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}> = ({ value, onChange, min = 0, max = 100, disabled = false }) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onChange(parseInt(e.target.value) || 0)}
    min={min}
    max={max}
    disabled={disabled}
    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
  />
);

// Section header component
const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ icon, title, description, action }) => (
  <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    </div>
    {action}
  </div>
);

// Main notification control component
const NotificationControl: React.FC = () => {
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<'general' | 'categories' | 'advanced' | 'analytics'>('general');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: NotificationSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  // Update specific setting
  const updateSetting = (path: string, value: any) => {
    const newSettings = { ...settings };
    const keys = path.split('.');
    let current: any = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    saveSettings(newSettings);
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setIsLoading(true);
    setTimeout(() => {
      saveSettings(defaultSettings);
      setIsLoading(false);
      setShowResetConfirm(false);
    }, 1000);
  };

  // Request permission (mock)
  const requestPermission = async () => {
    setIsLoading(true);
    // Simulate permission request
    await new Promise(resolve => setTimeout(resolve, 1500));
    updateSetting('enabled', true);
    setIsLoading(false);
  };

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            {/* Master toggle */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <SectionHeader
                icon={<Bell className="w-5 h-5" />}
                title="Notifications"
                description="Control all notification delivery"
                action={
                  <Toggle
                    enabled={settings.enabled}
                    onChange={(enabled) => updateSetting('enabled', enabled)}
                    size="lg"
                  />
                }
              />
              
              {!settings.enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <BellOff className="w-4 h-4 text-yellow-500" />
                    <p className="text-sm text-yellow-200">
                      Notifications are disabled. You'll miss important updates.
                    </p>
                  </div>
                  <button
                    onClick={requestPermission}
                    disabled={isLoading}
                    className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Enabling...' : 'Enable Notifications'}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Delivery methods */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <SectionHeader
                icon={<Smartphone className="w-5 h-5" />}
                title="Delivery Methods"
                description="How you want to receive notifications"
              />
              
              <div className="space-y-4">
                <SettingItem
                  icon={<Volume2 className="w-4 h-4 text-blue-400" />}
                  label="Sound"
                  description="Play notification sounds"
                  action={
                    <Toggle
                      enabled={settings.delivery.sound}
                      onChange={(enabled) => updateSetting('delivery.sound', enabled)}
                      disabled={!settings.enabled}
                    />
                  }
                  disabled={!settings.enabled}
                />
                
                <SettingItem
                  icon={<Vibrate className="w-4 h-4 text-purple-400" />}
                  label="Vibration"
                  description="Vibrate on notifications"
                  action={
                    <Toggle
                      enabled={settings.delivery.vibration}
                      onChange={(enabled) => updateSetting('delivery.vibration', enabled)}
                      disabled={!settings.enabled}
                    />
                  }
                  disabled={!settings.enabled}
                />
                
                <SettingItem
                  icon={<Target className="w-4 h-4 text-red-400" />}
                  label="Badge"
                  description="Show unread count on app icon"
                  action={
                    <Toggle
                      enabled={settings.delivery.badge}
                      onChange={(enabled) => updateSetting('delivery.badge', enabled)}
                      disabled={!settings.enabled}
                    />
                  }
                  disabled={!settings.enabled}
                />
                
                <SettingItem
                  icon={<MessageSquare className="w-4 h-4 text-green-400" />}
                  label="Pop-up"
                  description="Show notification banners"
                  action={
                    <Toggle
                      enabled={settings.delivery.popup}
                      onChange={(enabled) => updateSetting('delivery.popup', enabled)}
                      disabled={!settings.enabled}
                    />
                  }
                  disabled={!settings.enabled}
                />
              </div>
            </div>

            {/* Sound settings */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <SettingItem
                icon={<Volume2 className="w-4 h-4 text-blue-400" />}
                label="Notification Sound"
                description="Choose your notification tone"
                action={
                  <button
                    onClick={() => router.push('/notification-sound')}
                    disabled={!settings.enabled || !settings.delivery.sound}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                  >
                    <span className="text-sm">Configure</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                }
                disabled={!settings.enabled || !settings.delivery.sound}
              />
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-6">
            {/* Priority settings */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <SectionHeader
                icon={<Zap className="w-5 h-5" />}
                title="Priority Levels"
                description="Control which priority levels to receive"
              />
              
              <div className="space-y-4">
                {Object.entries(priorityConfig).map(([key, config]) => (
                  <SettingItem
                    key={key}
                    label={config.label}
                    description={config.description}
                    action={
                      <Toggle
                        enabled={settings.priorities[key as keyof typeof settings.priorities]}
                        onChange={(enabled) => updateSetting(`priorities.${key}`, enabled)}
                        disabled={!settings.enabled}
                      />
                    }
                    disabled={!settings.enabled}
                  />
                ))}
              </div>
            </div>

            {/* Category settings */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <SectionHeader
                icon={<Filter className="w-5 h-5" />}
                title="Categories"
                description="Choose which types of notifications to receive"
              />
              
              <div className="space-y-4">
                {Object.entries(categoryConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <SettingItem
                      key={key}
                      icon={<Icon className="w-4 h-4 text-gray-400" />}
                      label={config.label}
                      description={config.description}
                      action={
                        <Toggle
                          enabled={settings.categories[key as keyof typeof settings.categories]}
                          onChange={(enabled) => updateSetting(`categories.${key}`, enabled)}
                          disabled={!settings.enabled}
                        />
                      }
                      disabled={!settings.enabled}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            {/* Quiet hours */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <SectionHeader
                icon={<Moon className="w-5 h-5" />}
                title="Quiet Hours"
                description="Silence notifications during specific times"
                action={
                  <Toggle
                    enabled={settings.quietHours.enabled}
                    onChange={(enabled) => updateSetting('quietHours.enabled', enabled)}
                    disabled={!settings.enabled}
                  />
                }
              />
              
              <AnimatePresence>
                {settings.quietHours.enabled && settings.enabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 mt-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Start time</span>
                      <TimePicker
                        value={settings.quietHours.startTime}
                        onChange={(time) => updateSetting('quietHours.startTime', time)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">End time</span>
                      <TimePicker
                        value={settings.quietHours.endTime}
                        onChange={(time) => updateSetting('quietHours.endTime', time)}
                      />
                    </div>
                    
                    <SettingItem
                      label="Allow urgent notifications"
                      description="Emergency alerts will still come through"
                      action={
                        <Toggle
                          enabled={settings.quietHours.allowUrgent}
                          onChange={(enabled) => updateSetting('quietHours.allowUrgent', enabled)}
                        />
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Frequency control */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <SectionHeader
                icon={<Clock className="w-5 h-5" />}
                title="Frequency Control"
                description="Manage notification timing and bundling"
              />
              
              <div className="space-y-4">
                <SettingItem
                  label="Bundle similar notifications"
                  description="Group related notifications together"
                  action={
                    <Toggle
                      enabled={settings.frequency.bundling}
                      onChange={(enabled) => updateSetting('frequency.bundling', enabled)}
                      disabled={!settings.enabled}
                    />
                  }
                  disabled={!settings.enabled}
                />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notification delay</p>
                    <p className="text-sm text-gray-400">Wait before showing bundled notifications</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <NumberInput
                      value={settings.frequency.delay}
                      onChange={(value) => updateSetting('frequency.delay', value)}
                      min={0}
                      max={30}
                      disabled={!settings.enabled || !settings.frequency.bundling}
                    />
                    <span className="text-sm text-gray-400">min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Max per hour</p>
                    <p className="text-sm text-gray-400">Limit notifications to avoid spam</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <NumberInput
                      value={settings.frequency.maxPerHour}
                      onChange={(value) => updateSetting('frequency.maxPerHour', value)}
                      min={1}
                      max={50}
                      disabled={!settings.enabled}
                    />
                    <span className="text-sm text-gray-400">/hr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart features */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <SectionHeader
                icon={<Lightbulb className="w-5 h-5" />}
                title="Smart Features"
                description="AI-powered notification enhancements"
              />
              
              <div className="space-y-4">
                <SettingItem
                  icon={<MapPin className="w-4 h-4 text-green-400" />}
                  label="Location-based notifications"
                  description="Smart timing based on your location"
                  action={
                    <Toggle
                      enabled={settings.smartFeatures.locationBased}
                      onChange={(enabled) => updateSetting('smartFeatures.locationBased', enabled)}
                      disabled={!settings.enabled}
                    />
                  }
                  disabled={!settings.enabled}
                />
                
                <SettingItem
                  icon={<Target className="w-4 h-4 text-purple-400" />}
                  label="Predictive notifications"
                  description="Proactive alerts based on patterns"
                  action={
                    <Toggle
                      enabled={settings.smartFeatures.predictive}
                      onChange={(enabled) => updateSetting('smartFeatures.predictive', enabled)}
                      disabled={!settings.enabled}
                    />
                  }
                  disabled={!settings.enabled}
                />
                
                <SettingItem
                  icon={<CheckCircle className="w-4 h-4 text-blue-400" />}
                  label="Auto-archive read notifications"
                  description="Automatically clean up old notifications"
                  action={
                    <Toggle
                      enabled={settings.smartFeatures.autoArchive}
                      onChange={(enabled) => updateSetting('smartFeatures.autoArchive', enabled)}
                      disabled={!settings.enabled}
                    />
                  }
                  disabled={!settings.enabled}
                />
                
                <SettingItem
                  icon={<Shield className="w-4 h-4 text-yellow-400" />}
                  label="Duplicate filter"
                  description="Prevent duplicate notifications"
                  action={
                    <Toggle
                      enabled={settings.smartFeatures.duplicateFilter}
                      onChange={(enabled) => updateSetting('smartFeatures.duplicateFilter', enabled)}
                      disabled={!settings.enabled}
                    />
                  }
                  disabled={!settings.enabled}
                />
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Notification stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <SectionHeader
                icon={<BarChart3 className="w-5 h-5" />}
                title="Notification Analytics"
                description="Your notification patterns and insights"
              />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-600/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Bell className="w-5 h-5 text-blue-400" />
                    <span className="text-xl font-bold text-white">47</span>
                  </div>
                  <p className="text-sm text-blue-200 mt-1">This week</p>
                </div>
                
                <div className="bg-green-600/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-xl font-bold text-white">92%</span>
                  </div>
                  <p className="text-sm text-green-200 mt-1">Read rate</p>
                </div>
                
                <div className="bg-orange-600/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Zap className="w-5 h-5 text-orange-400" />
                    <span className="text-xl font-bold text-white">3.2s</span>
                  </div>
                  <p className="text-sm text-orange-200 mt-1">Avg response</p>
                </div>
                
                <div className="bg-purple-600/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span className="text-xl font-bold text-white">12</span>
                  </div>
                  <p className="text-sm text-purple-200 mt-1">Actions taken</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h4 className="text-white font-medium mb-2">Most Active Categories</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Transportation</span>
                    <span className="text-sm text-white">28 notifications</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Payments</span>
                    <span className="text-sm text-white">12 notifications</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Schedules</span>
                    <span className="text-sm text-white">7 notifications</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Insights */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <SectionHeader
                icon={<Lightbulb className="w-5 h-5" />}
                title="Smart Insights"
                description="Personalized recommendations"
              />
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-200 font-medium">Peak Activity</p>
                    <p className="text-xs text-blue-300 mt-1">
                      You receive most notifications between 8-10 AM. Consider enabling quiet hours after 10 PM.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-200 font-medium">High Engagement</p>
                    <p className="text-xs text-green-300 mt-1">
                      You respond quickly to payment notifications. Consider increasing their priority.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-200 font-medium">Optimization Tip</p>
                    <p className="text-xs text-yellow-300 mt-1">
                      Enable notification bundling to reduce interruptions during study hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
              <h1 className="text-xl font-bold text-gray-900">Notification Settings</h1>
              <p className="text-sm text-gray-600">
                Customize your notification experience
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset to defaults"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => router.push('/notifications')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="View notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="flex space-x-1 px-4 pb-4">
          {[
            { key: 'general', label: 'General', icon: Settings },
            { key: 'categories', label: 'Categories', icon: Filter },
            { key: 'advanced', label: 'Advanced', icon: Zap },
            { key: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reset confirmation modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Reset Settings</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                Are you sure you want to reset all notification settings to their defaults? 
                This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={resetToDefaults}
                  disabled={isLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Resetting...' : 'Reset'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationControl; 
 