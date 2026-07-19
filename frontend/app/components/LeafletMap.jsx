'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ── India HQ coordinates ──
const INDIA_HQ = [20.5937, 78.9629];

// ── All export destinations with real lat/lng ──
const DESTINATIONS = [
  { name: 'United States', lat: 38.9072, lng: -77.0369, code: 'US' },
  { name: 'United Kingdom', lat: 51.5074, lng: -0.1278, code: 'GB' },
  { name: 'Germany', lat: 52.52, lng: 13.405, code: 'DE' },
  { name: 'France', lat: 48.8566, lng: 2.3522, code: 'FR' },
  { name: 'Italy', lat: 41.9028, lng: 12.4964, code: 'IT' },
  { name: 'UAE', lat: 24.4539, lng: 54.3773, code: 'AE' },
  { name: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, code: 'SA' },
  { name: 'Qatar', lat: 25.276, lng: 51.52, code: 'QA' },
  { name: 'Oman', lat: 21.4735, lng: 55.9754, code: 'OM' },
  { name: 'Kuwait', lat: 29.3759, lng: 47.9774, code: 'KW' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, code: 'SG' },
  { name: 'Malaysia', lat: 3.139, lng: 101.6869, code: 'MY' },
  { name: 'Thailand', lat: 13.7563, lng: 100.5018, code: 'TH' },
  { name: 'Vietnam', lat: 21.0285, lng: 105.8542, code: 'VN' },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375, code: 'ZA' },
  { name: 'Nigeria', lat: 9.082, lng: 7.4951, code: 'NG' },
  { name: 'Kenya', lat: -1.2921, lng: 36.8219, code: 'KE' },
  { name: 'Australia', lat: -25.2744, lng: 133.7751, code: 'AU' },
  { name: 'New Zealand', lat: -40.9006, lng: 174.886, code: 'NZ' },
  { name: 'Brazil', lat: -14.235, lng: -51.9253, code: 'BR' },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528, code: 'MX' },
  { name: 'Turkey', lat: 39.9334, lng: 32.8597, code: 'TR' },
  { name: 'Japan', lat: 36.2048, lng: 138.2529, code: 'JP' },
  { name: 'South Korea', lat: 35.9078, lng: 127.7669, code: 'KR' },
];

// ── Generate curved arc points between two coordinates ──
function generateArc(start, end, numPoints = 80) {
  const points = [];
  const [lat1, lng1] = start;
  const [lat2, lng2] = end;

  // Calculate midpoint offset for curvature
  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;
  const dist = Math.sqrt((lat2 - lat1) ** 2 + (lng2 - lng1) ** 2);
  const curvature = dist * 0.2;

  // Perpendicular offset for the arc
  const dx = lng2 - lng1;
  const dy = lat2 - lat1;
  const norm = Math.sqrt(dx * dx + dy * dy);
  const offsetLat = midLat + (curvature * dx) / norm;
  const offsetLng = midLng - (curvature * dy) / norm;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    // Quadratic Bezier curve
    const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * offsetLat + t * t * lat2;
    const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * offsetLng + t * t * lng2;
    points.push([lat, lng]);
  }
  return points;
}

// ── Calculate bearing between two points ──
function getBearing(p1, p2) {
  const dLng = ((p2[1] - p1[1]) * Math.PI) / 180;
  const lat1 = (p1[0] * Math.PI) / 180;
  const lat2 = (p2[0] * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

// ── Create plane SVG icon with rotation ──
function createPlaneIcon(rotation = 0) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" 
         style="transform: rotate(${rotation}deg); transition: transform 0.1s linear; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">
      <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" 
            fill="#0A1F44" stroke="white" stroke-width="0.5"/>
    </svg>`;
  return L.divIcon({
    className: 'plane-marker',
    html: svg,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export default function LeafletMap({ selectedCountry, onCountrySelect }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const arcLinesRef = useRef({});
  const planeMarkerRef = useRef(null);
  const animationRef = useRef(null);
  const hqMarkerRef = useRef(null);

  // ── Initialize map ──
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [20, 40],
      zoom: 2.5,
      minZoom: 2,
      maxZoom: 6,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
    });

    // Light mode tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Add zoom control to bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // ── India HQ marker ──
    const hqPulse = L.divIcon({
      className: 'hq-marker',
      html: `
        <div class="hq-container">
          <div class="hq-pulse"></div>
          <div class="hq-dot"></div>
          <div class="hq-label">IN India (HQ)</div>
        </div>
      `,
      iconSize: [120, 60],
      iconAnchor: [60, 12],
    });
    hqMarkerRef.current = L.marker(INDIA_HQ, { icon: hqPulse, interactive: false }).addTo(map);

    // ── Destination markers ──
    DESTINATIONS.forEach((dest) => {
      const icon = L.divIcon({
        className: 'dest-marker',
        html: `
          <div class="dest-container">
            <div class="dest-dot"></div>
            <div class="dest-label"><span style="font-weight:800;font-size:9px;letter-spacing:0.5px;opacity:0.7;margin-right:3px;">${dest.code}</span> ${dest.name}</div>
          </div>
        `,
        iconSize: [160, 44],
        iconAnchor: [80, 6],
      });

      const marker = L.marker([dest.lat, dest.lng], { icon })
        .addTo(map)
        .on('click', () => {
          onCountrySelect(dest.name);
        });

      markersRef.current[dest.name] = marker;
    });

    // ── Draw all arc lines ──
    DESTINATIONS.forEach((dest) => {
      const arcPoints = generateArc(INDIA_HQ, [dest.lat, dest.lng]);
      const line = L.polyline(arcPoints, {
        color: '#F97316',
        weight: 1.5,
        opacity: 0.25,
        dashArray: '6 4',
        className: 'arc-line',
      }).addTo(map);
      arcLinesRef.current[dest.name] = { line, points: arcPoints };
    });

    mapInstanceRef.current = map;

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onCountrySelect]);

  // ── Handle country selection & plane animation ──
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (planeMarkerRef.current) {
      planeMarkerRef.current.remove();
      planeMarkerRef.current = null;
    }

    // Reset all marker labels
    Object.keys(markersRef.current).forEach((name) => {
      const el = markersRef.current[name].getElement();
      if (el) {
        el.querySelector('.dest-dot')?.classList.remove('active');
        el.querySelector('.dest-label')?.classList.remove('active');
      }
    });

    if (!selectedCountry) {
      // Show all routes — restore all arcs and zoom out
      Object.values(arcLinesRef.current).forEach(({ line }) => {
        line.setStyle({ weight: 1.5, opacity: 0.25, color: '#F97316', dashArray: '6 4' });
      });
      // Show all markers
      Object.values(markersRef.current).forEach((marker) => {
        const el = marker.getElement();
        if (el) el.style.display = '';
      });
      map.flyTo([20, 40], 2.5, { duration: 1 });
      return;
    }

    // ── Single route mode: hide all other arcs, dim other markers ──
    Object.entries(arcLinesRef.current).forEach(([name, { line }]) => {
      if (name === selectedCountry) {
        line.setStyle({ weight: 3, opacity: 0.8, color: '#F97316', dashArray: '' });
        line.bringToFront();
      } else {
        line.setStyle({ weight: 0, opacity: 0 });
      }
    });

    // Dim non-selected markers
    Object.entries(markersRef.current).forEach(([name, marker]) => {
      const el = marker.getElement();
      if (el) {
        el.style.display = name === selectedCountry ? '' : 'none';
      }
    });

    const arcData = arcLinesRef.current[selectedCountry];
    const markerEl = markersRef.current[selectedCountry]?.getElement();
    if (!arcData) return;

    // Highlight selected marker
    if (markerEl) {
      markerEl.querySelector('.dest-dot')?.classList.add('active');
      markerEl.querySelector('.dest-label')?.classList.add('active');
    }

    // Fly to show route
    const dest = DESTINATIONS.find((d) => d.name === selectedCountry);
    if (dest) {
      const bounds = L.latLngBounds([INDIA_HQ, [dest.lat, dest.lng]]);
      map.flyToBounds(bounds.pad(0.4), { duration: 1.2 });
    }

    // ── Animate plane along arc ──
    const points = arcData.points;
    const plane = L.marker(points[0], { icon: createPlaneIcon(0), interactive: false, zIndexOffset: 1000 }).addTo(map);
    planeMarkerRef.current = plane;

    let idx = 0;
    const totalFrames = points.length;
    const speed = 35; // ms per frame

    function animatePlane() {
      if (idx >= totalFrames - 1) {
        // Loop the animation
        idx = 0;
      }

      const current = points[idx];
      const next = points[Math.min(idx + 1, totalFrames - 1)];
      const bearing = getBearing(current, next);

      plane.setLatLng(current);
      plane.setIcon(createPlaneIcon(bearing));

      idx++;
      animationRef.current = setTimeout(() => {
        animationRef.current = requestAnimationFrame(animatePlane);
      }, speed);
    }

    animationRef.current = requestAnimationFrame(animatePlane);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        clearTimeout(animationRef.current);
      }
    };
  }, [selectedCountry]);

  return <div ref={mapRef} className="w-full h-full rounded-2xl" />;
}
