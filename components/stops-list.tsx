import React from 'react';
import { MapPin, Clock, CheckCircle2, Circle } from 'lucide-react';
import { RouteCoordinate } from '@/data/route-coordinates';

interface StopsListProps {
  stops: RouteCoordinate[];
  currentStepIndex: number;
}

const StopsList: React.FC<StopsListProps> = ({ stops, currentStepIndex }) => {
  return (
    <div className="space-y-3">
      {stops.map((stop, index) => {
        const isPassed = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const isUpcoming = index > currentStepIndex;
        
        return (
          <div 
            key={`${stop.name}-${index}`}
            className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
              isCurrent 
                ? 'bg-blue-50 border-2 border-blue-200 shadow-md' 
                : isPassed 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex-shrink-0 mt-1">
              {isPassed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : isCurrent ? (
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm leading-5 ${
                    isCurrent 
                      ? 'text-blue-900' 
                      : isPassed 
                      ? 'text-green-800' 
                      : 'text-gray-700'
                  }`}>
                    {stop.name}
                    {stop.isDestination && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Destination
                      </span>
                    )}
                  </h3>
                  
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className={`text-xs ${
                        isCurrent ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        {stop.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">
                        {stop.position[0].toFixed(4)}, {stop.position[1].toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {isCurrent && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Current
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StopsList; 