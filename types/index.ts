export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'student' | 'staff' | 'admin'
  department?: string
  institute?: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Route {
  id: number
  routeNumber: string
  routeName: string
  startLocation: string
  endLocation: string
  departureTime: string
  arrivalTime: string
  totalStops: number
  currentPassengers: number
  totalCapacity: number
  status: 'active' | 'inactive' | 'maintenance'
  driver: string
  vehicleRegNo: string
  distance: number
  duration: string
  stops: Stop[]
}

export interface Stop {
  name: string
  time: string
}

export interface Schedule {
  id: string
  routeId: string
  departureTime: string
  arrivalTime: string
  availableSeats: number
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  route: Route
}

export interface Passenger {
  id: string
  name: string
  regNo?: string
  staffID?: string
  type: 'student' | 'staff'
  department: string
  section?: string
  year?: string
  designation?: string
  instituteName: string
  boardingPoint: string
  scheduledStatus: 'Yes' | 'No'
  inTimeScanned?: string
  outTimeScanned?: string
  status: 'Scanned' | 'Not Scanned' | '-'
  pendingFee: number | string
  remainingAmulets: number
  refilledAmulets: number
}

export interface Payment {
  id: string
  userId: string
  amount: number
  method: string
  status: 'pending' | 'completed' | 'failed'
  transactionId?: string
  createdAt: Date
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  isRead: boolean
  createdAt: Date
  category: string
}

export interface Analytics {
  totalTrips: number
  totalRevenue: number
  completedTrips: number
  averageRating: number
  monthlyStats: Array<{
    month: string
    trips: number
    revenue: number
  }>
}

export interface Grievance {
  id: string
  userId: string
  subject: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  createdAt: Date
  updatedAt: Date
}

export interface Rating {
  id: string
  userId: string
  rating: number
  comment?: string
  category: string
  createdAt: Date
}

export interface FormData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    gender: string
    bloodGroup: string
    emergencyContact: string
  }
  academicInfo: {
    userType: string
    department: string
    year: string
    section: string
    rollNo: string
    regNo: string
    instituteName: string
  }
  locationDetails: {
    address: string
    city: string
    state: string
    pincode: string
    boardingPoint: string
    boardingPeriods: string[]
  }
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    smsUpdates: boolean
  }
} 