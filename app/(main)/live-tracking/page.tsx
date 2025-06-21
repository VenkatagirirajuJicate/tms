'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronUp, ChevronDown, CheckCircle, MapPin, Bus, User, Phone, Gauge, Clock, Navigation, AlertTriangle, Wifi, Battery, Signal, Share2, RefreshCw } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./map-component'), { ssr: false })

const steps = [
  { 
    name: 'Seelanaikenpatty', 
    time: '07:45 AM', 
    passengers: 10, 
    position: [11.6674, 78.146] 
  },
  { 
    name: 'Kakapalayam', 
    time: '08:05 AM', 
    passengers: 18, 
    position: [11.5727, 77.9402] 
  },
  { 
    name: 'Sankagiri', 
    time: '08:25 AM', 
    passengers: 20, 
    position: [11.4772, 77.8537] 
  },
  { 
    name: 'Velayakaranur', 
    time: '08:45 AM', 
    passengers: 13, 
    position: [11.4477, 77.7947] 
  },
  { 
    name: 'JKKN Educational Institution', 
    time: '08:50 AM', 
    isDestination: true, 
    position: [11.4350, 77.7850] 
  },
]

const driverInfo = {
  name: 'Velan K',
  phone: '+91 98765 43210',
  vehicle: 'TN12AB6789',
  rating: 4.8,
  experience: '5 years'
}

const LiveTrackingScreen = () => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev))
      setLastUpdated(new Date())
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentStep = steps[currentStepIndex]
  const nextStep = steps[currentStepIndex + 1]
  const isAtDestination = currentStepIndex === steps.length - 1

  // Calculate estimated arrival time
  const estimatedArrival = useMemo(() => {
    if (isAtDestination) return 'Arrived'
    const remainingStops = steps.length - currentStepIndex - 1
    const estimatedMinutes = remainingStops * 5 + 10 // 5 mins per stop + 10 mins buffer
    return `${estimatedMinutes} mins`
  }, [currentStepIndex, isAtDestination])

  // Calculate distance remaining
  const distanceRemaining = useMemo(() => {
    if (isAtDestination) return '0 km'
    const remainingStops = steps.length - currentStepIndex - 1
    const estimatedKm = remainingStops * 8 + 5 // Approximate distance
    return `${estimatedKm} km`
  }, [currentStepIndex, isAtDestination])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdated(new Date())
    }, 1000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Live Bus Tracking',
        text: `Track your bus in real-time. Current location: ${currentStep.name}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()} 
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Live Tracking</h1>
            <p className="text-sm text-gray-600">Route 17: {currentStep.name}</p>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Wifi className="w-3 h-3" />
            <span>Live</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Battery className="w-3 h-3" />
            <span>85%</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Signal className="w-3 h-3" />
            <span>4G</span>
          </div>
        </div>
      </header>
      
      {/* Map Container */}
      <div className="flex-1 relative">
        <MapComponent 
          steps={steps} 
          currentStepIndex={currentStepIndex}
        />
        
        {/* Enhanced Info Cards */}
        <div className="absolute top-4 right-4 z-20 space-y-3">
          <InfoCard icon={Gauge} title="Speed" value="45 km/h" />
          <InfoCard icon={Clock} title="ETA to Destination" value={estimatedArrival} />
          <InfoCard icon={Navigation} title="Distance Remaining" value={distanceRemaining} />
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-20 right-4 z-20 space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefresh}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-5 h-5 text-green-600" />
          </motion.button>
        </div>

        {/* Current Location Banner */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3 max-w-xs">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-gray-700">CURRENT LOCATION</span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm">{currentStep.name}</h3>
            <p className="text-xs text-gray-600">{currentStep.time}</p>
            {nextStep && !isAtDestination && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">Next: {nextStep.name}</p>
                <p className="text-xs text-gray-500">{nextStep.time}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl z-20 shadow-lg border-t border-gray-200"
        initial={{ y: 'calc(66% - 24px)' }}
        animate={{ y: isExpanded ? 0 : 'calc(66% - 24px)' }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        <div className="p-4">
          <div className="flex justify-center" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="w-10 h-1.5 bg-gray-300 rounded-full cursor-pointer" />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Route Details</h2>
              <p className="text-xs text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              {isAtDestination ? (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Arrived</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-blue-600">
                  <Bus className="w-4 h-4" />
                  <span className="text-sm font-semibold">In Transit</span>
                </div>
              )}
              {isExpanded ? (
                <ChevronDown onClick={() => setIsExpanded(false)} className="cursor-pointer text-gray-600"/>
              ) : (
                <ChevronUp onClick={() => setIsExpanded(true)} className="cursor-pointer text-gray-600"/>
              )}
            </div>
          </div>
        </div>
        
        <div className="px-4 pb-4 overflow-y-auto" style={{maxHeight: isExpanded ? 'calc(100vh - 150px)' : 'calc(33vh - 100px)'}}>
          {/* Driver Info Enhanced */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white"/>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-gray-900">{driverInfo.name}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{driverInfo.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{driverInfo.vehicle}</p>
                <p className="text-xs text-gray-500">{driverInfo.experience} experience</p>
              </div>
              <div className="flex flex-col space-y-2">
                <a 
                  href={`tel:${driverInfo.phone}`} 
                  className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                >
                  <Phone className="w-4 h-4"/>
                </a>
                <button className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                  <AlertTriangle className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>

          {/* Route Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900">Route Progress</h3>
              <span className="text-sm text-gray-600">{currentStepIndex + 1} of {steps.length} stops</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <StepItem 
              key={index} 
              step={step} 
              isCompleted={index < currentStepIndex} 
              isCurrent={index === currentStepIndex} 
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const StepItem = ({ step, isCompleted, isCurrent }: { 
  step: typeof steps[0], 
  isCompleted: boolean, 
  isCurrent: boolean 
}) => (
  <div className="flex items-start py-3">
    <div className="flex flex-col items-center mr-4 mt-1">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isCurrent ? 'bg-blue-500 animate-ping absolute' : ''}`}>
        {isCompleted ? (
          <CheckCircle className="text-green-500 w-5 h-5" />
        ) : (
          <div className={`w-3 h-3 rounded-full ${step.isDestination ? 'bg-red-500' : 'bg-gray-400'}`} />
        )}
      </div>
      {!step.isDestination && (
        <div className={`w-0.5 flex-1 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'} my-1`} style={{minHeight: '2rem'}} />
      )}
    </div>
    <div className={`transition-opacity ${isCompleted ? 'opacity-60' : 'opacity-100'}`}>
      <h3 className={`font-semibold ${isCurrent ? 'text-blue-600' : 'text-gray-900'}`}>
        {step.name}
      </h3>
      <p className="text-sm text-gray-600">{step.time}</p>
      {step.passengers && (
        <p className="text-xs text-gray-500 mt-1">
          {step.passengers} passengers
        </p>
      )}
      {step.isDestination && (
        <p className="text-xs text-red-600 font-semibold mt-1">
          🎯 Final Destination
        </p>
      )}
    </div>
  </div>
)

const InfoCard = ({ icon: Icon, title, value }: { 
  icon: React.ElementType, 
  title: string, 
  value: string 
}) => (
  <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200 flex items-center gap-3">
    <Icon className="w-5 h-5 text-blue-600" />
    <div>
      <p className="text-xs text-gray-600">{title}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
)

export default LiveTrackingScreen 