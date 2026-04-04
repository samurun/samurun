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
    <div className='group flex flex-col h-full overflow-hidden rounded-xl border border-border/50 bg-card hover:border-border transition-all duration-200'>
      <div className='aspect-video relative overflow-hidden rounded-t-xl bg-secondary'>
        <div className='absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#fc4c02]/10 to-transparent'>
          <div className='text-center'>
            <span className='text-4xl font-bold text-[#fc4c02]/30'>
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
        <div className='absolute top-3 right-3'>
          <span className='text-[11px] px-2 py-0.5 rounded-md bg-background/80 text-[#fc4c02] border border-[#fc4c02]/20'>
            {activity.type}
          </span>
        </div>
      </div>
      <div className='p-5 flex-1 flex flex-col gap-3'>
        <div className='flex-1'>
          <Link
            href={`https://www.strava.com/activities/${activity.id}`}
            target='_blank'
          >
            <h3 className='text-sm font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-1'>
              {activity.name}
            </h3>
          </Link>
          <div className='flex flex-wrap gap-3 mt-2'>
            <div className='flex items-center gap-1 text-xs text-muted-foreground'>
              <FootprintsIcon size={12} />
              <span>{distance} km</span>
            </div>
            <div className='flex items-center gap-1 text-xs text-muted-foreground'>
              <ClockIcon size={12} />
              <span>{duration}</span>
            </div>
            <div className='flex items-center gap-1 text-xs text-muted-foreground'>
              <MountainIcon size={12} />
              <span>{activity.total_elevation_gain} m</span>
            </div>
          </div>
          {location && (
            <div className='flex items-center gap-1 text-xs text-muted-foreground mt-1'>
              <MapPinIcon size={12} />
              <span className='line-clamp-1'>{location}</span>
            </div>
          )}
        </div>
        <div className='flex items-center justify-between pt-3 border-t border-border/30'>
          <span className='text-xs text-muted-foreground'>
            {formatDistanceToNow(new Date(activity.start_date), {
              addSuffix: true,
            })}
          </span>
          <Link
            href={`https://www.strava.com/activities/${activity.id}`}
            target='_blank'
            className='text-xs text-[#fc4c02] hover:underline'
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
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='mb-12'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Recent Activities
            <span className='text-sm text-muted-foreground ml-2'>
              {activities.length}
            </span>
          </h1>
        </div>
        {activities.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20 rounded-xl border border-border/50 bg-card'>
            <p className='text-muted-foreground text-sm'>
              No activities found
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
