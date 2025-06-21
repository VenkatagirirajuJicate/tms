'use client'

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface Step {
  name: string
  time: string
  passengers?: number
  position: [number, number]
  isDestination?: boolean
  isStartingPoint?: boolean
}

interface MapComponentProps {
  steps: Step[]
  currentStepIndex: number
}

const MapComponent: React.FC<MapComponentProps> = ({ steps, currentStepIndex }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const busMarkerRef = useRef<L.Marker | null>(null)
  const routeLineRef = useRef<L.Polyline | null>(null)

  // Realistic route coordinates that follow roads (approximate path)
  const routePath = [
    [11.6674, 78.146],    // Seelanaikenpatty (Starting Point)
    [11.6500, 78.1000],   // Intermediate point on road
    [11.6200, 78.0500],   // Intermediate point on road
    [11.5727, 77.9402],   // Kakapalayam
    [11.5500, 77.9000],   // Intermediate point on road
    [11.5200, 77.8700],   // Intermediate point on road
    [11.4772, 77.8537],   // Sankagiri
    [11.4600, 77.8200],   // Intermediate point on road
    [11.4477, 77.7947],   // Velayakaranur
    [11.4400, 77.7900],   // Intermediate point near Velayakaranur
    [11.4350, 77.7850]    // JKKN Educational Institution (Final Destination) - near Velayakaranur
  ]

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [11.5045, 77.9317], // Center of the route
      zoom: 10,
      zoomControl: false,
    })

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map)

    // Add zoom control
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map)

    mapInstanceRef.current = map

    // Create route line following roads
    const routeLine = L.polyline(routePath, {
      color: '#3b82f6',
      weight: 6,
      opacity: 0.8,
      dashArray: '15, 10'
    }).addTo(map)

    routeLineRef.current = routeLine

    // Add starting point marker
    const startingIcon = L.divIcon({
      className: 'starting-marker',
      html: `
        <div style="
          width: 40px; 
          height: 40px; 
          background-color: #22c55e; 
          border: 4px solid white; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          position: relative;
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <div style="
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            background: #22c55e;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
            white-space: nowrap;
          ">START</div>
        </div>
      `,
      iconSize: [40, 65],
      iconAnchor: [20, 32]
    })

    const startingMarker = L.marker(steps[0].position, { icon: startingIcon }).addTo(map)
    startingMarker.bindPopup(`
      <div style="text-align: center; min-width: 150px;">
        <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">🚀 Starting Point</h3>
        <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #22c55e;">${steps[0].name}</h4>
        <p style="margin: 0 0 4px 0; color: #6b7280;">${steps[0].time}</p>
        ${steps[0].passengers ? `<p style="margin: 0; color: #6b7280;">${steps[0].passengers} passengers</p>` : ''}
      </div>
    `)

    // Add destination marker
    const destinationIcon = L.divIcon({
      className: 'destination-marker',
      html: `
        <div style="
          width: 40px; 
          height: 40px; 
          background-color: #ef4444; 
          border: 4px solid white; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          position: relative;
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <div style="
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            background: #ef4444;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
            white-space: nowrap;
          ">DESTINATION</div>
        </div>
      `,
      iconSize: [40, 65],
      iconAnchor: [20, 32]
    })

    const destinationMarker = L.marker(steps[steps.length - 1].position, { icon: destinationIcon }).addTo(map)
    destinationMarker.bindPopup(`
      <div style="text-align: center; min-width: 150px;">
        <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">🎯 Final Destination</h3>
        <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #ef4444;">${steps[steps.length - 1].name}</h4>
        <p style="margin: 0 0 4px 0; color: #6b7280;">${steps[steps.length - 1].time}</p>
        <p style="margin: 4px 0 0 0; color: #ef4444; font-weight: bold;">🏁 End of Route</p>
      </div>
    `)

    // Add intermediate stop markers
    steps.slice(1, -1).forEach((step, index) => {
      const actualIndex = index + 1
      const isCompleted = actualIndex <= currentStepIndex
      const isCurrent = actualIndex === currentStepIndex
      
      const markerColor = isCompleted ? '#22c55e' : '#6b7280'
      
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 28px; 
            height: 28px; 
            background-color: ${markerColor}; 
            border: 3px solid white; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            ${isCurrent ? 'animation: pulse 2s infinite;' : ''}
          ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })

      const marker = L.marker(step.position, { icon: customIcon }).addTo(map)
      
      // Add popup
      marker.bindPopup(`
        <div style="text-align: center; min-width: 150px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">🚏 Stop ${actualIndex}</h3>
          <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #3b82f6;">${step.name}</h4>
          <p style="margin: 0 0 4px 0; color: #6b7280;">${step.time}</p>
          ${step.passengers ? `<p style="margin: 0; color: #6b7280;">${step.passengers} passengers</p>` : ''}
        </div>
      `)
    })

    // Create bus marker
    const busIcon = L.divIcon({
      className: 'bus-marker',
      html: `
        <div style="
          width: 36px; 
          height: 36px; 
          background-color: #f59e0b; 
          border: 4px solid white; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
          animation: bounce 1s infinite;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    })

    // Position bus at the appropriate point on the route path
    const busPosition = routePath[Math.min(currentStepIndex * 2, routePath.length - 1)]
    const busMarker = L.marker(busPosition, { icon: busIcon }).addTo(map)
    busMarkerRef.current = busMarker

    // Fit map to show the entire route
    const bounds = L.latLngBounds(routePath)
    map.fitBounds(bounds, { padding: [30, 30] })

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Update bus position when currentStepIndex changes
  useEffect(() => {
    if (busMarkerRef.current && routePath.length > 0) {
      // Calculate bus position along the route path
      const routeIndex = Math.min(currentStepIndex * 2, routePath.length - 1)
      const newPosition = routePath[routeIndex]
      
      // Smooth animation using setLatLng with CSS transition
      busMarkerRef.current.setLatLng(newPosition)
    }
  }, [currentStepIndex])

  return (
    <div className="w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .leaflet-popup-content {
          margin: 12px;
          font-family: inherit;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
        }
        .leaflet-control-zoom a {
          background: white !important;
          color: #374151 !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          margin: 2px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f3f4f6 !important;
        }
        .bus-marker {
          transition: all 1.5s ease-in-out;
        }
        .starting-marker, .destination-marker {
          z-index: 1000 !important;
        }
      `}</style>
    </div>
  )
}

export default MapComponent 