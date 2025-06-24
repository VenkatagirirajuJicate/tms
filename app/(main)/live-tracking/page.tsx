'use client'

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation' 
import { motion } from 'framer-motion'
import { ChevronLeft, RefreshCw, MapPin, Clock, Gauge, Sun, AlertTriangle, Navigation, NavigationOff, Eye, EyeOff, List, User, ChevronUp, Bus } from 'lucide-react'
import dynamic from 'next/dynamic'
import { getRouteCoordinates, RouteCoordinate, RouteData } from '@/data/route-coordinates'
import { allRoutes } from '@/data/dummy-data'
import { Route } from '@/types'
import { getDistance } from '@/lib/utils';
import StopsList from '../../../components/stops-list';
import { AnimatePresence } from 'framer-motion';
import StatCard from '@/components/ui/stat-card';

const MapComponent = dynamic(() => import('./map-component'), {
  ssr: false,
  loading: () => <div className="flex-1 bg-gray-200 animate-pulse" />
});

interface LiveTrackingScreenProps {
  routeNumber: string;
}

const BottomSheet: React.FC<{ 
  children: React.ReactNode, 
  isExpanded: boolean,
  onToggle: () => void 
}> = ({ children, isExpanded, onToggle }) => (
  <motion.div
    initial={false}
    animate={isExpanded ? "full" : "peek"}
    variants={{
      peek: { y: 'calc(100% - 60px)' }, 
      full: { y: '50vh' } // Expanded to 50% of viewport height
    }}
    transition={{ type: 'spring', damping: 30, stiffness: 250 }}
    className="absolute left-0 right-0 bg-white rounded-t-2xl shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.2)]"
  >
    <div 
      onClick={!isExpanded ? onToggle : undefined} 
      className={`overflow-y-auto ${isExpanded ? 'h-[50vh]' : 'h-[60px] cursor-pointer'}`}
    >
      {children}
    </div>
  </motion.div>
);

const LoadingUI = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="flex flex-col items-center gap-4">
      <RefreshCw className="animate-spin text-blue-500" size={48} />
      <p className="text-lg font-semibold text-gray-700">Loading Route...</p>
    </div>
  </div>
);

const ErrorUI: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
    <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Route</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const LiveTrackingContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const routeNumber = searchParams.get('routeNumber') || '17';
    return <LiveTrackingScreen routeNumber={routeNumber} />;
}

const LiveTrackingPage = () => {
    return (
        <Suspense fallback={<LoadingUI />}>
            <LiveTrackingContent />
        </Suspense>
    );
}


const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({ routeNumber: initialRouteNumber }) => {
  const router = useRouter();
  const [routeNumber, setRouteNumber] = useState(initialRouteNumber);
  const [routeData, setRouteData] = useState<RouteCoordinate[]>([]);
  const [routeDetails, setRouteDetails] = useState<Route | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoPan, setAutoPan] = useState(true);
  const [showInfoCards, setShowInfoCards] = useState(false); // Default to false, will be set based on screen size
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(45); // Simulated speed in km/h

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const busPositionRef = useRef<[number, number] | null>(null);

  const currentStop = useMemo(() => routeData[currentStepIndex], [routeData, currentStepIndex]);
  const nextStop = useMemo(() => routeData[currentStepIndex + 1], [routeData, currentStepIndex]);
  const destination = useMemo(() => routeData.find(s => s.isDestination) || routeData[routeData.length - 1], [routeData]);

  const remainingDistance = useMemo(() => {
    if (!currentStop || currentStepIndex >= routeData.length - 1) return 0;
    let totalDistance = 0;
    for (let i = currentStepIndex; i < routeData.length - 1; i++) {
      const from = routeData[i].position;
      const to = routeData[i+1].position;
      if(from && to) {
        totalDistance += getDistance(from, to);
      }
    }
    return totalDistance / 1000;
  }, [currentStepIndex, routeData, currentStop]);

  const etaMinutes = useMemo(() => {
    if (remainingDistance === 0) return 0;
    const speed = currentSpeed > 0 ? currentSpeed : 45;
    const hours = remainingDistance / speed;
    return Math.round(hours * 60);
  }, [remainingDistance, currentSpeed]);

  useEffect(() => {
    const fetchRouteData = async () => {
      setLoading(true);
      setError(null);
      try {
        const routePath = getRouteCoordinates(routeNumber);
        const routeInfo = allRoutes.find(r => r.routeNumber === routeNumber);

        if (!routePath || routePath.coordinates.length === 0 || !routeInfo) {
          throw new Error(`Route ${routeNumber} is not available or has no stops.`);
        }
        setRouteData(routePath.coordinates);
        setRouteDetails(routeInfo);
        setCurrentStepIndex(0);
      } catch (err: any) {
        setError(err.message || 'Failed to load route data.');
      } finally {
        setLoading(false);
      }
    };
    fetchRouteData();
  }, [routeNumber]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (routeData.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex(prevIndex => {
          if (prevIndex >= routeData.length - 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return prevIndex;
          }
          return prevIndex + 1;
        });
        setCurrentSpeed(40 + Math.floor(Math.random() * 15));
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [routeData]);

  // Handle responsive info cards visibility
  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint (Tailwind's lg breakpoint)
      if (isLargeScreen) {
        // Always show cards on large screens
        setShowInfoCards(true);
      }
      // On small screens, don't automatically change the state to preserve user choice
    };

    // Set initial state based on screen size
    const isLargeScreen = window.innerWidth >= 1024;
    setShowInfoCards(isLargeScreen); // Show on large screens, hide on small screens initially

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <LoadingUI />;
  if (error) return <ErrorUI message={error} />;
  
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="lg:hidden h-16 flex-shrink-0" />
      <header className="flex items-center justify-between p-3 bg-white shadow-sm border-b border-gray-200 z-[100] flex-shrink-0">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-2 p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Live Tracking</h1>
            <p className="text-sm text-gray-500">
              {routeDetails?.routeName || `Route ${routeNumber}`}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        <MapComponent key={routeNumber} routeNumber={routeNumber} currentStepIndex={currentStepIndex} autoPan={autoPan} />
        
        <div className="absolute top-4 left-4 z-[90]">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-black shadow-lg">
            <span className="text-black text-2xl font-bold">{routeNumber}</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex items-start gap-3 z-[90]">
          <div className="flex flex-col gap-3 items-center">
            <button 
              onClick={() => setAutoPan(v => !v)} 
              className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title={autoPan ? 'Disable Auto-Pan' : 'Enable Auto-Pan'}
            >
              {autoPan ? <Navigation size={20} /> : <NavigationOff size={20} />}
            </button>
            {/* Show toggle button only on smaller screens */}
            <button 
              onClick={() => {
                // Only allow toggle on smaller screens
                if (window.innerWidth < 1024) {
                  setShowInfoCards(v => !v);
                }
              }} 
              className="lg:hidden bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title={showInfoCards ? 'Hide Info Cards' : 'Show Info Cards'}
            >
              {showInfoCards ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <AnimatePresence>
            {showInfoCards && (
              <motion.div 
                className="space-y-3 w-60"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <StatCard icon={<Gauge size={20} />} label="Speed">
                  {currentSpeed} km/h
                </StatCard>
                <StatCard icon={<Clock size={20} />} label="ETA to Destination">
                  ~{etaMinutes} mins
                </StatCard>
                <StatCard icon={<MapPin size={20} />} label="Distance Remaining">
                  ~{remainingDistance.toFixed(1)} km
                </StatCard>
                <StatCard icon={<Sun size={20} />} label="Destination Weather">
                  32°C, Sunny
                </StatCard>
                {routeDetails && (
                  <StatCard icon={<User size={20} />} label="Driver & Vehicle">
                    <p>{routeDetails.driver}</p>
                    <p className="text-xs font-mono bg-gray-200 px-1.5 py-0.5 rounded-md mt-1 inline-block">{routeDetails.vehicleRegNo}</p>
                  </StatCard>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <BottomSheet isExpanded={isSheetExpanded} onToggle={() => setIsSheetExpanded(!isSheetExpanded)}>
        {!isSheetExpanded ? (
          <div className="flex items-center justify-center h-full gap-2">
            <ChevronUp className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-blue-600">View Details</span>
          </div>
        ) : (
          <div className="p-4">
             <div 
              onClick={() => setIsSheetExpanded(false)}
              className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 cursor-pointer" 
            />
            <h2 className="text-xl font-bold text-gray-800 mb-4">{routeDetails?.routeName} Details</h2>
            <StopsList stops={routeData} currentStepIndex={currentStepIndex} />
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default LiveTrackingPage;