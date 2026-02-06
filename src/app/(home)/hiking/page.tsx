import { hikings } from '@/data/hikings';
import HikingItem from '@/components/hiking/hiking-item';
import { getHikingActivities } from '@/lib/strava';

export const metadata = {
  title: 'Hiking',
  description: 'My hiking adventures',
};

// Helper to check if date is within range
const isMatch = (activityDate: string, startDate: string, endDate?: string) => {
  const act = new Date(activityDate).getTime();
  const start = new Date(startDate).getTime();
  const end = endDate ? new Date(endDate).getTime() : new Date().getTime();

  // Allow some buffer or check same day
  // Simple check: start <= act <= end + 1 day (to cover full end day)
  return act >= start && act <= end + 86400000;
};

export default async function Page() {
  // Fetch dynamic data from Strava (Server Side)
  const stravaActivities = await getHikingActivities(100);

  return (
    <main className='border-b border-border min-h-screen'>
      <div className='container py-20'>
        <div className='flex items-center gap-4 mb-12'>
          <h1 className='text-sm font-mono font-bold uppercase tracking-[0.2em]'>
            // HIKING TRIPS ({hikings.length})
          </h1>
          <div className='h-px flex-1 bg-border/50' />
        </div>
        <div className='border-t border-x border-border'>
          {hikings
            .sort(
              (a, b) =>
                new Date(b.hikes[0].startDate).getTime() -
                new Date(a.hikes[0].startDate).getTime(),
            )
            .map((item, idx) => {
              // Find matching Strava activity
              // We check all 'hikes' ranges for this item
              const matchedActivity = stravaActivities.find((act) => {
                return item.hikes.some((hike) =>
                  isMatch(act.startDate, hike.startDate, hike.endDate),
                );
              });

              return (
                <HikingItem
                  key={`${item.title}-${idx}`}
                  item={item}
                  stravaActivity={matchedActivity}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}
