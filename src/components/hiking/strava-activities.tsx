'use client';

import { useQuery } from '@tanstack/react-query';
import {
  MountainIcon,
  FootprintsIcon,
  MapPinIcon,
  CalendarIcon,
} from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: number;
  name: string;
  distance: string;
  movingTime: number;
  totalElevationGain: number;
  startDate: string;
  location: string | null;
}

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export default function StravaActivities() {
  const { data, isLoading } = useQuery<{ activities: Activity[] }>({
    queryKey: ['strava-activities'],
    queryFn: () => fetch('/api/strava/activities').then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className='animate-pulse h-32 bg-secondary/50 rounded-md w-full' />
    );
  }

  if (!data?.activities || data.activities.length === 0) {
    return null;
  }

  return (
    <div className='mt-12'>
      <div className='flex items-center gap-4 mb-8'>
        <h2 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
          // RECENT ACTIVITIES (STRAVA)
        </h2>
        <div className='h-px flex-1 bg-border/50' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {data.activities.map((activity) => (
          <div
            key={activity.id}
            className='bg-secondary/30 border border-border p-4 hover:bg-secondary/50 transition-colors'
          >
            <div className='flex justify-between items-start mb-2'>
              <h3 className='font-bold text-sm truncate pr-2'>
                {activity.name}
              </h3>
              <div className='flex items-center gap-1 text-[10px] bg-[#fc4c02]/10 text-[#fc4c02] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider'>
                <MountainIcon size={10} /> STRAVA
              </div>
            </div>

            <div className='grid grid-cols-2 gap-y-2 gap-x-4 text-xs mt-3'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <FootprintsIcon size={12} />
                <span className='font-mono'>{activity.distance} km</span>
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <MountainIcon size={12} />
                <span className='font-mono'>
                  {activity.totalElevationGain} m
                </span>
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <CalendarIcon size={12} />
                <span className='font-mono whitespace-nowrap'>
                  {format(new Date(activity.startDate), 'MMM d, yyyy')}
                </span>
              </div>
              {activity.location && (
                <div className='flex items-center gap-2 text-muted-foreground truncate'>
                  <MapPinIcon size={12} />
                  <span className='font-mono truncate'>
                    {activity.location}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
