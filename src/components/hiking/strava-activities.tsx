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
        <h2 className='text-lg font-semibold tracking-tight'>
          Recent Activities (Strava)
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {data.activities.map((activity) => (
          <div
            key={activity.id}
            className='border border-border/50 rounded-xl bg-card p-4 hover:bg-secondary/50 transition-colors'
          >
            <div className='flex justify-between items-start mb-2'>
              <h3 className='font-bold text-sm truncate pr-2'>
                {activity.name}
              </h3>
              <div className='flex items-center gap-1 text-[11px] bg-[#fc4c02]/10 text-[#fc4c02] px-2 py-0.5 rounded-full'>
                <MountainIcon size={10} /> Strava
              </div>
            </div>

            <div className='grid grid-cols-2 gap-y-2 gap-x-4 text-xs mt-3'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <FootprintsIcon size={12} />
                <span>{activity.distance} km</span>
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <MountainIcon size={12} />
                <span>
                  {activity.totalElevationGain} m
                </span>
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <CalendarIcon size={12} />
                <span className='whitespace-nowrap'>
                  {format(new Date(activity.startDate), 'MMM d, yyyy')}
                </span>
              </div>
              {activity.location && (
                <div className='flex items-center gap-2 text-muted-foreground truncate'>
                  <MapPinIcon size={12} />
                  <span className='truncate'>
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
