// GPS coordinates for all routes in Tamil Nadu, India
// Coordinates are approximate and follow major roads between locations

export interface RouteCoordinate {
  name: string
  time: string
  position: [number, number] // [latitude, longitude]
  isDestination?: boolean
}

export interface RouteData {
  routeNumber: string
  routeName: string
  coordinates: RouteCoordinate[]
}

export const routeCoordinates: RouteData[] = [
  {
    routeNumber: '01',
    routeName: 'Erode Central',
    coordinates: [
      { name: 'Erode Bus Stand', time: '07:00', position: [11.3410, 77.7172] },
      { name: 'Solar', time: '07:15', position: [11.3200, 77.7500] },
      { name: 'Chithode', time: '07:30', position: [11.3000, 77.7800] },
      { name: 'Bhavani', time: '07:45', position: [11.4477, 77.7947] },
      { name: 'Kumarapalayam', time: '08:00', position: [11.4350, 77.7850] },
      { name: 'JKKN Campus', time: '08:30', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '02',
    routeName: 'Salem Steel Plant',
    coordinates: [
      { name: 'Salem New Bus Stand', time: '06:45', position: [11.6643, 78.1460] },
      { name: 'Kondalampatti', time: '07:00', position: [11.6500, 78.1200] },
      { name: 'Mallur', time: '07:20', position: [11.6200, 78.0800] },
      { name: 'Rasipuram', time: '07:50', position: [11.4600, 77.9200] },
      { name: 'Tiruchengode', time: '08:15', position: [11.3800, 77.8500] },
      { name: 'Kakaveri', time: '08:30', position: [11.4100, 77.8100] },
      { name: 'JKKN Campus', time: '08:45', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '03',
    routeName: 'Tiruppur Express',
    coordinates: [
      { name: 'Tiruppur Old Bus Stand', time: '07:15', position: [11.1085, 77.3411] },
      { name: 'Perumanallur', time: '07:40', position: [11.2000, 77.4500] },
      { name: 'Kunnathur', time: '08:00', position: [11.2800, 77.6000] },
      { name: 'Gobichettipalayam', time: '08:25', position: [11.4500, 77.7200] },
      { name: 'JKKN Campus', time: '08:50', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '04',
    routeName: 'Coimbatore Flyer',
    coordinates: [
      { name: 'Gandhipuram', time: '06:30', position: [11.0168, 76.9558] },
      { name: 'Avinashi', time: '07:15', position: [11.2000, 77.2500] },
      { name: 'Perundurai', time: '07:45', position: [11.2700, 77.5800] },
      { name: 'Erode', time: '08:10', position: [11.3410, 77.7172] },
      { name: 'Bhavani', time: '08:25', position: [11.4477, 77.7947] },
      { name: 'Kumarapalayam', time: '08:35', position: [11.4350, 77.7850] },
      { name: 'JKKN Campus', time: '08:45', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '05',
    routeName: 'Namakkal Special',
    coordinates: [
      { name: 'Namakkal Bus Stand', time: '07:30', position: [11.2200, 78.1700] },
      { name: 'Velagoundampatti', time: '07:50', position: [11.3000, 78.0500] },
      { name: 'Mohanur', time: '08:10', position: [11.3800, 77.9000] },
      { name: 'JKKN Campus', time: '08:30', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '06',
    routeName: 'Karur Connection',
    coordinates: [
      { name: 'Karur Bus Stand', time: '07:00', position: [10.9574, 78.0809] },
      { name: 'Vangal', time: '07:20', position: [11.0500, 78.1500] },
      { name: 'Paramathi', time: '07:45', position: [11.1500, 78.0500] },
      { name: 'Velur', time: '08:00', position: [11.2500, 77.9500] },
      { name: 'Mohanur', time: '08:20', position: [11.3800, 77.9000] },
      { name: 'JKKN Campus', time: '08:40', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '07',
    routeName: 'Rasipuram Link',
    coordinates: [
      { name: 'Rasipuram Bus Stand', time: '07:45', position: [11.4600, 77.9200] },
      { name: 'Puduchatram', time: '08:05', position: [11.4200, 77.8500] },
      { name: 'JKKN Campus', time: '08:35', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '08',
    routeName: 'Tiruchengode Local',
    coordinates: [
      { name: 'Tiruchengode Bus Stand', time: '08:00', position: [11.3800, 77.8500] },
      { name: 'JKKN Campus', time: '08:30', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '09',
    routeName: 'Sankagiri Shuttle',
    coordinates: [
      { name: 'Sankagiri Fort', time: '07:20', position: [11.4772, 77.8537] },
      { name: 'Edappadi', time: '07:45', position: [11.5200, 77.8000] },
      { name: 'Pallipalayam', time: '08:05', position: [11.4800, 77.7800] },
      { name: 'JKKN Campus', time: '08:20', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '10',
    routeName: 'Mettur Dam Line',
    coordinates: [
      { name: 'Mettur Dam', time: '06:50', position: [11.8000, 77.8000] },
      { name: 'Mecheri', time: '07:15', position: [11.7000, 77.8500] },
      { name: 'Nangavalli', time: '07:35', position: [11.6500, 77.9000] },
      { name: 'Jalakandapuram', time: '07:55', position: [11.6000, 77.8500] },
      { name: 'Edappadi', time: '08:15', position: [11.5200, 77.8000] },
      { name: 'Sankagiri', time: '08:30', position: [11.4772, 77.8537] },
      { name: 'JKKN Campus', time: '08:40', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '11',
    routeName: 'Dharmapuri Connect',
    coordinates: [
      { name: 'Dharmapuri', time: '06:00', position: [12.1276, 78.1579] },
      { name: 'Thoppur', time: '06:40', position: [11.9000, 77.9000] },
      { name: 'Mettur', time: '07:20', position: [11.8000, 77.8000] },
      { name: 'Bhavani', time: '08:00', position: [11.4477, 77.7947] },
      { name: 'Kumarapalayam', time: '08:30', position: [11.4350, 77.7850] },
      { name: 'JKKN Campus', time: '08:50', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '12',
    routeName: 'Pallipalayam Local',
    coordinates: [
      { name: 'Pallipalayam', time: '08:10', position: [11.4800, 77.7800] },
      { name: 'JKKN Campus', time: '08:30', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '13',
    routeName: 'Gobichettipalayam Link',
    coordinates: [
      { name: 'Gobi Arts College', time: '07:30', position: [11.4500, 77.7200] },
      { name: 'Kunnathur', time: '07:50', position: [11.2800, 77.6000] },
      { name: 'Perundurai', time: '08:10', position: [11.2700, 77.5800] },
      { name: 'JKKN Campus', time: '08:25', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '14',
    routeName: 'Anthiyur Service',
    coordinates: [
      { name: 'Anthiyur', time: '07:10', position: [11.5800, 77.6000] },
      { name: 'Bhavani', time: '07:45', position: [11.4477, 77.7947] },
      { name: 'Chithode', time: '08:00', position: [11.3000, 77.7800] },
      { name: 'Solar', time: '08:15', position: [11.3200, 77.7500] },
      { name: 'JKKN Campus', time: '08:30', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '15',
    routeName: 'Perundurai Industrial',
    coordinates: [
      { name: 'Perundurai SIPCOT', time: '07:45', position: [11.2700, 77.5800] },
      { name: 'Thoppupalayam', time: '08:05', position: [11.3500, 77.6800] },
      { name: 'JKKN Campus', time: '08:30', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '16',
    routeName: 'Thindal Education Express',
    coordinates: [
      { name: 'Thindal Medu', time: '07:55', position: [11.3500, 77.7200] },
      { name: 'JKKN Campus', time: '08:30', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '17',
    routeName: 'Edappadi Special',
    coordinates: [
      { name: 'Edappadi', time: '07:50', position: [11.5200, 77.8000] },
      { name: 'Sankari', time: '08:10', position: [11.4800, 77.7900] },
      { name: 'JKKN Campus', time: '08:30', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '18',
    routeName: 'Attur Crosstown',
    coordinates: [
      { name: 'Attur', time: '06:30', position: [11.6000, 78.6000] },
      { name: 'Vazhapadi', time: '07:00', position: [11.5000, 78.4000] },
      { name: 'Salem', time: '07:45', position: [11.6643, 78.1460] },
      { name: 'Rasipuram', time: '08:15', position: [11.4600, 77.9200] },
      { name: 'JKKN Campus', time: '08:45', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '19',
    routeName: 'Velur Transit',
    coordinates: [
      { name: 'Velur', time: '07:50', position: [11.2500, 77.9500] },
      { name: 'Mohanur', time: '08:15', position: [11.3800, 77.9000] },
      { name: 'JKKN Campus', time: '08:35', position: [11.4350, 77.7850], isDestination: true }
    ]
  },
  {
    routeNumber: '20',
    routeName: 'Bhavani River Route',
    coordinates: [
      { name: 'Bhavani Kooduthurai', time: '07:55', position: [11.4477, 77.7947] },
      { name: 'Kumarapalayam', time: '08:15', position: [11.4350, 77.7850] },
      { name: 'JKKN Campus', time: '08:30', position: [11.4350, 77.7850], isDestination: true }
    ]
  }
]

// Helper function to get route coordinates by route number
export const getRouteCoordinates = (routeNumber: string): RouteData | undefined => {
  try {
    const route = routeCoordinates.find(r => r.routeNumber === routeNumber)
    if (!route) {
      console.warn(`Route ${routeNumber} not found in route coordinates`)
      return undefined
    }
    
    // Validate route coordinates
    const validCoordinates = route.coordinates.filter(coord => {
      if (!coord || !coord.name || !coord.time || !coord.position) {
        console.warn(`Invalid coordinate in route ${routeNumber}:`, coord)
        return false
      }
      
      if (!Array.isArray(coord.position) || coord.position.length !== 2) {
        console.warn(`Invalid position format in route ${routeNumber}:`, coord.position)
        return false
      }
      
      const [lat, lng] = coord.position
      if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
        console.warn(`Invalid lat/lng values in route ${routeNumber}:`, coord.position)
        return false
      }
      
      return true
    })
    
    if (validCoordinates.length !== route.coordinates.length) {
        console.warn(`Route ${routeNumber} has some invalid coordinates that were filtered out.`)
        return { ...route, coordinates: validCoordinates }
    }
    
    return route
  } catch (error) {
    console.error(`Error getting coordinates for route ${routeNumber}:`, error)
    return undefined
  }
}

// Helper function to get all route numbers
export const getAllRouteNumbers = (): string[] => {
  return routeCoordinates.map(r => r.routeNumber)
} 