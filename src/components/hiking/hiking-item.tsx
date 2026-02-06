'use client';

import { HikingType } from '@/data/hikings';
import { MountainIcon, FootprintsIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';
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
}

export default function HikingItem({ item, stravaActivity }: HikingItemProps) {
  return (
    <div className='group border-b border-border p-6 hover:bg-secondary/30 transition-colors'>
      <div className='flex flex-col md:flex-row md:items-start justify-between gap-4'>
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <h3 className='text-sm font-bold uppercase tracking-widest'>
              {item.title}
            </h3>
            {stravaActivity && (
              <span className='inline-flex items-center gap-1 text-[9px] bg-[#fc4c02]/10 text-[#fc4c02] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider'>
                <MountainIcon size={10} /> Verified
              </span>
            )}
          </div>

          {stravaActivity && (
            <div className='mt-3 flex flex-col sm:flex-row gap-4'>
              {stravaActivity.map && (
                <div className='w-full sm:w-48 shrink-0'>
                  <RouteMap
                    polyline={stravaActivity.map}
                    className='aspect-3/2'
                  />
                </div>
              )}

              <div className='flex flex-wrap content-start gap-x-6 gap-y-2 text-[10px] font-mono text-foreground/80 py-1'>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-muted-foreground flex items-center gap-1.5'>
                    <FootprintsIcon size={12} /> Distance
                  </span>
                  <span className='font-bold text-sm'>
                    {stravaActivity.distance} km
                  </span>
                </div>

                <div className='flex flex-col gap-0.5'>
                  <span className='text-muted-foreground flex items-center gap-1.5'>
                    <MountainIcon size={12} /> Elevation
                  </span>
                  <span className='font-bold text-sm'>
                    {stravaActivity.totalElevationGain} m
                  </span>
                </div>

                <div className='flex flex-col gap-0.5'>
                  <span className='text-muted-foreground flex items-center gap-1.5'>
                    <ClockIcon size={12} /> Duration
                  </span>
                  <span className='font-bold text-sm'>
                    {Math.floor(stravaActivity.movingTime / 3600)}h{' '}
                    {Math.floor((stravaActivity.movingTime % 3600) / 60)}m
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col items-end gap-2'>
        {item.hikes.map((hike, idx) => (
          <div key={idx} className='flex items-center gap-4'>
            <div className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest'>
              {hike.startDate} — {hike.endDate ? hike.endDate : 'Present'}
            </div>
            <div className='hidden sm:block font-mono text-[10px] px-2 py-0.5 border border-border bg-background text-muted-foreground'>
              Completed
            </div>
          </div>
        ))}

        {stravaActivity && (
          <Link
            href={`https://www.strava.com/activities/${stravaActivity.id}`}
            target='_blank'
            className='text-[10px] font-mono text-[#fc4c02] hover:underline uppercase tracking-widest flex items-center gap-1 mt-1'
          >
            View on Strava
          </Link>
        )}
      </div>
    </div>
  );
}
