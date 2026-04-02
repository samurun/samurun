import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { getActivities } from '@/lib/strava';
import {
  MountainIcon,
  FootprintsIcon,
  ClockIcon,
  MapPinIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Activities',
  description: 'Recent activities from Strava.',
};

interface StravaActivity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  start_date: string;
  description?: string;
  location_city?: string | null;
  location_country?: string | null;
}

function ActivityCard({ activity }: { activity: StravaActivity }) {
  const distance = (activity.distance / 1000).toFixed(2);
  const duration = `${Math.floor(activity.moving_time / 3600)}h ${Math.floor(
    (activity.moving_time % 3600) / 60
  )}m`;
  const location = activity.location_city
    ? `${activity.location_city}, ${activity.location_country}`
    : null;

  return (
    <div className='group flex flex-col h-full overflow-hidden'>
      <div className='aspect-video relative overflow-hidden bg-secondary border-b border-border'>
        <div className='absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#fc4c02]/10 to-transparent'>
          <div className='text-center'>
            <span className='font-mono text-4xl font-bold text-[#fc4c02]/30'>
              {activity.type === 'Run'
                ? '🏃'
                : activity.type === 'Ride'
                ? '🚴'
                : activity.type === 'Swim'
                ? '🏊'
                : '🥾'}
            </span>
          </div>
        </div>
        <div className='absolute top-2 right-2 flex gap-1'>
          <span className='font-mono text-[8px] px-1.5 py-0.5 border border-[#fc4c02]/30 bg-background/80 text-[#fc4c02] uppercase tracking-wider'>
            {activity.type}
          </span>
        </div>
      </div>
      <div className='space-y-3 flex-1 flex flex-col'>
        <div className='space-y-1 flex-1 p-4 m-0'>
          <Link
            href={`https://www.strava.com/activities/${activity.id}`}
            target='_blank'
            className='inline-block'
          >
            <h3 className='text-sm font-bold uppercase tracking-widest group-hover:underline line-clamp-1'>
              {activity.name}
            </h3>
          </Link>
          <div className='flex flex-wrap gap-3 pt-2'>
            <div className='flex items-center gap-1 text-[10px] font-mono text-muted-foreground'>
              <FootprintsIcon size={12} />
              <span>{distance} km</span>
            </div>
            <div className='flex items-center gap-1 text-[10px] font-mono text-muted-foreground'>
              <ClockIcon size={12} />
              <span>{duration}</span>
            </div>
            <div className='flex items-center gap-1 text-[10px] font-mono text-muted-foreground'>
              <MountainIcon size={12} />
              <span>{activity.total_elevation_gain} m</span>
            </div>
          </div>
          {location && (
            <div className='flex items-center gap-1 text-[10px] font-mono text-muted-foreground pt-1'>
              <MapPinIcon size={12} />
              <span className='line-clamp-1'>{location}</span>
            </div>
          )}
        </div>
        <div className='flex items-center justify-between pt-4 border-t border-border/50 p-4'>
          <div className='font-mono text-[9px] uppercase tracking-tighter text-muted-foreground'>
            {formatDistanceToNow(new Date(activity.start_date), {
              addSuffix: true,
            })}
          </div>
          <Link
            href={`https://www.strava.com/activities/${activity.id}`}
            target='_blank'
            className='font-mono text-[9px] uppercase hover:underline text-[#fc4c02]'
          >
            View on Strava &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default async function ActivitiesPage() {
  let activities: StravaActivity[] = [];

  try {
    const response = await getActivities(20);
    if (response.ok) {
      activities = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch activities:', error);
  }

  return (
    <main className='border-b border-border min-h-screen'>
      <div className='container py-20'>
        <div className='flex items-center gap-4 mb-12'>
          <h1 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
            // RECENT ACTIVITIES {activities.length}
          </h1>
          <div className='h-px flex-1 bg-border/50' />
        </div>
        {activities.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 border-t border-l border-border'>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className='border-r border-b border-border'
              >
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-20 border border-border'>
            <p className='text-muted-foreground font-mono text-sm'>
              No activities found
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
