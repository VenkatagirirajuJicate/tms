import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Calendar, Clock, Users, MapPin, Fuel, CheckCircle2 } from 'lucide-react';

interface FilterState {
  status: string[];
  occupancyRange: [number, number];
  distanceRange: [number, number];
  departureTimeRange: [string, string];
  driver: string[];
  vehicleType: string[];
  routeType: string[];
  showInactive: boolean;
}

interface AdvancedRouteFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableDrivers: string[];
  availableVehicleTypes: string[];
}

const AdvancedRouteFilters: React.FC<AdvancedRouteFiltersProps> = ({
  filters,
  onFiltersChange,
  availableDrivers,
  availableVehicleTypes,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: [],
      occupancyRange: [0, 100],
      distanceRange: [0, 100],
      departureTimeRange: ['06:00', '09:00'],
      driver: [],
      vehicleType: [],
      routeType: [],
      showInactive: false,
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status.length > 0) count++;
    if (filters.driver.length > 0) count++;
    if (filters.vehicleType.length > 0) count++;
    if (filters.routeType.length > 0) count++;
    if (filters.occupancyRange[0] > 0 || filters.occupancyRange[1] < 100) count++;
    if (filters.distanceRange[0] > 0 || filters.distanceRange[1] < 100) count++;
    if (filters.showInactive) count++;
    return count;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {getActiveFiltersCount() > 0 && (
          <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getActiveFiltersCount()}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Status Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">Status</span>
                  </div>
                  <div className="space-y-2">
                    {['active', 'inactive', 'maintenance', 'delayed'].map((status) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.status.includes(status)}
                          onChange={(e) => {
                            const newStatus = e.target.checked
                              ? [...filters.status, status]
                              : filters.status.filter(s => s !== status);
                            handleFilterChange('status', newStatus);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Occupancy Range */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">Occupancy Rate</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{filters.occupancyRange[0]}%</span>
                      <span>{filters.occupancyRange[1]}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        onClick={() => handleFilterChange('occupancyRange', [0, 50])}
                        className="p-2 text-center rounded bg-green-100 text-green-700 hover:bg-green-200"
                      >
                        Low (0-50%)
                      </button>
                      <button
                        onClick={() => handleFilterChange('occupancyRange', [50, 80])}
                        className="p-2 text-center rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      >
                        Medium (50-80%)
                      </button>
                      <button
                        onClick={() => handleFilterChange('occupancyRange', [80, 100])}
                        className="p-2 text-center rounded bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        High (80-100%)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Departure Time */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">Departure Time</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">From</label>
                      <input
                        type="time"
                        value={filters.departureTimeRange[0]}
                        onChange={(e) => handleFilterChange('departureTimeRange', [e.target.value, filters.departureTimeRange[1]])}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">To</label>
                      <input
                        type="time"
                        value={filters.departureTimeRange[1]}
                        onChange={(e) => handleFilterChange('departureTimeRange', [filters.departureTimeRange[0], e.target.value])}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Drivers */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">Drivers</span>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {availableDrivers.slice(0, 6).map((driver) => (
                      <label key={driver} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.driver.includes(driver)}
                          onChange={(e) => {
                            const newDrivers = e.target.checked
                              ? [...filters.driver, driver]
                              : filters.driver.filter(d => d !== driver);
                            handleFilterChange('driver', newDrivers);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{driver}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Route Type */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">Route Type</span>
                  </div>
                  <div className="space-y-2">
                    {['Express', 'Local', 'Special', 'Night'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.routeType.includes(type)}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...filters.routeType, type]
                              : filters.routeType.filter(t => t !== type);
                            handleFilterChange('routeType', newTypes);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-6 border-t border-gray-200">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.showInactive}
                    onChange={(e) => handleFilterChange('showInactive', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show inactive routes</span>
                </label>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedRouteFilters; 