import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { Student, StudentDashboardData, Booking, Payment, Grievance, Route, Schedule, Notification, RouteStop } from '@/types';
import { sessionManager } from './session';

// Note: Type definitions would be generated from your Supabase schema
type Database = any;

// Lazy client creation to avoid environment variable loading issues
let _supabase: any = null;

function getSupabaseClient() {
  if (!_supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(`Missing Supabase environment variables. URL: ${!!supabaseUrl}, Key: ${!!supabaseAnonKey}`);
    }

    _supabase = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  }
  
  return _supabase;
}

// Export the lazy client
export const supabase = new Proxy({} as any, {
  get(target, prop) {
    return getSupabaseClient()[prop];
  }
});

// Also export a createClient function for compatibility with API routes
export function createClient() {
  return getSupabaseClient();
}

// Data transformation helpers
const transformStudent = (dbStudent: any): Student => ({
  id: dbStudent.id,
  studentName: dbStudent.student_name,
  rollNumber: dbStudent.roll_number,
  email: dbStudent.email,
  mobile: dbStudent.mobile,
  passwordHash: dbStudent.password_hash,
  dateOfBirth: dbStudent.date_of_birth,
  gender: dbStudent.gender,
  fatherName: dbStudent.father_name,
  motherName: dbStudent.mother_name,
  address: dbStudent.address,
  addressStreet: dbStudent.address_street,
  addressDistrict: dbStudent.address_district,
  addressState: dbStudent.address_state,
  addressPinCode: dbStudent.address_pin_code,
  emergencyContactName: dbStudent.emergency_contact_name,
  emergencyContactPhone: dbStudent.emergency_contact_phone,
  academicYear: dbStudent.academic_year,
  semester: dbStudent.semester,
  firstLoginCompleted: dbStudent.first_login_completed,
  profileCompletionPercentage: dbStudent.profile_completion_percentage,
  lastLogin: dbStudent.last_login,
  department: dbStudent.department,
  program: dbStudent.program,
  institution: dbStudent.institution,
  transportProfile: dbStudent.transport_profile,
  createdAt: dbStudent.created_at,
  updatedAt: dbStudent.updated_at
});

const transformRoute = (dbRoute: any): Route => ({
  id: dbRoute.id,
  routeNumber: dbRoute.route_number,
  routeName: dbRoute.route_name,
  startLocation: dbRoute.start_location,
  endLocation: dbRoute.end_location,
  startLatitude: dbRoute.start_latitude,
  startLongitude: dbRoute.start_longitude,
  endLatitude: dbRoute.end_latitude,
  endLongitude: dbRoute.end_longitude,
  departureTime: dbRoute.departure_time,
  arrivalTime: dbRoute.arrival_time,
  distance: dbRoute.distance,
  duration: dbRoute.duration,
  totalCapacity: dbRoute.total_capacity,
  currentPassengers: dbRoute.current_passengers,
  status: dbRoute.status,
  driverId: dbRoute.driver_id,
  vehicleId: dbRoute.vehicle_id,
  stops: dbRoute.stops?.map((stop: any) => ({
    id: stop.id,
    routeId: stop.route_id,
    stopName: stop.stop_name,
    stopTime: stop.stop_time,
    sequenceOrder: stop.sequence_order,
    latitude: stop.latitude,
    longitude: stop.longitude,
    isMajorStop: stop.is_major_stop,
    createdAt: stop.created_at
  })) || [],
  fare: dbRoute.fare,
  createdAt: dbRoute.created_at,
  updatedAt: dbRoute.updated_at
});

const transformBooking = (dbBooking: any): Booking => ({
  id: dbBooking.id,
  studentId: dbBooking.student_id,
  routeId: dbBooking.route_id,
  scheduleId: dbBooking.schedule_id,
  bookingDate: dbBooking.booking_date,
  tripDate: dbBooking.trip_date,
  boardingStop: dbBooking.boarding_stop,
  seatNumber: dbBooking.seat_number,
  status: dbBooking.status,
  paymentStatus: dbBooking.payment_status,
  amount: dbBooking.amount,
  qrCode: dbBooking.qr_code,
  specialRequirements: dbBooking.special_requirements,
  route: dbBooking.route ? transformRoute(dbBooking.route) : undefined,
  schedule: dbBooking.schedule ? {
    id: dbBooking.schedule.id,
    routeId: dbBooking.schedule.route_id,
    scheduleDate: dbBooking.schedule.schedule_date,
    departureTime: dbBooking.schedule.departure_time,
    arrivalTime: dbBooking.schedule.arrival_time,
    availableSeats: dbBooking.schedule.available_seats,
    bookedSeats: dbBooking.schedule.booked_seats,
    status: dbBooking.schedule.status,
    driverId: dbBooking.schedule.driver_id,
    vehicleId: dbBooking.schedule.vehicle_id,
    createdAt: dbBooking.schedule.created_at
  } : undefined,
  createdAt: dbBooking.created_at,
  updatedAt: dbBooking.updated_at
});

const transformPayment = (dbPayment: any): Payment => ({
  id: dbPayment.id,
  studentId: dbPayment.student_id,
  bookingId: dbPayment.booking_id,
  amount: dbPayment.amount,
  paymentType: dbPayment.payment_type,
  paymentMethod: dbPayment.payment_method,
  status: dbPayment.status,
  transactionId: dbPayment.transaction_id,
  description: dbPayment.description,
  receiptNumber: dbPayment.receipt_number,
  createdAt: dbPayment.created_at,
  updatedAt: dbPayment.updated_at
});

const transformGrievance = (dbGrievance: any): Grievance => ({
  id: dbGrievance.id,
  studentId: dbGrievance.student_id,
  routeId: dbGrievance.route_id,
  driverName: dbGrievance.driver_name,
  category: dbGrievance.category,
  priority: dbGrievance.priority,
  subject: dbGrievance.subject,
  description: dbGrievance.description,
  status: dbGrievance.status,
  assignedTo: dbGrievance.assigned_to,
  resolution: dbGrievance.resolution,
  attachments: dbGrievance.attachments,
  createdAt: dbGrievance.created_at,
  updatedAt: dbGrievance.updated_at,
  resolvedAt: dbGrievance.resolved_at
});

// Helper functions for student operations
export const studentHelpers = {
  // First time login with DOB (using API route)
  async firstTimeLogin(email: string, dateOfBirth: string, newPassword: string) {
    try {
      // Call API route for first-time login
      const response = await fetch('/api/auth/first-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          dateOfBirth,
          newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'First time login failed');
      }

      return { student: data.student };
    } catch (error: any) {
      throw new Error(error.message || 'First time login failed');
    }
  },

  // Regular login using API route
  async signIn(email: string, password: string) {
    try {
      // Call API route for login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      return { user: data.user, session: data.session, student: data.student };
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  // Get student dashboard data
  async getDashboardData(studentId: string): Promise<StudentDashboardData> {
    try {
      // Get basic student profile first
      const { data: profile, error: profileError } = await supabase
        .from('students')
        .select('*')
        .eq('id', studentId)
        .single();

      if (profileError || !profile) {
        throw new Error('Student profile not found');
      }

      // Try to get additional data, but don't fail if tables don't exist
      let upcomingBookings: any[] = [];
      let recentPayments: any[] = [];
      let notifications: any[] = [];
      let activeGrievances = 0;

      // Try to get bookings
      try {
        const { data: bookingsData } = await supabase
          .from('bookings')
          .select(`
            *,
            route:routes(*)
          `)
          .eq('student_id', studentId)
          .gte('trip_date', new Date().toISOString().split('T')[0])
          .order('trip_date', { ascending: true })
          .limit(5);
        upcomingBookings = bookingsData || [];
      } catch (error) {
        console.warn('Bookings table not accessible:', error);
      }

      // Try to get payments
      try {
        const { data: paymentsData } = await supabase
          .from('payments')
          .select('*')
          .eq('student_id', studentId)
          .order('created_at', { ascending: false })
          .limit(10);
        recentPayments = paymentsData || [];
      } catch (error) {
        console.warn('Payments table not accessible:', error);
      }

      // Try to get notifications
      try {
        const { data: notificationsData } = await supabase
          .from('notifications')
          .select('*')
          .or(`target_audience.eq.all,target_audience.eq.students`)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(5);
        notifications = notificationsData || [];
      } catch (error) {
        console.warn('Notifications table not accessible:', error);
      }

      // Try to get grievances count
      try {
        const { count } = await supabase
          .from('grievances')
          .select('*', { count: 'exact', head: true })
          .eq('student_id', studentId)
          .in('status', ['open', 'in_progress']);
        activeGrievances = count || 0;
      } catch (error) {
        console.warn('Grievances table not accessible:', error);
      }

      // Calculate quick stats
      const totalTrips = 0; // Will be calculated when attendance data is available
      const totalSpent = recentPayments
        .filter(p => p.status === 'completed')
        .reduce((sum, payment) => sum + payment.amount, 0);
      const upcomingTrips = upcomingBookings.filter(b => b.status === 'confirmed').length;

      // Check transport status properly
      const transportStatus = {
        hasActiveRoute: false,
        routeInfo: null,
        pendingPayments: 0,
        totalFines: 0,
        lastTripDate: undefined
      };

      // Check if student has active transport enrollment
      if (profile.transport_enrolled && profile.allocated_route_id) {
        console.log('🔍 Student has transport enrollment, fetching route details...');
        
        try {
          // Get the allocated route details
          const { data: routeData, error: routeError } = await supabase
            .from('routes')
            .select('*')
            .eq('id', profile.allocated_route_id)
            .single();

          if (!routeError && routeData) {
            transportStatus.hasActiveRoute = true;
            transportStatus.routeInfo = {
              id: routeData.id,
              route_number: routeData.route_number,
              route_name: routeData.route_name,
              start_location: routeData.start_location,
              end_location: routeData.end_location,
              departure_time: routeData.departure_time,
              arrival_time: routeData.arrival_time,
              fare: routeData.fare,
              status: routeData.status,
              boarding_point: profile.boarding_point
            };
            
            console.log('✅ Active route found:', routeData.route_number, '-', routeData.route_name);
          } else {
            console.warn('Route not found for allocated_route_id:', profile.allocated_route_id);
          }
        } catch (error) {
          console.warn('Error fetching route details:', error);
        }
      } else {
        console.log('📋 Student not enrolled in transport or no route allocated');
        console.log('   - transport_enrolled:', profile.transport_enrolled);
        console.log('   - allocated_route_id:', profile.allocated_route_id);
        console.log('   - transport_status:', profile.transport_status);
        console.log('   - enrollment_status:', profile.enrollment_status);
      }

      return {
        profile,
        upcomingBookings,
        recentPayments,
        notifications,
        transportStatus,
        quickStats: {
          totalTrips,
          totalSpent,
          upcomingTrips,
          activeGrievances
        }
      };
    } catch (error: any) {
      console.error('Dashboard data error:', error);
      throw new Error('Failed to fetch dashboard data: ' + error.message);
    }
  },

  // Get available routes for booking
  async getAvailableRoutes(): Promise<Route[]> {
    const { data, error } = await supabase
      .from('routes')
      .select(`
        *,
        stops:route_stops(*)
      `)
      .eq('status', 'active')
      .order('route_number');

    if (error) throw error;
    return data?.map(transformRoute) || [];
  },

  // Get student's allocated route with boarding stop
  async getStudentAllocatedRoute(studentId: string): Promise<{
    route: Route | null;
    boardingStop: RouteStop | null;
    allocation: any;
  }> {
    try {
      
      // Try to get student route allocation from the new table structure
      const { data: allocation, error: allocationError } = await supabase
        .from('student_route_allocations')
        .select(`
          *,
          route:routes(*),
          boarding_stop:route_stops(*)
        `)
        .eq('student_id', studentId)
        .eq('is_active', true)
        .single();

      if (allocationError && allocationError.code !== 'PGRST116') {
        console.error('Error fetching student allocation:', allocationError);
        
        // Fall back to old method if new table doesn't exist
        return this.getStudentAllocatedRouteLegacy(studentId);
      }

      if (!allocation) {
        return {
          route: null,
          boardingStop: null,
          allocation: {
            id: null,
            allocatedAt: null,
            isActive: false
          }
        };
      }

      // Get route stops for the allocated route
      const { data: routeStops, error: stopsError } = await supabase
        .from('route_stops')
        .select('*')
        .eq('route_id', allocation.route_id)
        .order('sequence_order');

      if (stopsError) {
        console.error('Error fetching route stops:', stopsError);
      }

      // Transform route data to match our interface with proper field mapping
      const transformedRoute: Route = {
        id: allocation.route.id,
        routeNumber: allocation.route.route_number,
        routeName: allocation.route.route_name,
        startLocation: allocation.route.start_location,
        endLocation: allocation.route.end_location,
        distance: allocation.route.distance,
        duration: allocation.route.duration,
        departureTime: allocation.route.departure_time,
        arrivalTime: allocation.route.arrival_time,
        fare: allocation.route.fare,
        totalCapacity: allocation.route.total_capacity,
        currentPassengers: allocation.route.current_passengers || 0,
        status: allocation.route.status,
        createdAt: new Date(allocation.route.created_at),
        updatedAt: new Date(allocation.route.updated_at),
        stops: routeStops?.map(stop => ({
          id: stop.id,
          routeId: stop.route_id,
          stopName: stop.stop_name,
          stopTime: stop.stop_time,
          sequenceOrder: stop.sequence_order || 0,
          latitude: stop.latitude,
          longitude: stop.longitude,
          isMajorStop: stop.is_major_stop || false,
          createdAt: new Date(stop.created_at)
        })) || []
      };

      // Find the boarding stop
      let boardingStop: RouteStop | null = null;
      if (allocation.boarding_stop_id && routeStops) {
        const foundStop = routeStops.find(stop => stop.id === allocation.boarding_stop_id);
        if (foundStop) {
          boardingStop = {
            id: foundStop.id,
            routeId: foundStop.route_id,
            stopName: foundStop.stop_name,
            stopTime: foundStop.stop_time,
            sequenceOrder: foundStop.sequence_order || 0,
            latitude: foundStop.latitude,
            longitude: foundStop.longitude,
            isMajorStop: foundStop.is_major_stop || false,
            createdAt: new Date(foundStop.created_at)
          };
        }
      }

      return {
        route: transformedRoute,
        boardingStop,
        allocation: {
          id: allocation.id,
          allocatedAt: new Date(allocation.allocated_at),
          isActive: allocation.is_active
        }
      };

    } catch (error: any) {
      console.error('Error in getStudentAllocatedRoute:', error);
      throw new Error('Failed to fetch student route allocation: ' + error.message);
    }
  },

  // Legacy method for backward compatibility
  async getStudentAllocatedRouteLegacy(studentId: string): Promise<{
    route: Route | null;
    boardingStop: RouteStop | null;
    allocation: any;
  }> {
    try {
      // Get student data with transport profile
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select(`
          *,
          transport_profile:student_transport_profiles(*)
        `)
        .eq('id', studentId)
        .single();

      if (studentError) {
        console.error('Error fetching student:', studentError);
        return {
          route: null,
          boardingStop: null,
          allocation: null
        };
      }

      if (!student || !student.transport_profile) {
        return {
          route: null,
          boardingStop: null,
          allocation: {
            id: null,
            allocatedAt: null,
            isActive: false
          }
        };
      }

      // For legacy support, check if student has boarding point
      if (!student.transport_profile.boarding_point) {
        return {
          route: null,
          boardingStop: null,
          allocation: {
            id: null,
            allocatedAt: null,
            isActive: false
          }
        };
      }

      // Try to find a route that serves this boarding point
      const { data: routeStops, error: stopsError } = await supabase
        .from('route_stops')
        .select(`
          *,
          route:routes(*)
        `)
        .eq('stop_name', student.transport_profile.boarding_point)
        .limit(1);

      if (stopsError || !routeStops || routeStops.length === 0) {
        console.error('Error fetching route stops or no stops found:', stopsError);
        return {
          route: null,
          boardingStop: null,
          allocation: {
            id: null,
            allocatedAt: null,
            isActive: false
          }
        };
      }

      const routeStop = routeStops[0];
      
      // Get all stops for this route
      const { data: allRouteStops, error: allStopsError } = await supabase
        .from('route_stops')
        .select('*')
        .eq('route_id', routeStop.route_id)
        .order('sequence_order');

      if (allStopsError) {
        console.error('Error fetching all route stops:', allStopsError);
      }

      // Transform route data with proper field mapping
      const transformedRoute: Route = {
        id: routeStop.route.id,
        routeNumber: routeStop.route.route_number,
        routeName: routeStop.route.route_name,
        startLocation: routeStop.route.start_location,
        endLocation: routeStop.route.end_location,
        distance: routeStop.route.distance,
        duration: routeStop.route.duration,
        departureTime: routeStop.route.departure_time,
        arrivalTime: routeStop.route.arrival_time,
        fare: routeStop.route.fare,
        totalCapacity: routeStop.route.total_capacity,
        currentPassengers: routeStop.route.current_passengers || 0,
        status: routeStop.route.status,
        createdAt: new Date(routeStop.route.created_at),
        updatedAt: new Date(routeStop.route.updated_at),
        stops: allRouteStops?.map(stop => ({
          id: stop.id,
          routeId: stop.route_id,
          stopName: stop.stop_name,
          stopTime: stop.stop_time,
          sequenceOrder: stop.sequence_order || 0,
          latitude: stop.latitude,
          longitude: stop.longitude,
          isMajorStop: stop.is_major_stop || false,
          createdAt: new Date(stop.created_at)
        })) || []
      };

      // Transform boarding stop
      const boardingStop: RouteStop = {
        id: routeStop.id,
        routeId: routeStop.route_id,
        stopName: routeStop.stop_name,
        stopTime: routeStop.stop_time,
        sequenceOrder: routeStop.sequence_order || 0,
        latitude: routeStop.latitude,
        longitude: routeStop.longitude,
        isMajorStop: routeStop.is_major_stop || false,
        createdAt: new Date(routeStop.created_at)
      };

      return {
        route: transformedRoute,
        boardingStop,
        allocation: {
          id: student.transport_profile.id,
          allocatedAt: new Date(student.transport_profile.created_at),
          isActive: student.transport_profile.transport_status === 'active'
        }
      };

    } catch (error: any) {
      console.error('Error in getStudentAllocatedRouteLegacy:', error);
      throw new Error('Failed to fetch student route allocation: ' + error.message);
    }
  },

  // Updated method that tries both new and legacy approach
  async getStudentRouteAllocation(studentId: string): Promise<{
    route: Route | null;
    boardingStop: RouteStop | null;
    allocation: any;
  }> {
    try {
      // First try the new method
      const result = await this.getStudentAllocatedRoute(studentId);
      
      // If we get a result, return it
      if (result.route) {
        return result;
      }
      
      // Otherwise try the legacy method
      return await this.getStudentAllocatedRouteLegacy(studentId);
      
    } catch (error: any) {
      console.error('Error in getStudentRouteAllocation:', error);
      
      // Try legacy method as fallback
      try {
        return await this.getStudentAllocatedRouteLegacy(studentId);
      } catch (legacyError: any) {
        console.error('Legacy method also failed:', legacyError);
        throw new Error('Failed to fetch student route allocation: ' + error.message);
      }
    }
  },

  // Return type should be consistent with expectation
  async getStudentRouteAllocationFormatted(studentId: string): Promise<{
    route: {
      id: string;
      routeName: string;
      routeNumber: string;
      startLocation: string;
      endLocation: string;
      fare: number;
      departureTime: string;
      arrivalTime: string;
    } | null;
    boardingStop: {
      id: string;
      stopName: string;
      stopTime: string;
    } | null;
    allocation: {
      id: string | null;
      allocatedAt: Date | null;
      isActive: boolean;
    };
  }> {
    try {
      // Get student's route allocation using the formatted method
      const allocationData = await this.getStudentRouteAllocation(studentId);
      
      if (!allocationData || !allocationData.route) {
        return {
          route: null,
          boardingStop: null,
          allocation: {
            id: null,
            allocatedAt: null,
            isActive: false
          }
        };
      }

      // Format the response to match component expectations
      return {
        route: {
          id: allocationData.route.id,
          routeName: allocationData.route.routeName,
          routeNumber: allocationData.route.routeNumber,
          startLocation: allocationData.route.startLocation,
          endLocation: allocationData.route.endLocation,
          fare: allocationData.route.fare,
          departureTime: allocationData.route.departureTime,
          arrivalTime: allocationData.route.arrivalTime
        },
        boardingStop: allocationData.boardingStop ? {
          id: allocationData.boardingStop.id,
          stopName: allocationData.boardingStop.stopName,
          stopTime: allocationData.boardingStop.stopTime
        } : null,
        allocation: {
          id: allocationData.id || null,
          allocatedAt: null, // This field isn't available in the current structure
          isActive: allocationData.isActive || false
        }
      };
      
    } catch (error) {
      console.error('Error in getStudentRouteAllocationFormatted:', error);
      throw error;
    }
  },

  // Get route schedules with enhanced booking window validation
  async getRouteSchedules(routeId: string, dateFrom?: string, dateTo?: string): Promise<any[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const defaultEndDate = nextMonth.toISOString().split('T')[0];

      // Use the new availability API endpoint
      const response = await fetch(`/api/schedules/availability?routeId=${routeId}&startDate=${dateFrom || today}&endDate=${dateTo || defaultEndDate}`);
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${await response.text()}`);
      }
      
      const schedulesData = await response.json();
      
      // Convert to expected format
      return schedulesData.map((schedule: any) => ({
        id: schedule.id,
        scheduleDate: new Date(schedule.schedule_date),
        departureTime: schedule.departure_time,
        arrivalTime: schedule.arrival_time,
        availableSeats: schedule.available_seats,
        bookedSeats: schedule.booked_seats,
        totalSeats: schedule.total_seats,
        bookingEnabled: schedule.booking_enabled,
        bookingDeadline: schedule.booking_deadline,
        specialInstructions: schedule.special_instructions,
        status: schedule.status,
        isBookingWindowOpen: schedule.is_booking_window_open,
        isBookingAvailable: schedule.is_booking_available,
        userBooking: schedule.user_booking
      }));
      
    } catch (error: any) {
      console.error('Error in getRouteSchedules:', error);
      throw new Error('Failed to fetch route schedules: ' + error.message);
    }
  },

  // Create booking with enhanced validation
  // REMOVED DUPLICATE createBooking function - using the improved version below

  // Get student's route allocation
  async getStudentRouteAllocation(studentId: string): Promise<any> {
    try {
      // Use legacy method directly - check if student has allocated_route_id in students table
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select(`
          id,
          allocated_route_id,
          boarding_point
        `)
        .eq('id', studentId)
        .single();

      if (studentError || !student || !student.allocated_route_id) {
        return null;
      }

      // Get route details
      const { data: route, error: routeError } = await supabase
        .from('routes')
        .select('*')
        .eq('id', student.allocated_route_id)
        .eq('status', 'active')
        .single();

      if (routeError || !route) {
        return null;
      }

      // Find boarding stop if specified
      let boardingStop = null;
      if (student.boarding_point) {
        const { data: stop } = await supabase
          .from('route_stops')
          .select('*')
          .eq('route_id', route.id)
          .eq('stop_name', student.boarding_point)
          .single();

        if (stop) {
          boardingStop = {
            id: stop.id,
            stopName: stop.stop_name,
            stopTime: stop.stop_time
          };
        }
      }

      // Fallback to default boarding stop
      if (!boardingStop) {
        boardingStop = {
          id: 'default-stop',
          stopName: route.start_location,
          stopTime: route.departure_time
        };
      }

      return {
        id: `legacy-${student.id}`,
        route: {
          id: route.id,
          routeName: route.route_name,
          routeNumber: route.route_number,
          startLocation: route.start_location,
          endLocation: route.end_location,
          fare: route.fare,
          departureTime: route.departure_time,
          arrivalTime: route.arrival_time
        },
        boardingStop: boardingStop,
        isActive: true
      };

    } catch (error) {
      console.error('Error in getStudentRouteAllocation:', error);
      return null;
    }
  },

  // Get schedules for a route with booking info
  async getRouteSchedules(routeId: string, dateFrom?: string, dateTo?: string): Promise<any[]> {
    try {
      const studentId = sessionManager.getCurrentStudent()?.student_id;
      
      let query = supabase
        .from('schedules')
        .select(`
          id,
          route_id,
          schedule_date,
          departure_time,
          arrival_time,
          available_seats,
          booked_seats,
          status,
          driver_id,
          vehicle_id,
          routes!route_id (
            id,
            route_number,
            route_name,
            start_location,
            end_location,
            fare,
            total_capacity,
            status
          ),
          drivers!driver_id (
            id,
            name
          ),
          vehicles!vehicle_id (
            id,
            registration_number
          )
        `)
        .eq('route_id', routeId)
        .in('status', ['scheduled', 'in_progress']);

      if (dateFrom) {
        query = query.gte('schedule_date', dateFrom);
      }
      if (dateTo) {
        query = query.lte('schedule_date', dateTo);
      }

      const { data: schedules, error } = await query.order('schedule_date');

      if (error) throw error;

      // Filter out schedules with inactive routes
      const activeSchedules = schedules?.filter(schedule => 
        schedule.routes && schedule.routes.status === 'active'
      ) || [];

      // Check for existing bookings for this student
      const schedulesWithBookings = await Promise.all(
        activeSchedules.map(async (schedule) => {
          let userBooking = null;
          
          if (studentId) {
            const { data: booking } = await supabase
              .from('bookings')
              .select('id, status, seat_number, qr_code, payment_status')
              .eq('student_id', studentId)
              .eq('schedule_id', schedule.id)
              .eq('status', 'confirmed')  // Only check for confirmed bookings
              .single();
            
            if (booking) {
              userBooking = {
                id: booking.id,
                status: booking.status,
                seatNumber: booking.seat_number,
                qrCode: booking.qr_code,
                paymentStatus: booking.payment_status
              };
            }
          }

          // Check if booking window is open (1 hour before departure)
          const scheduleDate = new Date(schedule.schedule_date + 'T00:00:00');
          const [hours, minutes] = schedule.departure_time.split(':');
          scheduleDate.setHours(parseInt(hours), parseInt(minutes));
          const bookingWindowCloseTime = new Date(scheduleDate);
          bookingWindowCloseTime.setHours(bookingWindowCloseTime.getHours() - 1);
          const isBookingWindowOpen = new Date() < bookingWindowCloseTime;

          return {
            id: schedule.id,
            scheduleDate: new Date(schedule.schedule_date + 'T00:00:00'),
            departureTime: schedule.departure_time,
            arrivalTime: schedule.arrival_time,
            availableSeats: schedule.available_seats,
            bookedSeats: schedule.booked_seats || 0,
            status: schedule.status,
            isBookingWindowOpen,
            isBookingAvailable: isBookingWindowOpen && schedule.available_seats > 0,
            userBooking
          };
        })
      );

      return schedulesWithBookings;

    } catch (error) {
      console.error('Error fetching route schedules:', error);
      return [];
    }
  },

  // Create a new booking
  async createBooking(bookingData: any): Promise<any> {
    try {
      // Ensure trip_date is in the correct format (YYYY-MM-DD)
      let tripDate = bookingData.tripDate;
      if (tripDate instanceof Date) {
        const year = tripDate.getFullYear();
        const month = String(tripDate.getMonth() + 1).padStart(2, '0');
        const day = String(tripDate.getDate()).padStart(2, '0');
        tripDate = `${year}-${month}-${day}`;
      }
      
      // First check if schedule has available seats
      const { data: schedule, error: scheduleError } = await supabase
        .from('schedules')
        .select('available_seats, booked_seats, status')
        .eq('id', bookingData.scheduleId)
        .single();

      if (scheduleError) {
        console.error('Error checking schedule:', {
          code: scheduleError.code,
          message: scheduleError.message,
          details: scheduleError.details,
          hint: scheduleError.hint
        });
        return {
          success: false,
          message: `Schedule not found: ${scheduleError.message || 'Database error'}`
        };
      }

      if (!schedule || schedule.available_seats <= 0) {
        return {
          success: false,
          message: 'No seats available for this schedule'
        };
      }

      if (schedule.status !== 'scheduled') {
        return {
          success: false,
          message: 'Booking is not available for this schedule'
        };
      }

      // Check if student already has a booking for this schedule
      const { data: existingBooking, error: existingError } = await supabase
        .from('bookings')
        .select('id, status, trip_date')
        .eq('student_id', bookingData.studentId)
        .eq('schedule_id', bookingData.scheduleId)
        .eq('status', 'confirmed')  // Only check for confirmed bookings since 'pending' is not a valid enum value
        .single();
      
      if (existingError && existingError.code !== 'PGRST116') {
        // Enhanced error logging with multiple fallbacks
        console.error('Error checking existing booking:', {
          code: existingError.code,
          message: existingError.message,
          details: existingError.details,
          hint: existingError.hint,
          fullError: JSON.stringify(existingError, null, 2)
        });
        
        // Try multiple ways to get error message
        const errorMessage = existingError.message || 
                           existingError.details || 
                           existingError.hint || 
                           existingError.code ||
                           'Database error occurred';
        
        return {
          success: false,
          message: `Failed to check existing bookings: ${errorMessage}`
        };
      }

      if (existingBooking) {
        return {
          success: false,
          message: `You already have a ${existingBooking.status} booking for this date (${existingBooking.trip_date})`
        };
      }

      // Generate seat number (simple implementation)
      const seatNumber = `A${(schedule.booked_seats || 0) + 1}`;

      // Create the booking
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          student_id: bookingData.studentId,
          route_id: bookingData.routeId,
          schedule_id: bookingData.scheduleId,
          booking_date: new Date().toISOString().split('T')[0],
          trip_date: tripDate,
          boarding_stop: bookingData.boardingStop,
          seat_number: seatNumber,
          amount: bookingData.amount,
          status: 'confirmed',
          payment_status: 'paid', // Assuming immediate payment for now
          qr_code: `TKT-${Date.now()}-${bookingData.studentId.slice(-4)}`
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating booking:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return {
          success: false,
          message: error.message || 'Failed to create booking'
        };
      }

      // Update schedule seat counts
      const newBookedSeats = (schedule.booked_seats || 0) + 1;
      const newAvailableSeats = Math.max(0, schedule.available_seats - 1);

      const { error: updateError } = await supabase
        .from('schedules')
        .update({
          booked_seats: newBookedSeats,
          available_seats: newAvailableSeats,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingData.scheduleId);

      if (updateError) {
        console.error('❌ Error updating schedule seats:', {
          code: updateError.code,
          message: updateError.message,
          details: updateError.details,
          hint: updateError.hint
        });
        // Note: We could implement a rollback here if needed
      }

      return {
        success: true,
        booking: booking,
        message: 'Booking created successfully'
      };

    } catch (error) {
      console.error('Error in createBooking:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        success: false,
        message: `Failed to create booking: ${errorMessage}`
      };
    }
  },

    // Get detailed student profile including emergency contacts
  async getStudentProfile(studentId: string) {
    try {
      const { data: student, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', studentId)
        .single();

      if (error) {
        console.error('Error fetching student profile:', error);
        throw error;
      }

      if (!student) {
        throw new Error('Student not found');
      }

      // Transform and return the detailed profile data
      return {
        mobile: student.mobile,
        dateOfBirth: student.date_of_birth,
        gender: student.gender,
        institutionName: student.institution_name,
        departmentName: student.department_name,
        programName: student.program_name,
        degreeName: student.degree_name,
        fatherName: student.father_name,
        fatherMobile: student.father_mobile,
        motherName: student.mother_name,
        motherMobile: student.mother_mobile,
        emergencyContactName: student.emergency_contact_name,
        emergencyContactPhone: student.emergency_contact_phone,
        addressStreet: student.address_street,
        addressDistrict: student.address_district,
        addressState: student.address_state,
        addressPinCode: student.address_pin_code,
        isProfileComplete: student.is_profile_complete
      };

    } catch (error) {
      console.error('Error in getStudentProfile:', error);
      throw error;
    }
  },





  // Get all available schedules for students
  async getAvailableSchedules(dateFrom?: string, dateTo?: string): Promise<any[]> {
    try {
      let query = supabase
        .from('schedules')
        .select(`
          *,
          route:routes(
            *,
            stops:route_stops(*)
          ),
          driver:drivers(
            name,
            rating,
            total_trips
          ),
          vehicle:vehicles(
            registration_number,
            model,
            capacity
          )
        `)
        .in('status', ['scheduled', 'in_progress'])
        .gt('available_seats', 0);

      if (dateFrom) {
        query = query.gte('schedule_date', dateFrom);
      }

      if (dateTo) {
        query = query.lte('schedule_date', dateTo);
      }

      const { data, error } = await query.order('schedule_date', { ascending: true });

      if (error) throw error;

      // Transform the data to match the expected interface
      return (data || []).map(schedule => ({
        id: schedule.id,
        routeId: schedule.route_id,
        scheduleDate: new Date(schedule.schedule_date),
        departureTime: schedule.departure_time,
        arrivalTime: schedule.arrival_time,
        availableSeats: schedule.available_seats,
        bookedSeats: schedule.booked_seats,
        status: schedule.status,
        driverId: schedule.driver_id,
        vehicleId: schedule.vehicle_id,
        createdAt: new Date(schedule.created_at),
        updatedAt: new Date(schedule.updated_at),
        route: schedule.route ? {
          id: schedule.route.id,
          routeNumber: schedule.route.route_number,
          routeName: schedule.route.route_name,
          startLocation: schedule.route.start_location,
          endLocation: schedule.route.end_location,
          distance: schedule.route.distance,
          duration: schedule.route.duration,
          fare: schedule.route.fare,
          stops: schedule.route.stops ? schedule.route.stops.map((stop: any) => ({
            id: stop.id,
            stopName: stop.stop_name,
            stopTime: stop.stop_time,
            sequenceOrder: stop.sequence_order,
            isMajorStop: stop.is_major_stop || false
          })) : []
        } : null,
        driver: schedule.driver ? {
          name: schedule.driver.name,
          rating: schedule.driver.rating || 0,
          totalTrips: schedule.driver.total_trips || 0
        } : null,
        vehicle: schedule.vehicle ? {
          registrationNumber: schedule.vehicle.registration_number,
          model: schedule.vehicle.model,
          capacity: schedule.vehicle.capacity
        } : null
      }));
    } catch (error) {
      console.error('Error fetching available schedules:', error);
      throw new Error('Failed to fetch available schedules');
    }
  },

  // Book a trip
  async bookTrip(booking: {
    studentId: string;
    routeId: string;
    scheduleId: string;
    tripDate: string;
    boardingStop: string;
    amount: number;
    specialRequirements?: string;
  }): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        student_id: booking.studentId,
        route_id: booking.routeId,
        schedule_id: booking.scheduleId,
        trip_date: booking.tripDate,
        boarding_stop: booking.boardingStop,
        amount: booking.amount,
        special_requirements: booking.specialRequirements,
        status: 'confirmed',
        payment_status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Submit grievance
  async submitGrievance(grievance: {
    studentId: string;
    routeId?: string;
    driverName?: string;
    category: Grievance['category'];
    priority: Grievance['priority'];
    subject: string;
    description: string;
  }): Promise<Grievance> {
    try {
      const session = sessionManager.getSession();
      if (!session?.user?.email) {
        throw new Error('No valid session found');
      }

      const response = await fetch('/api/grievances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': session.user.email,
          'X-Student-Id': grievance.studentId
        },
        body: JSON.stringify({
          route_id: grievance.routeId,
          driver_name: grievance.driverName,
          category: grievance.category,
          priority: grievance.priority,
          subject: grievance.subject,
          description: grievance.description
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return transformGrievance(data);
    } catch (error) {
      console.error('Error submitting grievance:', error);
      throw new Error('Failed to create grievance');
    }
  },

  // Update student profile
  async updateProfile(studentId: string, updates: Partial<Student>): Promise<Student> {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', studentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
  },

  // Get student bookings
  async getBookings(studentId: string, filters?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ bookings: Booking[], total: number }> {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        route:routes(*),
        schedule:schedules(*)
      `, { count: 'exact' })
      .eq('student_id', studentId);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.dateFrom) {
      query = query.gte('trip_date', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('trip_date', filters.dateTo);
    }

    query = query.order('created_at', { ascending: false });

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset || 0) + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;
    return { bookings: data?.map(transformBooking) || [], total: count || 0 };
  },

  // Get student payments
  async getPayments(studentId: string, filters?: {
    status?: string;
    paymentType?: string;
    dateFrom?: string;
    dateTo?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ payments: Payment[], total: number }> {
    let query = supabase
      .from('payments')
      .select('*', { count: 'exact' })
      .eq('student_id', studentId);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.paymentType) {
      query = query.eq('payment_type', filters.paymentType);
    }
    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }

    query = query.order('created_at', { ascending: false });

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset || 0) + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;
    return { payments: data?.map(transformPayment) || [], total: count || 0 };
  },

  // Get student grievances
  async getGrievances(studentId: string): Promise<Grievance[]> {
    try {
      const session = sessionManager.getSession();
      if (!session?.user?.email) {
        throw new Error('No valid session found');
      }

      const response = await fetch('/api/grievances', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': session.user.email,
          'X-Student-Id': studentId
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `Request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      const grievances = responseData.data || [];
      return grievances.map(transformGrievance);
    } catch (error) {
      console.error('Error fetching grievances:', error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};

// Type exports for convenience
export type SupabaseClient = typeof supabase; 