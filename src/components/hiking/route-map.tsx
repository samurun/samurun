'use client';

import { useMemo } from 'react';
import { decodePolyline } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface RouteMapProps {
  polyline: string;
  className?: string;
}

export default function RouteMap({ polyline, className }: RouteMapProps) {
  const { pathData, viewBox } = useMemo(() => {
    if (!polyline) return { pathData: '', viewBox: '0 0 100 100' };

    const coordinates = decodePolyline(polyline);
    if (!coordinates.length) return { pathData: '', viewBox: '0 0 100 100' };

    // Calculate bounds
    let minLat = Infinity,
      maxLat = -Infinity,
      minLng = Infinity,
      maxLng = -Infinity;

    coordinates.forEach(([lat, lng]) => {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    });

    const latRange = maxLat - minLat;
    const lngRange = maxLng - minLng;

    // Add padding (5% on each side)
    const padding = Math.max(latRange, lngRange) * 0.1;

    // Center the route in the viewBox
    const centerX = (minLng + maxLng) / 2;
    const centerY = (minLat + maxLat) / 2;

    // Use the larger dimension to define the scale, ensuring aspect ratio is preserved
    // We map the larger dimension to fit within 100 units (minus padding)
    const maxDim = Math.max(latRange, lngRange);
    const scale = maxDim + padding * 2;

    const minX = centerX - scale / 2;
    const minY = centerY - scale / 2;

    // Convert coordinates to standard cartesian-like points relative to minX, minY
    const points = coordinates
      .map(([lat, lng]) => {
        const x = ((lng - minX) / scale) * 100;
        // Flip Y axis for SVG (0 is top)
        // Normalized Y: (lat - minY) / scale
        // SVG Y: 100 - normalized * 100
        const y = 100 - ((lat - minY) / scale) * 100;
        return `${x},${y}`;
      })
      .join(' ');

    return {
      pathData: `M ${points}`,
      viewBox: '0 0 100 100',
    };
  }, [polyline]);

  if (!pathData) return null;

  return (
    <div
      className={cn(
        'relative w-full aspect-2/1 bg-secondary/10 rounded-md overflow-hidden',
        className,
      )}
    >
      <svg
        viewBox={viewBox}
        className='w-full h-full'
        preserveAspectRatio='xMidYMid meet'
      >
        <path
          d={pathData}
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-[#fc4c02]'
        />
      </svg>
    </div>
  );
}
