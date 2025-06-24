'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import * as domtoimage from 'dom-to-image-more';
import {
  Bus,
  MapPin,
  Clock,
  Users,
  Calendar,
  CreditCard,
  CheckCircle,
  X,
  ArrowLeft,
  Download,
  QrCode,
  AlertTriangle,
  Timer,
  Eye,
  Info,
  AlertCircle,
  ChevronLeft,
  Plus,
  Ban,
  Bell,
  Star,
  ArrowRight,
  Home,
  XCircle
} from 'lucide-react';
import { allRoutes } from '@/data/dummy-data';

// Mock student allocation data - this would come from the backend
const studentAllocation = {
  studentId: 'STU001',
  name: 'John Doe',
  department: 'Computer Science',
  allocatedRoutes: [
    {
      routeId: '01',
      routeNumber: '01',
      routeName: 'Erode Central',
      startLocation: 'Erode',
      endLocation: 'JKKN Campus',
      estimatedDuration: '1h 30m',
      rating: '4.2',
      // Single departure time per route
      departureTime: '07:00 AM',
      availableSeats: 25,
      // Student's assigned boarding stops on this route
      assignedStops: [
        { stopId: 'ES1', name: 'Erode Bus Stand', time: '07:00 AM', isPrimary: true },
        { stopId: 'ES2', name: 'Solar', time: '07:15 AM', isPrimary: false },
      ]
    }
  ],
  currentBookings: [
    {
      id: 'BK001',
      routeNumber: '01',
      routeName: 'Erode Central',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
      departureTime: '07:00 AM',
      boardingStop: 'Erode Bus Stand',
      seatNumber: 'A12',
      status: 'confirmed', // This will show in boarding pass after 7 PM
      bookingDate: new Date().toISOString().split('T')[0],
      boardingPass: true,
      qrCode: 'QR123456789ETICKET',
      canCancel: false,
      canConfirm: false,
      confirmationDeadline: new Date().toISOString(),
      cancellationDeadline: new Date().toISOString(),
      eTicketGenerated: true,
      passengerName: 'John Doe',
      studentId: 'STU001',
      routeDetails: {
        from: 'Erode Bus Stand',
        to: 'JKKN Campus',
        distance: '25 km',
        estimatedDuration: '1h 30m'
      }
    },
    {
      id: 'BK002',
      routeNumber: '01',
      routeName: 'Erode Central',
      date: '2024-01-18',
      departureTime: '07:00 AM',
      boardingStop: 'Solar',
      seatNumber: 'B08',
      status: 'no-show',
      fine: 50,
      bookingDate: '2024-01-16',
      boardingPass: false,
    },
    {
      id: 'BK003',
      routeNumber: '01',
      routeName: 'Erode Central',
      date: '2024-01-17',
      departureTime: '07:00 AM',
      boardingStop: 'Erode Bus Stand',
      seatNumber: 'C05',
      status: 'completed',
      bookingDate: '2024-01-15',
      boardingPass: true,
      qrCode: 'QR987654321',
    },
  ],
  // Outstanding fines
  outstandingFines: 50,
  totalFines: 50
};

// Advanced PNG Download with CSS inlining for perfect style capture
const downloadBoardingPassAsPNG = async (elementId: string, filename: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found:', elementId);
      toast.error(`Boarding pass element not found: ${elementId}`);
      return;
    }

    // Check if element is visible
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.error('Element is not visible:', elementId, rect);
      toast.error('Boarding pass is not visible. Please try again.');
      return;
    }

    console.log('Capturing element:', elementId, 'Size:', rect.width, 'x', rect.height);

    // Show loading toast
    const loadingToast = toast.loading('Generating boarding pass image...');

    // Wait for content to fully render
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Ensure element is fully visible by scrolling to it
    element.scrollIntoView({ behavior: 'instant', block: 'center' });
    
    // Wait after scrolling
    await new Promise(resolve => setTimeout(resolve, 300));

    // Initialize blob variable
    let blob: Blob;

    // Try dom-to-image-more first to avoid border box issues
    try {
      console.log('Using dom-to-image-more for clean rendering...');
      
      // Create a temporary style element to override problematic styles during capture
      const tempStyle = document.createElement('style');
      tempStyle.id = 'temp-boarding-pass-style';
      tempStyle.textContent = `
        #${elementId} *, #${elementId} *::before, #${elementId} *::after {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        #${elementId} .border-2 {
          border: 2px solid !important;
        }
        #${elementId} .border-blue-500 {
          border-color: rgb(59, 130, 246) !important;
        }
        #${elementId} .border-gray-300 {
          border-color: rgb(209, 213, 219) !important;
        }
        #${elementId} .border-gray-200 {
          border-color: rgb(229, 231, 235) !important;
        }
        #${elementId} .border-dashed {
          border-style: dashed !important;
        }
        #${elementId} .border-t-2 {
          border-top: 2px solid !important;
        }
        #${elementId} .rounded-xl {
          border-radius: 0.75rem !important;
        }
        #${elementId} .rounded-lg {
          border-radius: 0.5rem !important;
        }
        #${elementId} .rounded-2xl {
          border-radius: 1rem !important;
        }
      `;
      document.head.appendChild(tempStyle);
      
      // Wait for style to be applied
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await domtoimage.toPng(element, {
        quality: 0.95,
        bgcolor: '#ffffff',
        width: Math.max(element.scrollWidth, element.offsetWidth, rect.width),
        height: Math.max(element.scrollHeight, element.offsetHeight, rect.height),
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
        filter: (node: Node) => {
          const htmlElement = node as HTMLElement;
          if (htmlElement.tagName === 'SCRIPT' || htmlElement.tagName === 'STYLE') {
            return false;
          }
          return true;
        },
        cacheBust: true,
      });

      // Remove temporary style
      document.head.removeChild(tempStyle);

      console.log('dom-to-image generated, data URL length:', dataUrl.length);

      if (!dataUrl || dataUrl.length < 1000) {
        throw new Error('Generated image appears to be empty or corrupt');
      }

      const response = await fetch(dataUrl);
      blob = await response.blob();

    } catch (domToImageError) {
      console.log('dom-to-image-more failed, falling back to HTML2Canvas:', domToImageError);
      
      // Clean up temporary style if it exists
      const existingTempStyle = document.getElementById('temp-boarding-pass-style');
      if (existingTempStyle) {
        document.head.removeChild(existingTempStyle);
      }
      
      // Fallback to HTML2Canvas with minimal style interference
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        imageTimeout: 15000,
        width: Math.max(element.scrollWidth, element.offsetWidth, rect.width),
        height: Math.max(element.scrollHeight, element.offsetHeight, rect.height),
        // Minimal onclone to avoid style conflicts
        onclone: (clonedDoc) => {
          // Add a simple style to remove unwanted borders
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * { border: none !important; outline: none !important; }
            .border-2 { border: 2px solid !important; }
            .border-dashed { border-style: dashed !important; }
            .border-blue-500 { border-color: rgb(59, 130, 246) !important; }
            .border-gray-300 { border-color: rgb(209, 213, 219) !important; }
            .border-gray-200 { border-color: rgb(229, 231, 235) !important; }
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      // Convert canvas to blob
      blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blobResult) => {
          if (blobResult) {
            resolve(blobResult);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        }, 'image/png', 0.95);
      });

      console.log('Canvas generated, blob size:', blob.size, 'bytes');
    }

    if (blob.size < 1000) {
      throw new Error('Generated image file is too small, likely empty');
    }

    console.log('Final blob size:', blob.size, 'bytes');

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    toast.dismiss(loadingToast);
    toast.success('Boarding pass downloaded successfully!');

  } catch (error) {
    console.error('Error generating boarding pass:', error);
    toast.dismiss();
    
    // Clean up temporary style if it exists
    const existingTempStyle = document.getElementById('temp-boarding-pass-style');
    if (existingTempStyle) {
      document.head.removeChild(existingTempStyle);
    }
    
    // Provide helpful error message
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('oklch')) {
      toast.error('Color compatibility issue. Please try refreshing the page.');
    } else if (errorMessage.includes('network')) {
      toast.error('Network error. Please check your connection and try again.');
    } else if (errorMessage.includes('empty') || errorMessage.includes('corrupt')) {
      toast.error('Failed to capture boarding pass content. Please try again.');
    } else {
      toast.error('Download failed. Please try again in a moment.');
    }
  }
};

const SchedulesPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'book' | 'my-bookings' | 'boarding-pass'>('book');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRoute, setSelectedRoute] = useState<any>(studentAllocation.allocatedRoutes[0]);
  const [bookingStep, setBookingStep] = useState<'select-details' | 'select-seat' | 'payment' | 'confirmation'>('select-details');
  const [selectedStop, setSelectedStop] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [selectedSeat, setSelectedSeat] = useState<string>('');

  // Check if boarding window is open (after 7 PM for next day trips)
  const isBoardingWindowOpen = () => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 19; // After 7 PM
  };

  // Get next confirmed trip for boarding pass
  const getNextConfirmedTrip = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    return studentAllocation.currentBookings.find(booking => 
      booking.status === 'confirmed' && 
      booking.date === tomorrowStr
    );
  };

  const handleBookingStart = (route: any, stop: any, timeSlot: any) => {
    setSelectedRoute(route);
    setSelectedStop(stop);
    setSelectedTimeSlot(timeSlot);
    setBookingStep('select-seat');
  };

  const handleSeatSelection = (seat: string) => {
    setSelectedSeat(seat);
    setBookingStep('payment');
  };

  const resetBooking = () => {
    setSelectedStop(null);
    setSelectedTimeSlot(null);
    setSelectedSeat('');
    setBookingStep('select-details');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <div className="lg:hidden h-16" />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Bus Schedule</h1>
              <p className="text-gray-600 text-sm sm:text-base">Schedule trips on your allocated routes</p>
            </div>
            
            {/* Student Info */}
            <div className="bg-blue-50 px-3 sm:px-4 py-2 rounded-lg flex-shrink-0">
              <p className="text-sm text-blue-800 font-medium truncate">{studentAllocation.name}</p>
              <p className="text-xs text-blue-600 truncate">{studentAllocation.department}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-8">
            <StatCard
              icon={<Bus className="w-5 h-5" />}
              label="Allocated Routes"
              value={studentAllocation.allocatedRoutes.length.toString()}
              color="blue"
            />
            <StatCard
              icon={<QrCode className="w-5 h-5" />}
              label="My Bookings"
              value={studentAllocation.currentBookings.length.toString()}
              color="green"
            />
            <StatCard
              icon={<Clock className="w-5 h-5" />}
              label="Need Confirmation"
              value={studentAllocation.currentBookings.filter(b => b.status === 'needs-confirmation').length.toString()}
              color="yellow"
            />
            <StatCard
              icon={<CheckCircle className="w-5 h-5" />}
              label="Confirmed"
              value={studentAllocation.currentBookings.filter(b => b.status === 'confirmed').length.toString()}
              color="green"
            />
            <StatCard
              icon={<CreditCard className="w-5 h-5" />}
              label="Outstanding Fines"
              value={`₹${studentAllocation.outstandingFines}`}
              color={studentAllocation.outstandingFines > 0 ? "red" : "green"}
            />
          </div>

          {/* Policies & Notifications */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-6 mb-4 sm:mb-8 overflow-hidden">
            <div className="flex items-start gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">Important Policies</h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <Timer className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="break-words">Confirm your trip between 4-7 PM the day before</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ban className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="break-words">Cancel before 7 PM the day before</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="break-words">₹50 fine for no-show without cancellation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="break-words">Reminders sent via SMS & email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max sm:min-w-0" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('book')}
                className={`flex items-center gap-1 sm:gap-2 whitespace-nowrap py-3 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                  activeTab === 'book'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Schedule Trip</span>
                <span className="sm:hidden">Schedule</span>
              </button>
              <button
                onClick={() => setActiveTab('my-bookings')}
                className={`flex items-center gap-1 sm:gap-2 whitespace-nowrap py-3 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                  activeTab === 'my-bookings'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">My Bookings</span>
                <span className="sm:hidden">Bookings</span>
              </button>
              <button
                onClick={() => setActiveTab('boarding-pass')}
                className={`flex items-center gap-1 sm:gap-2 whitespace-nowrap py-3 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors relative ${
                  activeTab === 'boarding-pass'
                    ? 'border-green-600 text-green-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <QrCode className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">E-Boarding Pass</span>
                <span className="sm:hidden">Pass</span>
                {isBoardingWindowOpen() && getNextConfirmedTrip() && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                )}
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'book' && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <BookingFlow
                step={bookingStep}
                allocation={studentAllocation}
                selectedRoute={selectedRoute}
                selectedStop={selectedStop}
                selectedTimeSlot={selectedTimeSlot}
                selectedSeat={selectedSeat}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onBookingStart={handleBookingStart}
                onSeatSelection={handleSeatSelection}
                onReset={resetBooking}
              />
            </motion.div>
          )}
          
          {activeTab === 'my-bookings' && (
            <motion.div
              key="my-bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MyBookings bookings={studentAllocation.currentBookings} />
            </motion.div>
          )}

          {activeTab === 'boarding-pass' && (
            <motion.div
              key="boarding-pass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <BoardingPassDashboard 
                isBoardingWindowOpen={isBoardingWindowOpen()}
                nextTrip={getNextConfirmedTrip()}
                studentInfo={studentAllocation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}> = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center mb-2 sm:mb-3`}>
        {icon}
      </div>
      <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{value}</p>
      <p className="text-xs sm:text-sm text-gray-600 truncate">{label}</p>
    </div>
  );
};

const BookingFlow: React.FC<{
  step: string;
  allocation: any;
  selectedRoute: any;
  selectedStop: any;
  selectedTimeSlot: any;
  selectedSeat: string;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onBookingStart: (route: any, stop: any, timeSlot: any) => void;
  onSeatSelection: (seat: string) => void;
  onReset: () => void;
}> = ({ 
  step, 
  allocation,
  selectedRoute, 
  selectedStop, 
  selectedTimeSlot, 
  selectedSeat, 
  selectedDate,
  onDateChange,
  onBookingStart,
  onSeatSelection,
  onReset 
}) => {
  
  if (step === 'select-details') {
    return <RouteStopSelection allocation={allocation} selectedDate={selectedDate} onDateChange={onDateChange} onBookingStart={onBookingStart} />;
  }

  if (step === 'select-seat') {
    return <SeatSelection route={selectedRoute} stop={selectedStop} timeSlot={selectedTimeSlot} onSeatSelect={onSeatSelection} onBack={onReset} />;
  }

  if (step === 'payment') {
    return <PaymentFlow route={selectedRoute} stop={selectedStop} timeSlot={selectedTimeSlot} seat={selectedSeat} onBack={onReset} />;
  }

  return null;
};

const RouteStopSelection: React.FC<{
  allocation: any;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onBookingStart: (route: any, stop: any, timeSlot: any) => void;
}> = ({ allocation, selectedDate, onDateChange, onBookingStart }) => {
  return (
    <div>
      {/* Date Selection */}
      <div className="mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Travel Date</h3>
          <div className="relative max-w-xs">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="input-field pl-10 w-full"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </div>

      {/* Allocated Routes */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Your Allocated Routes</h3>
        
        {allocation.allocatedRoutes.map((route: any) => (
          <AllocatedRouteCard 
            key={route.routeId} 
            route={route} 
            selectedDate={selectedDate}
            onBookingStart={onBookingStart} 
          />
        ))}

        {allocation.allocatedRoutes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Bus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Routes Allocated</h3>
            <p className="text-gray-500">Contact administration to get route allocation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AllocatedRouteCard: React.FC<{ 
  route: any; 
  selectedDate: string;
  onBookingStart: (route: any, stop: any, timeSlot: any) => void 
}> = ({ route, selectedDate, onBookingStart }) => {
  const [selectedStop, setSelectedStop] = useState(route.assignedStops[0]);

  // Check if booking is possible (not past cancellation deadline)
  const isBookingAllowed = () => {
    const selectedDateTime = new Date(`${selectedDate}T${route.departureTime}`);
    const cancellationDeadline = new Date(selectedDateTime);
    cancellationDeadline.setDate(cancellationDeadline.getDate() - 1);
    cancellationDeadline.setHours(19, 0, 0, 0); // 7 PM previous day
    
    return new Date() < cancellationDeadline;
  };

  const canBook = isBookingAllowed();
  const timeSlot = { time: route.departureTime, seats: route.availableSeats };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Route Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">
            {route.routeNumber}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{route.routeName}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {route.startLocation} → {route.endLocation}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-700">{route.rating}</span>
        </div>
      </div>

      {/* Route Info with Departure Time */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{route.estimatedDuration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Bus className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{route.departureTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{route.availableSeats} seats left</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{route.assignedStops.length} assigned stops</span>
        </div>
      </div>

      {/* Booking Status */}
      {!canBook && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Booking deadline passed</span>
          </div>
          <p className="text-xs text-red-600 mt-1">
            Bookings must be made before 7 PM the day before departure
          </p>
        </div>
      )}

      {/* Select Boarding Stop */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Home className="w-4 h-4" />
          Select Your Boarding Stop
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {route.assignedStops.map((stop: any) => (
            <button
              key={stop.stopId}
              onClick={() => setSelectedStop(stop)}
              disabled={!canBook}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                !canBook 
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                  : selectedStop?.stopId === stop.stopId
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{stop.name}</p>
                  <p className="text-sm text-gray-500">{stop.time}</p>
                </div>
                {stop.isPrimary && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Primary
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      {selectedStop && canBook && (
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            onClick={() => onBookingStart(route, selectedStop, timeSlot)}
            className="btn-primary flex items-center gap-2"
            disabled={route.availableSeats === 0}
          >
            {route.availableSeats === 0 ? 'Fully Booked' : 'Continue to Seat Selection'}
            {route.availableSeats > 0 && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

const SeatSelection: React.FC<{ 
  route: any; 
  stop: any;
  timeSlot: any; 
  onSeatSelect: (seat: string) => void; 
  onBack: () => void 
}> = ({ route, stop, timeSlot, onSeatSelect, onBack }) => {
  const [selectedSeat, setSelectedSeat] = useState('');

  // Generate seat layout (simplified)
  const seatRows = Array.from({ length: 10 }, (_, i) => ({
    row: i + 1,
    seats: ['A', 'B', 'C', 'D'].map(letter => ({
      id: `${letter}${i + 1}`,
      available: Math.random() > 0.3, // Random availability
      isSelected: false,
    }))
  }));

  const handleSeatClick = (seatId: string, available: boolean) => {
    if (available) {
      setSelectedSeat(seatId);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
          ←
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Select Your Seat</h2>
          <p className="text-gray-600">{route.routeName} - {stop.name} at {timeSlot.time}</p>
        </div>
      </div>

      {/* Journey Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-blue-600 font-medium">Route</p>
            <p className="text-blue-900">{route.routeName}</p>
          </div>
          <div>
            <p className="text-blue-600 font-medium">Boarding At</p>
            <p className="text-blue-900">{stop.name}</p>
          </div>
          <div>
            <p className="text-blue-600 font-medium">Departure</p>
            <p className="text-blue-900">{timeSlot.time}</p>
          </div>
          <div>
            <p className="text-blue-600 font-medium">Status</p>
            <p className="text-blue-900">Covered by pass</p>
          </div>
        </div>
      </div>

      {/* Seat Map */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="text-center mb-4">
          <div className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg">Driver</div>
        </div>
        
        <div className="space-y-3">
          {seatRows.map((row) => (
            <div key={row.row} className="flex items-center justify-center gap-2">
              <div className="w-8 text-center text-sm font-medium text-gray-600">{row.row}</div>
              <div className="flex gap-2">
                {row.seats.slice(0, 2).map((seat) => (
                  <SeatIcon
                    key={seat.id}
                    seat={seat}
                    isSelected={selectedSeat === seat.id}
                    onClick={() => handleSeatClick(seat.id, seat.available)}
                  />
                ))}
              </div>
              <div className="w-8"></div> {/* Aisle */}
              <div className="flex gap-2">
                {row.seats.slice(2, 4).map((seat) => (
                  <SeatIcon
                    key={seat.id}
                    seat={seat}
                    isSelected={selectedSeat === seat.id}
                    onClick={() => handleSeatClick(seat.id, seat.available)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
            <span className="text-sm text-gray-600">Occupied</span>
          </div>
        </div>
      </div>

      {selectedSeat && (
        <div className="text-center">
          <button
            onClick={() => onSeatSelect(selectedSeat)}
            className="btn-primary"
          >
            Continue with Seat {selectedSeat}
          </button>
        </div>
      )}
    </div>
  );
};

const SeatIcon: React.FC<{ seat: any; isSelected: boolean; onClick: () => void }> = ({ seat, isSelected, onClick }) => {
  return (
    <div
      className={`w-8 h-8 rounded cursor-pointer border-2 transition-all ${
        !seat.available 
          ? 'bg-gray-400 border-gray-400 cursor-not-allowed'
          : isSelected
          ? 'bg-blue-500 border-blue-500'
          : 'bg-green-500 border-green-500 hover:bg-green-600'
      }`}
      onClick={onClick}
    />
  );
};

const PaymentFlow: React.FC<{ 
  route: any; 
  stop: any;
  timeSlot: any; 
  seat: string; 
  onBack: () => void 
}> = ({ route, stop, timeSlot, seat, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 3000);
  };

  if (isCompleted) {
    return <BookingConfirmation route={route} stop={stop} timeSlot={timeSlot} seat={seat} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
          ←
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
          <p className="text-gray-600">Secure payment for your trip</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Route</span>
              <span className="font-medium">{route.routeName}</span>
            </div>
                          <div className="flex justify-between">
                <span className="text-gray-600">Boarding At</span>
                <span className="font-medium">{stop.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{timeSlot.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seat</span>
                <span className="font-medium">{seat}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-lg font-semibold">Payment Status</span>
                <span className="text-lg font-bold text-green-600">Covered by Pass</span>
              </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
          <div className="space-y-3 mb-6">
            {[
              { id: 'upi', label: 'UPI Payment', icon: '📱' },
              { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
              { id: 'wallet', label: 'Digital Wallet', icon: '💰' },
            ].map((method) => (
              <label key={method.id} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-2xl">{method.icon}</span>
                <span className="font-medium">{method.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing Payment...
                          </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              Confirm Booking
            </>
          )}
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingConfirmation: React.FC<{ 
  route: any; 
  stop: any;
  timeSlot: any; 
  seat: string 
}> = ({ route, stop, timeSlot, seat }) => {
  const bookingId = `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const qrCode = `${bookingId}ETICKET${Date.now()}`;

  // Generate e-ticket data
  const generateETicket = () => {
    const eTicketData = {
      id: bookingId,
      routeName: route.routeName,
      date: new Date().toISOString().split('T')[0],
      departureTime: timeSlot.time,
      boardingStop: stop.name,
      seatNumber: seat,
      status: 'needs-confirmation',
      bookingDate: new Date().toISOString().split('T')[0],
      boardingPass: true,
      qrCode: qrCode,
      eTicketGenerated: true,
      passengerName: 'John Doe',
      studentId: 'STU001',
      routeDetails: {
        from: stop.name,
        to: route.endLocation,
        distance: '25 km',
        estimatedDuration: route.estimatedDuration
      }
    };
    
    // Save to localStorage (in real app, this would be an API call)
    const existingBookings = JSON.parse(localStorage.getItem('studentBookings') || '[]');
    existingBookings.push(eTicketData);
    localStorage.setItem('studentBookings', JSON.stringify(existingBookings));
    
    return eTicketData;
  };

  const eTicket = generateETicket();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-green-600" />
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-4">Your e-boarding pass has been generated</p>
      
      {/* E-Ticket Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <QrCode className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-800">E-Ticket Generated</span>
        </div>
        <p className="text-sm text-blue-700">
          Your boarding pass will be available after 7:00 PM for tomorrow's trip
        </p>
      </div>

      {/* E-Boarding Pass */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">E-Boarding Pass</h3>
          <span className="text-sm text-gray-500">#{bookingId}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Route</p>
            <p className="font-semibold">{route.routeName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Boarding Stop</p>
            <p className="font-semibold">{stop.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Departure</p>
            <p className="font-semibold">{timeSlot.time}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Seat</p>
            <p className="font-semibold">{seat}</p>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <QrCode className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        <p className="text-xs text-gray-500">Show this QR code when boarding the bus</p>
      </div>

              <div className="flex gap-4 justify-center">
          <button 
            onClick={() => {
              const ticketData = `
TRAVENT TMS - E-TICKET CONFIRMATION
==================================
Booking ID: ${eTicket.id}
Passenger: ${eTicket.passengerName}
Student ID: ${eTicket.studentId}
Date: ${new Date(eTicket.date).toLocaleDateString('en-GB')}
Route: ${eTicket.routeName}
From: ${eTicket.routeDetails.from}
To: ${eTicket.routeDetails.to}
Departure: ${eTicket.departureTime}
Seat: ${eTicket.seatNumber}
QR Code: ${eTicket.qrCode}

Status: ${eTicket.status}
Generated on: ${new Date().toLocaleString()}

NOTE: Boarding pass will be available 
after 7:00 PM for next day trips.

Remember to confirm your trip between 
4-7 PM the day before departure.
              `;
              
              const element = document.createElement('a');
              const file = new Blob([ticketData], { type: 'text/plain' });
              element.href = URL.createObjectURL(file);
              element.download = `e-ticket-${eTicket.id}.txt`;
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download E-Ticket
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            View My Bookings
          </button>
        </div>

        {/* Boarding Pass Reminder */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-4 h-4 text-yellow-600" />
            <span className="font-medium text-yellow-800">Important Reminder</span>
          </div>
          <p className="text-sm text-yellow-700">
                         Your digital boarding pass will be available in the "E-Boarding Pass" tab after 7:00 PM for tomorrow's trip. 
             Don't forget to confirm your trip between 4-7 PM the day before departure.
          </p>
        </div>
    </div>
  );
};

const MyBookings: React.FC<{ bookings: any[] }> = ({ bookings }) => {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
      {bookings.length === 0 && (
        <div className="text-center py-12">
          <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500">Schedule your first trip to get started!</p>
        </div>
      )}
    </div>
  );
};

const BookingCard: React.FC<{ booking: any }> = ({ booking }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showBoardingPass, setShowBoardingPass] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Confirmed' };
      case 'needs-confirmation':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Timer, label: 'Needs Confirmation' };
      case 'cancelled':
        return { color: 'bg-gray-100 text-gray-800', icon: XCircle, label: 'Cancelled' };
      case 'completed':
        return { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Trip Completed' };
      case 'no-show':
        return { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'No Show' };
          case 'fined':
      return { color: 'bg-red-100 text-red-800', icon: CreditCard, label: 'Fined' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, label: status };
    }
  };

  const statusConfig = getStatusConfig(booking.status);
  const StatusIcon = statusConfig.icon;

  // Check if confirmation is possible (4-7 PM previous day)
  const canConfirm = () => {
    if (booking.status !== 'needs-confirmation' || !booking.canConfirm) return false;
    
    const now = new Date();
    const confirmationDeadline = new Date(booking.confirmationDeadline);
    const confirmationStart = new Date(confirmationDeadline);
    confirmationStart.setHours(16, 0, 0, 0); // 4 PM
    
    return now >= confirmationStart && now <= confirmationDeadline;
  };

  // Check if cancellation is possible (before 7 PM previous day)
  const canCancel = () => {
    if (!booking.canCancel) return false;
    const now = new Date();
    const cancellationDeadline = new Date(booking.cancellationDeadline);
    return now < cancellationDeadline;
  };

  const handleConfirmBooking = () => {
    // API call to confirm booking
    console.log('Confirming booking:', booking.id);
    setShowConfirmDialog(false);
  };

  const handleCancelBooking = () => {
    // API call to cancel booking
    console.log('Cancelling booking:', booking.id);
    setShowCancelDialog(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{booking.routeName}</h3>
            <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
          </div>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
            <StatusIcon className="w-3 h-3" />
            {statusConfig.label}
          </span>
        </div>

        {/* Confirmation/Cancellation Alerts */}
        {booking.status === 'needs-confirmation' && (
          <div className={`mb-4 p-3 rounded-lg border ${
            canConfirm() 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                {canConfirm() ? 'Confirmation window is open!' : 'Confirmation required between 4-7 PM today'}
              </span>
            </div>
          </div>
        )}

        {booking.fine && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">
                Fine Applied: ₹{booking.fine} (No-show without cancellation)
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{booking.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Boarding Stop</p>
            <p className="font-medium">{booking.boardingStop}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium">{booking.departureTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Seat</p>
            <p className="font-medium">{booking.seatNumber}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Booked on {booking.bookingDate}
            {booking.fine && ` • Fine: ₹${booking.fine}`}
          </div>
          <div className="flex gap-2">
            {/* Confirmation button */}
            {booking.status === 'needs-confirmation' && canConfirm() && (
              <button 
                onClick={() => setShowConfirmDialog(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3" />
                Confirm
              </button>
            )}

            {/* Cancellation button */}
            {(booking.status === 'needs-confirmation' || booking.status === 'confirmed') && canCancel() && (
              <button 
                onClick={() => setShowCancelDialog(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
              >
                <XCircle className="w-3 h-3" />
                Cancel
              </button>
            )}

            {/* Show boarding pass */}
            {booking.boardingPass && booking.status === 'confirmed' && (
              <button 
                onClick={() => setShowBoardingPass(true)}
                className="btn-secondary text-sm flex items-center gap-1"
              >
                <QrCode className="w-3 h-3" />
                Show Pass
              </button>
            )}

            {/* Trip details */}
            <button className="btn-secondary text-sm flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Details
            </button>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Your Trip</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to confirm your trip on {booking.date} at {booking.departureTime}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmBooking}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
              >
                Yes, Confirm Trip
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancel Your Trip</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your trip on {booking.date}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelBooking}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Yes, Cancel Trip
              </button>
              <button
                onClick={() => setShowCancelDialog(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
              >
                Keep Trip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Boarding Pass Modal */}
      <AnimatePresence>
        {showBoardingPass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowBoardingPass(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg md:rounded-xl w-full h-full md:w-auto md:h-auto md:max-w-6xl md:max-h-[95vh] overflow-hidden m-0 md:m-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <AirlineBoardingPass booking={booking} onClose={() => setShowBoardingPass(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Barcode Component for Pass Verification - Improved Responsive Version
const Barcode: React.FC<{ passId: string; isCompact?: boolean }> = ({ passId, isCompact = false }) => {
  // Generate barcode-like pattern based on pass ID
  const generateBarcodePattern = (text: string) => {
    const patterns = [];
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      const width = (char % 4) + 1; // Width between 1-4
      patterns.push(width);
    }
    // Add some extra bars for visual appeal
    patterns.push(2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 4);
    return patterns;
  };

  const barcodePattern = generateBarcodePattern(passId);
  const maxBars = isCompact ? 30 : 35;
  const barWidth = isCompact ? 2 : 3;
  const baseHeight = isCompact ? 30 : 40;

  return (
    <div className={`flex items-end justify-center gap-[1px] bg-white rounded-lg shadow-sm border-2 border-gray-200 ${isCompact ? 'p-2' : 'p-4'} w-full max-w-full overflow-hidden`}>
      <div className="flex items-end gap-[1px] max-w-full">
        {barcodePattern.slice(0, maxBars).map((width, index) => (
          <div
            key={index}
            className="bg-black flex-shrink-0"
            style={{
              width: `${Math.max(2, width * barWidth)}px`,
              height: `${baseHeight + (width * (isCompact ? 8 : 12))}px`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Airline-Style Boarding Pass Component
const AirlineBoardingPass: React.FC<{ 
  booking: any; 
  onClose: () => void 
}> = ({ booking, onClose }) => {
  const passId = booking.qrCode || booking.id;
  const currentDate = new Date().toLocaleDateString('en-GB');
  
  const handleDownloadPNG = () => {
    const filename = `boarding-pass-${passId}-${currentDate.replace(/\//g, '-')}.png`;
    // Use different IDs for desktop and mobile to avoid conflicts
    const isMobile = window.innerWidth < 768;
    const elementId = isMobile ? 'boarding-pass-mobile' : 'boarding-pass-desktop';
    downloadBoardingPassAsPNG(elementId, filename);
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header - Minimal on Mobile */}
      <div className="flex items-center justify-between p-3 md:p-4 flex-shrink-0 border-b border-gray-200">
        <h2 className="text-lg md:text-2xl font-bold text-gray-900">E-Boarding Pass</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl p-2"
        >
          ✕
        </button>
      </div>

      {/* Boarding Pass Content */}
      <div className="flex-1 overflow-auto min-h-0">
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col items-center p-2 md:p-3 space-y-4">
          <div id="boarding-pass-desktop" className="w-full max-w-4xl bg-white border-2 border-blue-500 rounded-2xl overflow-hidden shadow-2xl mx-2">
            {/* Header Section - Ultra compact */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bus className="w-5 h-5" />
                  <div>
                    <h1 className="text-sm md:text-base font-bold tracking-wider">BOARDING PASS</h1>
                    <p className="text-blue-100 text-xs">TRAVENT TRANSPORTATION MANAGEMENT SYSTEM</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-100 text-xs">ELECTRONIC TICKET</div>
                  <div className="font-mono text-xs">BK001</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Left Stub - Ultra compact */}
              <div className="flex-shrink-0 md:w-36 bg-gray-50 p-2 md:border-r-2 border-dashed border-gray-300">
                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-semibold text-gray-500">PASSENGER</div>
                    <div className="font-bold text-sm text-gray-900">John Doe</div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-semibold text-gray-500">FROM</div>
                    <div className="font-semibold text-xs text-gray-900">Erode Bus Stand</div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-500">TO</div>
                    <div className="font-semibold text-xs text-gray-900">JKKN Campus</div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-500">SEAT</div>
                    <div className="font-bold text-base text-blue-600">A12</div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-500">DEPARTURE</div>
                    <div className="font-bold text-sm text-gray-900">07:00 AM</div>
                  </div>
                </div>
              </div>

              {/* Main Section - Ultra compact */}
              <div className="flex-1 p-2">
                {/* Passenger & Trip Info - Ultra compact */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  <div>
                    <div className="text-xs font-semibold text-gray-500">PASSENGER NAME</div>
                    <div className="font-bold text-sm text-gray-900">John Doe</div>
                    <div className="text-xs text-gray-600">STU001</div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-500">ROUTE</div>
                    <div className="font-bold text-sm text-gray-900">01</div>
                    <div className="text-xs text-gray-600">Erode Central</div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-500">DATE</div>
                    <div className="font-bold text-sm text-gray-900">25/06/2025</div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-500">SEAT</div>
                    <div className="font-bold text-sm text-blue-600">A12</div>
                  </div>
                </div>

                {/* Route Visualization - Ultra compact */}
                <div className="flex items-center justify-center mb-2">
                  <div className="text-center">
                    <div className="text-xs font-semibold text-gray-500">DEPARTURE</div>
                    <div className="font-bold text-base text-gray-900">ERODE</div>
                    <div className="text-xs text-gray-600">Erode Bus Stand</div>
                    <div className="font-bold text-sm text-blue-600">07:00 AM</div>
                  </div>
                  
                  <div className="mx-3 flex items-center">
                    <div className="w-4 h-px bg-gray-400"></div>
                    <Bus className="w-4 h-4 text-blue-500 mx-1" />
                    <div className="w-4 h-px bg-gray-400"></div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs font-semibold text-gray-500">ARRIVAL</div>
                    <div className="font-bold text-base text-gray-900">JKKN</div>
                    <div className="text-xs text-gray-600">JKKN Campus</div>
                    <div className="font-bold text-sm text-gray-600">09:00 AM</div>
                  </div>
                </div>

                {/* Ultra Compact Barcode Section */}
                <div className="text-center bg-gray-50 rounded-lg p-1.5 border-2 border-dashed border-gray-300">
                  <div className="text-xs font-semibold text-gray-800 mb-1.5 tracking-wider">SCAN TO BOARD BUS</div>
                  <div className="w-full max-w-64 mx-auto mb-1.5">
                    <Barcode passId={passId} isCompact={true} />
                  </div>
                  <div className="font-mono text-xs text-gray-700 break-all tracking-wider bg-white p-1 rounded border border-gray-200 mb-1 max-w-36 mx-auto">
                    BK-8K0UZ
                  </div>
                  <div className="text-xs text-gray-500">
                    Present this barcode to the driver for verification
                  </div>
                </div>
              </div>
            </div>

            {/* Ultra Compact Footer */}
            <div className="bg-gray-100 px-3 py-1.5 border-t border-gray-200">
              <div className="flex flex-wrap justify-between items-center text-xs text-gray-600 gap-1">
                <div>Status: <span className="font-semibold text-green-600">CONFIRMED</span></div>
                <div>Gate: <span className="font-semibold">GA</span></div>
                <div>Generated: {currentDate}</div>
                <div className="font-semibold">Valid for single journey only</div>
              </div>
            </div>
                      </div>
            
            {/* Desktop Action Buttons */}
            <div className="flex justify-center gap-4 w-full max-w-4xl">
              <button
                onClick={handleDownloadPNG}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PNG
              </button>
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>

        {/* Mobile Layout - Completely Redesigned */}
        <div className="md:hidden h-full flex flex-col min-h-0">
          <div className="flex-1 p-2 overflow-auto">
            {/* Mobile Airline Ticket Style */}
            <div id="boarding-pass-mobile" className="bg-white border-2 border-blue-500 rounded-xl overflow-hidden shadow-lg mb-2">
              {/* Blue Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bus className="w-5 h-5" />
                    <div>
                      <h1 className="text-sm font-bold">BOARDING PASS</h1>
                      <p className="text-xs text-blue-100">TRAVENT TMS</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-100">E-TICKET</div>
                    <div className="font-mono text-xs">{booking.id}</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-2 space-y-2">
                {/* Passenger & Seat - Top Priority */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-xs font-semibold text-blue-600 mb-1">PASSENGER</div>
                    <div className="font-bold text-sm text-gray-900">John Doe</div>
                    <div className="text-xs text-gray-600">STU001</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-xs font-semibold text-green-600 mb-1">SEAT NO.</div>
                    <div className="font-bold text-2xl text-green-600">A12</div>
                    <div className="text-xs text-green-600">Gate GA</div>
                  </div>
                </div>

                {/* Route Information - Airline Style */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <div className="text-xs font-semibold text-gray-500">FROM</div>
                      <div className="font-bold text-lg text-gray-900">ERODE</div>
                      <div className="text-xs text-gray-600 truncate">Erode Bus Stand</div>
                      <div className="font-bold text-blue-600 mt-1">07:00 AM</div>
                    </div>
                    
                    <div className="mx-3 flex flex-col items-center">
                      <div className="w-8 h-px bg-gray-400 mb-1"></div>
                      <Bus className="w-4 h-4 text-blue-500" />
                      <div className="w-8 h-px bg-gray-400 mt-1"></div>
                      <div className="text-xs text-gray-500 mt-1">
                        {booking.routeNumber || booking.routeName?.split(' ')[1] || 'R01'}
                      </div>
                    </div>
                    
                    <div className="text-center flex-1">
                      <div className="text-xs font-semibold text-gray-500">TO</div>
                      <div className="font-bold text-lg text-gray-900">JKKN</div>
                      <div className="text-xs text-gray-600 truncate">JKKN Campus</div>
                      <div className="font-bold text-gray-600 mt-1">09:00 AM</div>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-xs font-semibold text-gray-500">DATE</div>
                    <div className="font-bold text-sm text-gray-900">{new Date(booking.date).toLocaleDateString('en-GB')}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <div className="text-xs font-semibold text-blue-500">STATUS</div>
                    <div className="font-bold text-sm text-green-600">{booking.status.toUpperCase()}</div>
                  </div>
                </div>
              </div>

              {/* Large Barcode Section - Bottom */}
              <div className="border-t-2 border-dashed border-gray-300 p-4 bg-gray-50">
                <div className="text-center">
                  <div className="text-base font-bold text-gray-800 mb-4 tracking-wide">SCAN TO BOARD BUS</div>
                  <div className="w-full max-w-xs mx-auto mb-4">
                    <Barcode passId={passId} isCompact={true} />
                  </div>
                  <div className="font-mono text-xs text-gray-600 break-all px-2 bg-white rounded p-2 border border-gray-200 max-w-48 mx-auto">
                    BK-8K0UZ
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Show this barcode to the driver when boarding
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="bg-blue-600 text-white px-3 py-2 text-center">
                <div className="text-xs">
                  Generated: {currentDate} • Valid for single journey • Arrive 10 min early
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Fixed at Bottom */}
          <div className="flex-shrink-0 p-2 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPNG}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Download Pass
              </button>
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice - Desktop Only - Ultra compact */}
      <div className="hidden md:block p-1 md:p-2">
        <div className="max-w-4xl mx-auto p-2 bg-yellow-50 border border-yellow-200 rounded-lg mx-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1 text-xs">Important Boarding Instructions</h4>
              <ul className="text-xs text-yellow-700 space-y-0.5">
                <li>• Present this boarding pass to the driver when boarding the bus</li>
                <li>• Arrive at boarding stop 10 minutes before departure time (07:00 AM)</li>
                <li>• Keep your student ID card ready for verification if requested</li>
                <li>• This e-boarding pass is valid for single journey only - Route 01 (Erode to JKKN)</li>
                <li>• For support: support@traventtms.com or call 1800-XXX-XXXX</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Boarding Pass Dashboard Component
const BoardingPassDashboard: React.FC<{
  isBoardingWindowOpen: boolean;
  nextTrip: any;
  studentInfo: any;
}> = ({ isBoardingWindowOpen, nextTrip, studentInfo }) => {
  const [showFullTicket, setShowFullTicket] = useState(false);
  
  const handleDownloadDashboardPNG = () => {
    const currentDate = new Date().toLocaleDateString('en-GB');
    const filename = `boarding-pass-dashboard-${nextTrip.id}-${currentDate.replace(/\//g, '-')}.png`;
    downloadBoardingPassAsPNG('boarding-pass-dashboard', filename);
  };

  // If boarding window is not open (before 7 PM)
  if (!isBoardingWindowOpen) {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-2xl mx-auto">
          <Timer className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">Boarding Pass Unavailable</h2>
          <p className="text-yellow-700 mb-4">
            E-boarding passes are only available after 7:00 PM for next day trips
          </p>
          <div className="bg-white p-4 rounded-lg border border-yellow-300">
            <div className="flex items-center justify-center gap-2 text-yellow-800">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Current Time: {new Date().toLocaleTimeString()}</span>
            </div>
            <p className="text-sm text-yellow-600 mt-2">
              Please return after 7:00 PM to access your boarding pass
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If no confirmed trip for tomorrow
  if (!nextTrip) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto">
          <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Boarding Pass Available</h2>
          <p className="text-gray-600 mb-6">
            You don't have any confirmed trips for tomorrow
          </p>
          <button
            onClick={() => {}}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Schedule a Trip
          </button>
        </div>
      </div>
    );
  }

  // Show boarding pass for confirmed trip
  return (
    <div className="max-w-4xl mx-auto">
      {/* Boarding Pass Available Alert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-800 mb-1">
              Your E-Boarding Pass is Ready! 🎉
            </h3>
            <p className="text-green-700 text-sm">
              Your trip is confirmed. Show this QR code when boarding the bus tomorrow.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-600">Trip Date</p>
            <p className="font-bold text-green-800">{new Date(nextTrip.date).toLocaleDateString('en-GB')}</p>
          </div>
        </div>
      </motion.div>

      {/* E-Boarding Pass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        id="boarding-pass-dashboard"
        className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
      >
        {/* Header with Bus Logo */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">TRAVENT TMS</h2>
              <p className="text-blue-100">E-Boarding Pass</p>
            </div>
            <div className="text-right">
              <Bus className="w-12 h-12 text-white mb-2 ml-auto" />
              <p className="text-xs text-blue-100">Digital Ticket</p>
            </div>
          </div>
        </div>

        {/* Passenger & Trip Information */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Passenger Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Passenger Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{nextTrip.passengerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Student ID:</span>
                    <span className="font-medium">{nextTrip.studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seat Number:</span>
                    <span className="font-medium text-blue-600">{nextTrip.seatNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Trip Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{nextTrip.routeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium">{nextTrip.routeDetails.from}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">{nextTrip.routeDetails.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">{nextTrip.routeDetails.distance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Journey Schedule
            </h3>
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Departure</p>
                  <p className="text-xl font-bold text-orange-600">{nextTrip.departureTime}</p>
                  <p className="text-sm text-gray-500">{nextTrip.boardingStop}</p>
                </div>
                <div className="flex-1 mx-4">
                  <div className="relative">
                    <div className="h-1 bg-orange-300 rounded"></div>
                    <Bus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-orange-600 bg-white rounded-full p-1" />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">{nextTrip.routeDetails.estimatedDuration}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Arrival</p>
                  <p className="text-xl font-bold text-green-600">
                    {new Date(`1970-01-01 ${nextTrip.departureTime}`).getTime() + 90 * 60 * 1000 > 0 
                      ? new Date(new Date(`1970-01-01 ${nextTrip.departureTime}`).getTime() + 90 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                      : 'Est. 8:30 AM'}
                  </p>
                  <p className="text-sm text-gray-500">{nextTrip.routeDetails.to}</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="text-center">
            <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300 mb-4">
              <QrCode className="w-32 h-32 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-900 mb-2">Scan to Board</p>
              <p className="text-sm text-gray-600 mb-3">
                Show this QR code to the driver when boarding
              </p>
              <div className="bg-white p-2 rounded border font-mono text-xs text-gray-500">
                {nextTrip.qrCode}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowFullTicket(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Full Ticket View
              </button>
              <button
                onClick={handleDownloadDashboardPNG}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Pass
              </button>
            </div>
          </div>
        </div>

        {/* Important Instructions */}
        <div className="bg-blue-50 border-t border-blue-200 p-4">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Important Instructions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3" />
              <span>Arrive 10 minutes before departure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3" />
              <span>Carry your student ID card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3" />
              <span>Follow COVID-19 safety protocols</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3" />
              <span>Valid for single journey only</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Full Ticket Modal */}
      <AnimatePresence>
        {showFullTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowFullTicket(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full ticket content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Full E-Boarding Pass</h3>
                  <button
                    onClick={() => setShowFullTicket(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Detailed ticket view */}
                <div className="space-y-4 text-sm">
                  <div className="border-b pb-4">
                    <h4 className="font-semibold mb-2">Passenger Details</h4>
                    <p>Name: {nextTrip.passengerName}</p>
                    <p>Student ID: {nextTrip.studentId}</p>
                    <p>Department: {studentInfo.department}</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-semibold mb-2">Journey Details</h4>
                    <p>Date: {new Date(nextTrip.date).toLocaleDateString('en-GB')}</p>
                    <p>Route: {nextTrip.routeName}</p>
                    <p>From: {nextTrip.routeDetails.from}</p>
                    <p>To: {nextTrip.routeDetails.to}</p>
                    <p>Departure: {nextTrip.departureTime}</p>
                    <p>Seat: {nextTrip.seatNumber}</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-semibold mb-2">Booking Information</h4>
                    <p>Booking ID: {nextTrip.id}</p>
                    <p>Status: {nextTrip.status}</p>
                    <p>Booked on: {new Date(nextTrip.bookingDate).toLocaleDateString('en-GB')}</p>
                  </div>
                  
                  <div className="text-center py-4">
                    <QrCode className="w-24 h-24 mx-auto text-gray-400 mb-2" />
                    <p className="font-mono text-xs text-gray-500">{nextTrip.qrCode}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SchedulesPage; 