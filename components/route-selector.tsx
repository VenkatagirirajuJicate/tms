'use client'

import React, { useState } from 'react'
import { ChevronDown, MapPin, Clock, Bus } from 'lucide-react'
import { getAllRouteNumbers, routeCoordinates } from '@/data/route-coordinates'

interface RouteSelectorProps {
  selectedRoute: string
  onRouteChange: (routeNumber: string) => void
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ selectedRoute, onRouteChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedRouteData = routeCoordinates.find(r => r.routeNumber === selectedRoute)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Bus className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900">Route {selectedRoute}</p>
            <p className="text-xs text-gray-600">{selectedRouteData?.routeName}</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Select Route</h3>
            <p className="text-xs text-gray-600">Choose a route to track</p>
          </div>
          
          <div className="py-2">
            {routeCoordinates.map((route) => (
              <button
                key={route.routeNumber}
                onClick={() => {
                  onRouteChange(route.routeNumber)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  selectedRoute === route.routeNumber ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      selectedRoute === route.routeNumber 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {route.routeNumber}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{route.routeName}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{route.coordinates.length} stops</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{route.coordinates[0]?.time} - {route.coordinates[route.coordinates.length - 1]?.time}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedRoute === route.routeNumber && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RouteSelector 