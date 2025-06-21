'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bus, 
  Home, 
  MapPin, 
  Clock, 
  CreditCard, 
  User, 
  Bell, 
  Settings, 
  Menu, 
  X,
  QrCode,
  BarChart3,
  FileText,
  Navigation,
  LogOut
} from 'lucide-react'

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userType, setUserType] = useState('student')

  React.useEffect(() => {
    const userTypeStored = localStorage.getItem('userType') || 'student'
    setUserType(userTypeStored)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Scan QR', href: '/scan', icon: QrCode },
    { name: 'Live Tracking', href: '/live-tracking', icon: Navigation },
    { name: 'Routes', href: '/routes', icon: MapPin },
    { name: 'Schedules', href: '/schedules', icon: Clock },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const NavLink = ({ item }: { item: typeof navigationItems[0] }) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          router.push(item.href);
          if(isMobileMenuOpen) setIsMobileMenuOpen(false);
        }}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
          active
            ? 'bg-blue-50 text-blue-700 font-semibold'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <Icon className={`w-5 h-5 ${
          active ? 'text-blue-600' : 'text-gray-400'
        }`} />
        <span>{item.name}</span>
      </motion.button>
    )
  }

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col bg-white shadow-lg border-r border-gray-100 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-3 p-6 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Travent</h1>
            <p className="text-xs text-gray-500">Transportation Management</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 mb-4 p-2 rounded-lg hover:bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => router.push('/settings')}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-400" />
              <span>Settings</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Travent</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                      <Bus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-900">Travent</h1>
                      <p className="text-xs text-gray-500">Menu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <nav className="flex-1 px-4 py-6">
                  <div className="space-y-2">
                    {navigationItems.map((item) => (
                      <NavLink key={item.name} item={item} />
                    ))}
                  </div>
                </nav>

                {/* Mobile User Section */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3 mb-4 p-2 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {userType.charAt(0).toUpperCase() + userType.slice(1)}
                      </p>
                      <p className="text-xs text-gray-500">User</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        router.push('/settings')
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span>Settings</span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar