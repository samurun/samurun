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

  return act >= start && act <= end + 86400000;
};

export default async function Page() {
  const stravaActivities = await getHikingActivities(100);

  return (
    <main className='border-b border-border/50 min-h-screen'>
      <div className='container py-20'>
        <div className='mb-12'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Hiking Trips
            <span className='text-sm text-muted-foreground ml-2'>
              {hikings.length}
            </span>
          </h1>
        </div>
        <div className='space-y-4'>
          {hikings
            .sort(
              (a, b) =>
                new Date(b.hikes[0].startDate).getTime() -
                new Date(a.hikes[0].startDate).getTime(),
            )
            .map((item, idx) => {
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
