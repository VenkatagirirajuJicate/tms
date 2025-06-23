'use client'

import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getRouteCoordinates, RouteCoordinate } from '@/data/route-coordinates'

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapComponentProps {
  routeNumber?: string;
  routeData?: RouteCoordinate[]; // Can accept pre-fetched data
  currentStepIndex: number;
  autoPan?: boolean;
}

function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  const y = Math.sin(toRadians(lon2 - lon1)) * Math.cos(toRadians(lat2));
  const x =
    Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
    Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(toRadians(lon2 - lon1));
  const bearing = toDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360;
}

const MapComponent: React.FC<MapComponentProps> = ({ routeNumber, routeData: initialRouteData, currentStepIndex, autoPan = true }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const busMarkerRef = useRef<L.Marker | null>(null)
  const [routeData, setRouteData] = useState<RouteCoordinate[]>(initialRouteData || [])
  const animationFrameId = useRef<number | null>(null);
  const prevStepIndexRef = useRef<number>(currentStepIndex);

  // Fetch route data if only routeNumber is provided
  useEffect(() => {
    if (routeNumber && !initialRouteData) {
      const route = getRouteCoordinates(routeNumber);
      if (route && route.coordinates) {
        setRouteData(route.coordinates);
      } else {
        console.error(`Could not fetch coordinates for route ${routeNumber}`);
        setRouteData([]); // Clear data if fetch fails
      }
    } else if (initialRouteData) {
        setRouteData(initialRouteData);
    }
  }, [routeNumber, initialRouteData]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || routeData.length === 0) {
      if(mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
      }
      return;
    };
    
    // If map already exists, don't re-initialize
    if (mapInstanceRef.current) return;

    try {
      const map = L.map(mapRef.current, { zoomControl: false }).setView([11.4350, 77.7850], 11)
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map)

      const routePath = routeData
        .filter(coord => coord?.position?.length === 2)
        .map(coord => coord.position as L.LatLngExpression)
      
      if (routePath.length === 0) return
      
      L.polyline(routePath, { color: '#BFDBFE', weight: 8, opacity: 0.8 }).addTo(map)
      L.polyline(routePath, { color: '#3B82F6', weight: 4, opacity: 1 }).addTo(map)

      // Add markers for each stop
      routeData.forEach((coord, index) => {
        if (!coord?.position || coord.position.length !== 2) return

        const isDestination = coord.isDestination
        const isCurrent = index === currentStepIndex
        const isCompleted = index < currentStepIndex && currentStepIndex !== -1

        let markerClass = 'stop-marker';
        let markerHtml = '';
        let iconSize: [number, number] = [12, 12];
        let iconAnchor: [number, number] = [6, 6];

        if (isDestination) {
            markerClass += ' destination';
            iconSize = [24, 24];
            iconAnchor = [12, 24];
            markerHtml = `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#DC2626"/></svg>`;
        } else if (isCurrent) {
            markerClass += ' current';
            iconSize = [20, 20];
            iconAnchor = [10, 10];
            markerHtml = `<div class="pulse-ring"></div>`;
        } else if (isCompleted) {
            markerClass += ' completed';
            iconSize = [16, 16];
            iconAnchor = [8, 8];
            markerHtml = `<svg class="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#16A34A"/><path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        } else { // Upcoming
            markerClass += ' upcoming';
            iconAnchor = [6, 6];
        }

        const markerIcon = L.divIcon({
            className: markerClass,
            html: markerHtml,
            iconSize: iconSize,
            iconAnchor: iconAnchor
        });

        const popupContent = `
          <div class="p-1">
            <h3 class="font-bold text-sm text-gray-900">${coord.name || 'Unknown Stop'}</h3>
            <p class="text-xs text-gray-600">Scheduled: ${coord.time || 'N/A'}</p>
          </div>
        `
        L.marker(coord.position as L.LatLngExpression, { icon: markerIcon }).addTo(map).bindPopup(popupContent);
      })

      // Create animated bus icon
      if (currentStepIndex > -1) {
        const busIcon = L.divIcon({
            className: 'current-stop-marker',
            html: `<div class="green-pulse-ring"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        const initialPosition = routeData[currentStepIndex]?.position || routeData[0]?.position;
        const busMarker = L.marker(initialPosition as L.LatLngExpression, { icon: busIcon, zIndexOffset: 1000 }).addTo(map)
        busMarkerRef.current = busMarker
      }

      const routePolyline = L.polyline(routeData
        .filter(coord => coord?.position?.length === 2)
        .map(coord => coord.position as L.LatLngExpression)
      )
      map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] })

    } catch (error) {
      console.error('Error initializing map:', error)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [routeData])

  // Animate bus movement
  useEffect(() => {
    if (!busMarkerRef.current || currentStepIndex < 0 || !mapInstanceRef.current) return;
    
    const prevStep = routeData[prevStepIndexRef.current];
    const currentStep = routeData[currentStepIndex];
    if (!currentStep || !prevStep) return;

    const startLatLng = L.latLng(prevStep.position);
    const endLatLng = L.latLng(currentStep.position);
    const duration = 3800; // slightly less than the 4s interval

    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        const newLat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * progress;
        const newLng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * progress;
        busMarkerRef.current?.setLatLng([newLat, newLng]);
        
        if (autoPan) {
          mapInstanceRef.current?.panTo([newLat, newLng], { animate: false });
        }
        
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        busMarkerRef.current?.setLatLng(endLatLng);
        if (autoPan) {
          mapInstanceRef.current?.panTo(endLatLng, { animate: false });
        }
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
    prevStepIndexRef.current = currentStepIndex;

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [currentStepIndex, routeData, autoPan]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ zIndex: 1 }}
    />
  )
}

export default MapComponent
