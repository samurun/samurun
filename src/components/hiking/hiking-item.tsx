'use client';

import { HikingType } from '@/data/hikings';
import { MountainIcon, FootprintsIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import RouteMap from './route-map';

interface StravaActivity {
  id: number;
  name: string;
  distance: string;
  movingTime: number;
  totalElevationGain: number;
  startDate: string;
  map?: string;
  location: string | null;
}

interface HikingItemProps {
  item: HikingType;
  stravaActivity?: StravaActivity;
  wide?: boolean;
}

const formatYear = (date: string) => new Date(date).getFullYear();

export default function HikingItem({
  item,
  stravaActivity,
  wide,
}: HikingItemProps) {
  const repeatCount = item.hikes.length;
  const latestYear = formatYear(item.hikes[0].startDate);
  const earliestYear = formatYear(
    item.hikes[item.hikes.length - 1].startDate,
  );
  const yearRange =
    repeatCount > 1 && latestYear !== earliestYear
      ? `${earliestYear} – ${latestYear}`
      : latestYear.toString();

  return (
    <div
      className={cn(
        'group rounded-xl border border-border/50 bg-card p-5 hover:border-border transition-all duration-200 flex flex-col gap-4',
        wide && 'md:col-span-2',
      )}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='flex-1 min-w-0'>
          <h3 className='text-sm font-semibold tracking-tight truncate'>
            {item.title}
          </h3>
          <p className='text-xs text-muted-foreground mt-1'>{yearRange}</p>
        </div>

        <div className='flex flex-col items-end gap-1 shrink-0'>
          {repeatCount > 1 && (
            <span className='text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium'>
              ×{repeatCount}
            </span>
          )}
          {stravaActivity && (
            <span className='inline-flex items-center gap-1 text-[10px] bg-[#fc4c02]/10 text-[#fc4c02] px-2 py-0.5 rounded-full font-medium'>
              <MountainIcon size={10} /> Strava
            </span>
          )}
        </div>
      </div>

      {stravaActivity?.map && (
        <div className='rounded-lg overflow-hidden border border-border/30'>
          <RouteMap polyline={stravaActivity.map} className='aspect-3/1' />
        </div>
      )}

      {stravaActivity && (
        <div className='grid grid-cols-3 gap-2 text-xs'>
          <div className='flex flex-col gap-0.5'>
            <span className='text-muted-foreground flex items-center gap-1'>
              <FootprintsIcon size={11} /> Distance
            </span>
            <span className='font-semibold text-sm'>
              {stravaActivity.distance} km
            </span>
          </div>
          <div className='flex flex-col gap-0.5'>
            <span className='text-muted-foreground flex items-center gap-1'>
              <MountainIcon size={11} /> Elevation
            </span>
            <span className='font-semibold text-sm'>
              {stravaActivity.totalElevationGain} m
            </span>
          </div>
          <div className='flex flex-col gap-0.5'>
            <span className='text-muted-foreground flex items-center gap-1'>
              <ClockIcon size={11} /> Duration
            </span>
            <span className='font-semibold text-sm'>
              {Math.floor(stravaActivity.movingTime / 3600)}h{' '}
              {Math.floor((stravaActivity.movingTime % 3600) / 60)}m
            </span>
          </div>
        </div>
      )}

      <div className='flex flex-wrap gap-2 mt-auto pt-2'>
        {item.hikes.map((hike, idx) => (
          <span
            key={idx}
            className='text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground'
          >
            {hike.startDate}
            {hike.endDate ? ` – ${hike.endDate.slice(5)}` : ''}
          </span>
        ))}
        {stravaActivity && (
          <Link
            href={`https://www.strava.com/activities/${stravaActivity.id}`}
            target='_blank'
            className='text-[11px] text-[#fc4c02] hover:underline ml-auto'
          >
            View on Strava &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
